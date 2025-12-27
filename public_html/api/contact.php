<?php
/**
 * API Endpoint — Contact Form
 * Handles form submission with anti-spam and validation
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

// Headers
header('Content-Type: application/json; charset=utf-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
    exit;
}

// Response function
function send_response($success, $message, $http_code = 200) {
    http_response_code($http_code);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

// ============================================
// ANTI-SPAM CHECKS
// ============================================

// 1. Honeypot
if (!check_honeypot()) {
    log_error('Honeypot triggered', ['ip' => $_SERVER['REMOTE_ADDR']]);
    send_response(false, 'Erreur de validation', 400);
}

// 2. Time trap (minimum time between load and submit)
if (isset($_POST['form_timestamp'])) {
    $timestamp = intval($_POST['form_timestamp']);
    $elapsed = (time() * 1000) - $timestamp; // milliseconds

    if ($elapsed < (FORM_MIN_TIME * 1000)) {
        log_error('Form submitted too quickly', ['elapsed_ms' => $elapsed]);
        send_response(false, 'Veuillez patienter quelques secondes avant de soumettre', 400);
    }
}

// 3. Rate limiting
if (!check_rate_limit('contact_form')) {
    log_error('Rate limit exceeded', ['ip' => $_SERVER['REMOTE_ADDR']]);
    send_response(false, 'Trop de tentatives. Veuillez réessayer dans 1 heure.', 429);
}

// ============================================
// VALIDATION
// ============================================

$errors = [];

// Name
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
if (strlen($name) < 2) {
    $errors['name'] = 'Veuillez entrer votre nom complet.';
}

// Email
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
if (!is_valid_email($email)) {
    $errors['email'] = 'Veuillez entrer une adresse email valide.';
}

// Phone (optional, but validate if provided)
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
if (!empty($phone) && !is_valid_phone($phone)) {
    $errors['phone'] = 'Format de téléphone invalide (format Suisse attendu).';
}

// Message
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
if (strlen($message) < 10) {
    $errors['message'] = 'Votre message doit contenir au moins 10 caractères.';
}

// If errors, return
if (!empty($errors)) {
    send_response(false, 'Veuillez corriger les erreurs', 400);
}

// ============================================
// PREPARE EMAIL
// ============================================

$clean_phone = !empty($phone) ? clean_phone($phone) : 'Non fourni';

$email_subject = '[Clic COM] Nouveau contact : ' . esc_html($name);

$email_body = "Nouveau message de contact depuis clicom.ch\n\n";
$email_body .= "Nom : " . esc_html($name) . "\n";
$email_body .= "Email : " . esc_html($email) . "\n";
$email_body .= "Téléphone : " . esc_html($clean_phone) . "\n\n";
$email_body .= "Message :\n" . esc_html($message) . "\n\n";
$email_body .= "---\n";
$email_body .= "Envoyé le : " . date('d/m/Y à H:i') . "\n";
$email_body .= "IP : " . ($_SERVER['REMOTE_ADDR'] ?? 'inconnue') . "\n";

// ============================================
// SEND EMAIL
// ============================================

$email_sent = false;

if (EMAIL_METHOD === 'smtp' && !empty(SMTP_PASSWORD)) {
    // SMTP (recommandé mais nécessite configuration)
    // Utiliser PHPMailer ou swift_mailer si installé
    // Pour simplicité, fallback sur mail() si SMTP pas configuré
    if (function_exists('mail')) {
        $headers = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM_EMAIL . ">\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $email_sent = mail(FORM_TO_EMAIL, $email_subject, $email_body, $headers);
    }
} else {
    // Fallback: mail() PHP
    $headers = "From: " . SITE_NAME . " <" . CONTACT_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_sent = mail(FORM_TO_EMAIL, $email_subject, $email_body, $headers);
}

// ============================================
// RESPONSE
// ============================================

if ($email_sent) {
    // Log success
    log_error('Contact form submitted successfully', [
        'name' => $name,
        'email' => $email
    ]);

    // Optional: Send auto-reply to user
    $auto_reply_subject = 'Merci pour votre message — Clic COM';
    $auto_reply_body = "Bonjour " . esc_html($name) . ",\n\n";
    $auto_reply_body .= "Nous avons bien reçu votre message et nous vous répondrons sous 24h (jours ouvrés).\n\n";
    $auto_reply_body .= "En attendant, n'hésitez pas à planifier un appel gratuit de 30 minutes :\n";
    $auto_reply_body .= CALENDLY_URL . "\n\n";
    $auto_reply_body .= "À très bientôt,\n";
    $auto_reply_body .= "L'équipe Clic COM\n";

    $auto_reply_headers = "From: " . SITE_NAME . " <" . CONTACT_EMAIL . ">\r\n";
    $auto_reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    @mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);

    send_response(true, 'Votre message a bien été envoyé. Nous vous répondrons sous 24h.', 200);

} else {
    // Log error
    log_error('Failed to send contact form email', [
        'name' => $name,
        'email' => $email
    ]);

    send_response(false, 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement à ' . CONTACT_EMAIL, 500);
}
