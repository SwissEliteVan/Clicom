<?php
/**
 * CRM Application - Entry Point
 * Redirects to login or app based on session status
 */

declare(strict_types=1);

// Start session with secure settings
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'cookie_samesite' => 'Strict',
        'use_strict_mode' => true,
    ]);
}

// Check if user is logged in
if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
    header('Location: views/app.php');
    exit;
}

// Redirect to login
header('Location: views/login.php');
exit;
