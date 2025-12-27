<?php
/**
 * Configuration Clic COM
 *
 * IMPORTANT : Ce fichier contient des informations sensibles.
 * Ne jamais commiter les credentials en clair.
 * Protégé par .htaccess (deny all).
 */

// Empêcher l'accès direct
if (!defined('APP_ACCESS')) {
    http_response_code(403);
    exit('Accès interdit');
}

// ============================================
// CONSTANTES SITE
// ============================================

define('SITE_NAME', 'Clic COM');
define('SITE_TAGLINE', 'Marketing qui convertit pour PME Suisses');
define('SITE_URL', 'https://clicom.ch'); // À COMPLÉTER : domaine exact
define('SITE_LANG', 'fr-CH');

// ============================================
// CONTACT
// ============================================

// À COMPLÉTER : informations réelles
define('CONTACT_EMAIL', 'hello@clicom.ch'); // Email principal
define('CONTACT_PHONE', '+41 21 XXX XX XX'); // Téléphone (à compléter)
define('CONTACT_ADDRESS_STREET', 'À compléter'); // Rue + numéro
define('CONTACT_ADDRESS_CITY', 'Lausanne'); // Ville (exemple)
define('CONTACT_ADDRESS_ZIP', '1003'); // Code postal (exemple)
define('CONTACT_ADDRESS_REGION', 'Vaud'); // Canton (exemple)
define('CONTACT_ADDRESS_COUNTRY', 'CH');

// ============================================
// RÉSEAUX SOCIAUX (Optionnel)
// ============================================

// Laisser vide si non applicable
define('SOCIAL_LINKEDIN', ''); // https://linkedin.com/company/...
define('SOCIAL_FACEBOOK', '');
define('SOCIAL_INSTAGRAM', '');
define('SOCIAL_TWITTER', '');

// ============================================
// CALENDLY
// ============================================

define('CALENDLY_URL', 'https://calendly.com/hello-clicom/30min');
define('CALENDLY_EMBED', true); // true = afficher iframe, false = lien uniquement

// ============================================
// EMAIL / SMTP
// ============================================

// Option 1 : mail() PHP (simple mais moins fiable)
define('EMAIL_METHOD', 'smtp'); // 'smtp' ou 'mail'

// Option 2 : SMTP Hostinger (recommandé)
// À COMPLÉTER avec vos credentials Hostinger
define('SMTP_HOST', 'smtp.hostinger.com'); // Hostinger SMTP
define('SMTP_PORT', 587); // 587 (TLS) ou 465 (SSL)
define('SMTP_SECURE', 'tls'); // 'tls' ou 'ssl'
define('SMTP_USERNAME', 'hello@clicom.ch'); // Email complet
define('SMTP_PASSWORD', ''); // À COMPLÉTER (ne JAMAIS commiter en clair)
define('SMTP_FROM_NAME', SITE_NAME);
define('SMTP_FROM_EMAIL', CONTACT_EMAIL);

// Email de destination pour formulaire contact
define('FORM_TO_EMAIL', CONTACT_EMAIL);

// ============================================
// GOOGLE ANALYTICS
// ============================================

// À COMPLÉTER : créer propriété GA4
define('GA4_MEASUREMENT_ID', 'G-XXXXXXXXXX'); // Format: G-XXXXXXXXXX

// ============================================
// SÉCURITÉ FORMULAIRE
// ============================================

// Rate limiting (max tentatives)
define('RATE_LIMIT_MAX', 3); // Max 3 soumissions
define('RATE_LIMIT_WINDOW', 3600); // Par heure (3600s)

// Temps minimum entre chargement formulaire et soumission (anti-bot)
define('FORM_MIN_TIME', 3); // 3 secondes minimum

// ============================================
// LÉGAL
// ============================================

// À COMPLÉTER : informations légales exactes
define('LEGAL_COMPANY_NAME', 'Clic COM'); // Raison sociale exacte
define('LEGAL_COMPANY_FORM', 'À compléter (Sàrl, SA, EI, etc.)');
define('LEGAL_UID', 'CHE-XXX.XXX.XXX'); // À COMPLÉTER
define('LEGAL_FOUNDED_YEAR', '2024'); // Année fondation (si applicable)

// Responsable publication
define('LEGAL_PUBLISHER_NAME', 'À compléter'); // Nom directeur/fondateur
define('LEGAL_PUBLISHER_EMAIL', CONTACT_EMAIL);

// Hébergement
define('HOSTING_PROVIDER', 'Hostinger International Ltd.');
define('HOSTING_ADDRESS', '61 Lordou Vironos Street, 6023 Larnaca, Cyprus');

// ============================================
// PARAMÈTRES TECHNIQUES
// ============================================

// Timezone
date_default_timezone_set('Europe/Zurich');

// Environnement (development ou production)
define('ENVIRONMENT', 'production'); // Changer en 'development' pour debug

// Error reporting
if (ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../logs/php-errors.log');
}

// ============================================
// HELPERS
// ============================================

/**
 * Échapper HTML (sécurité XSS)
 */
function esc_html($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

/**
 * Échapper attributs HTML
 */
function esc_attr($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

/**
 * Échapper URL
 */
function esc_url($url) {
    return filter_var($url, FILTER_SANITIZE_URL);
}

/**
 * Générer URL absolue
 */
function site_url($path = '') {
    return rtrim(SITE_URL, '/') . '/' . ltrim($path, '/');
}

/**
 * Générer URL asset
 */
function asset_url($path) {
    return site_url('assets/' . ltrim($path, '/'));
}

/**
 * Vérifier si email valide
 */
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Vérifier si téléphone valide (format Suisse basique)
 */
function is_valid_phone($phone) {
    // Accepte : +41, 0, espaces, tirets
    $pattern = '/^(\+41|0041|0)[0-9\s\-]{8,15}$/';
    return preg_match($pattern, str_replace(' ', '', $phone));
}

/**
 * Nettoyer numéro de téléphone
 */
function clean_phone($phone) {
    return preg_replace('/[^0-9+]/', '', $phone);
}

/**
 * Logger erreur (simple)
 */
function log_error($message, $context = []) {
    $log_file = __DIR__ . '/../logs/app-errors.log';
    $log_dir = dirname($log_file);

    if (!is_dir($log_dir)) {
        @mkdir($log_dir, 0755, true);
    }

    $timestamp = date('Y-m-d H:i:s');
    $context_str = !empty($context) ? ' | ' . json_encode($context) : '';
    $log_line = "[{$timestamp}] {$message}{$context_str}\n";

    @file_put_contents($log_file, $log_line, FILE_APPEND);
}

/**
 * Vérifier honeypot (anti-spam)
 */
function check_honeypot($field_name = 'website') {
    return empty($_POST[$field_name]);
}

/**
 * Vérifier rate limit (simple, basé session + IP)
 */
function check_rate_limit($action = 'form_submit') {
    session_start();

    $key = 'rate_limit_' . $action;
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $now = time();

    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = [];
    }

    // Nettoyer anciennes tentatives (hors fenêtre)
    $_SESSION[$key] = array_filter($_SESSION[$key], function($timestamp) use ($now) {
        return ($now - $timestamp) < RATE_LIMIT_WINDOW;
    });

    // Vérifier limite
    if (count($_SESSION[$key]) >= RATE_LIMIT_MAX) {
        return false; // Rate limit dépassé
    }

    // Enregistrer tentative
    $_SESSION[$key][] = $now;

    return true;
}
