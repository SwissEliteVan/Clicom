<?php
/**
 * CRM Application Configuration - EXAMPLE FILE
 *
 * INSTRUCTIONS:
 * 1. Copy this file to 'config.php' in the same directory
 * 2. Edit the values below to match your environment
 * 3. NEVER commit config.php to version control
 * 4. Keep this example file for reference
 */

declare(strict_types=1);

return [
    // ===== APPLICATION =====
    'app' => [
        'name' => 'CRM Application',           // Your application name
        'tagline' => 'Leads & Sales Manager',  // Subtitle/tagline
        'version' => '1.0.0',
        'url' => 'https://example.com',        // Your domain (no trailing slash)
        'timezone' => 'Europe/Paris',          // PHP timezone
        'debug' => false,                      // Set to true for development ONLY
        'locale' => 'fr',                      // Default language: fr, en, de, it
    ],

    // ===== DATABASE =====
    'database' => [
        'host' => 'localhost',                 // Usually 'localhost' on Hostinger
        'port' => 3306,                        // Default MySQL port
        'name' => 'your_database_name',        // Database name from Hostinger panel
        'user' => 'your_database_user',        // Database username
        'password' => 'your_secure_password',  // Database password
        'charset' => 'utf8mb4',                // Keep utf8mb4 for emoji support
        'collation' => 'utf8mb4_unicode_ci',
    ],

    // ===== SESSION =====
    'session' => [
        'name' => 'CRM_SESSION',               // Session cookie name
        'lifetime' => 7200,                    // Session lifetime in seconds (2 hours)
        'secure' => true,                      // Set to true if using HTTPS
        'httponly' => true,                    // Prevent JS access to session cookie
        'samesite' => 'Strict',                // CSRF protection: Strict, Lax, or None
    ],

    // ===== SECURITY =====
    'security' => [
        'csrf_token_name' => 'csrf_token',
        'password_min_length' => 8,
        'max_login_attempts' => 5,             // Before temporary lockout
        'lockout_duration' => 900,             // Lockout time in seconds (15 min)
        'allowed_origins' => [],               // Empty = same origin only
    ],

    // ===== FEATURES =====
    'features' => [
        'registration' => false,               // Allow public registration
        'dark_mode' => true,                   // Enable dark mode toggle
        'export_csv' => true,                  // Allow CSV exports
        'activity_log' => true,                // Log user activities
    ],

    // ===== PAGINATION =====
    'pagination' => [
        'per_page' => 25,                      // Default items per page
        'max_per_page' => 100,                 // Maximum allowed per page
    ],

    // ===== CRM SETTINGS =====
    'crm' => [
        // Lead statuses
        'lead_statuses' => [
            'new' => ['label' => 'New', 'color' => '#3b82f6'],
            'contacted' => ['label' => 'Contacted', 'color' => '#8b5cf6'],
            'qualified' => ['label' => 'Qualified', 'color' => '#10b981'],
            'proposal' => ['label' => 'Proposal', 'color' => '#f59e0b'],
            'negotiation' => ['label' => 'Negotiation', 'color' => '#ef4444'],
            'won' => ['label' => 'Won', 'color' => '#22c55e'],
            'lost' => ['label' => 'Lost', 'color' => '#6b7280'],
        ],

        // Lead sources
        'lead_sources' => [
            'website', 'referral', 'social_media', 'advertising',
            'cold_call', 'trade_show', 'partner', 'other'
        ],

        // Deal pipeline stages
        'deal_stages' => [
            'prospecting' => ['label' => 'Prospecting', 'order' => 1, 'probability' => 10],
            'qualification' => ['label' => 'Qualification', 'order' => 2, 'probability' => 25],
            'proposal' => ['label' => 'Proposal', 'order' => 3, 'probability' => 50],
            'negotiation' => ['label' => 'Negotiation', 'order' => 4, 'probability' => 75],
            'closed_won' => ['label' => 'Closed Won', 'order' => 5, 'probability' => 100],
            'closed_lost' => ['label' => 'Closed Lost', 'order' => 6, 'probability' => 0],
        ],

        // Task priorities
        'task_priorities' => ['low', 'medium', 'high', 'urgent'],

        // Currency
        'currency' => [
            'code' => 'EUR',
            'symbol' => '€',
            'position' => 'after',             // 'before' or 'after'
        ],
    ],

    // ===== EMAIL (optional) =====
    'email' => [
        'enabled' => false,
        'from_address' => 'noreply@example.com',
        'from_name' => 'CRM Application',
        // For Hostinger, use their SMTP or PHP mail()
        'method' => 'mail',                    // 'mail' or 'smtp'
        'smtp' => [
            'host' => 'smtp.hostinger.com',
            'port' => 587,
            'username' => '',
            'password' => '',
            'encryption' => 'tls',
        ],
    ],
];
