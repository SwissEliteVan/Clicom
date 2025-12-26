<?php
/**
 * CRM Application Configuration
 *
 * This is a working configuration file.
 * In production, copy config.example.php and customize values.
 */

declare(strict_types=1);

return [
    // ===== APPLICATION =====
    'app' => [
        'name' => 'CRM Application',
        'tagline' => 'Leads & Sales Manager',
        'version' => '1.0.0',
        'url' => '',  // Set to your domain
        'timezone' => 'Europe/Paris',
        'debug' => true,  // Set to false in production
        'locale' => 'fr',
    ],

    // ===== DATABASE =====
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'crm_database',
        'user' => 'crm_user',
        'password' => 'change_this_password',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ],

    // ===== SESSION =====
    'session' => [
        'name' => 'CRM_SESSION',
        'lifetime' => 7200,
        'secure' => false,  // Set to true with HTTPS
        'httponly' => true,
        'samesite' => 'Strict',
    ],

    // ===== SECURITY =====
    'security' => [
        'csrf_token_name' => 'csrf_token',
        'password_min_length' => 8,
        'max_login_attempts' => 5,
        'lockout_duration' => 900,
        'allowed_origins' => [],
    ],

    // ===== FEATURES =====
    'features' => [
        'registration' => false,
        'dark_mode' => true,
        'export_csv' => true,
        'activity_log' => true,
    ],

    // ===== PAGINATION =====
    'pagination' => [
        'per_page' => 25,
        'max_per_page' => 100,
    ],

    // ===== CRM SETTINGS =====
    'crm' => [
        'lead_statuses' => [
            'new' => ['label' => 'New', 'color' => '#3b82f6'],
            'contacted' => ['label' => 'Contacted', 'color' => '#8b5cf6'],
            'qualified' => ['label' => 'Qualified', 'color' => '#10b981'],
            'proposal' => ['label' => 'Proposal', 'color' => '#f59e0b'],
            'negotiation' => ['label' => 'Negotiation', 'color' => '#ef4444'],
            'won' => ['label' => 'Won', 'color' => '#22c55e'],
            'lost' => ['label' => 'Lost', 'color' => '#6b7280'],
        ],

        'lead_sources' => [
            'website', 'referral', 'social_media', 'advertising',
            'cold_call', 'trade_show', 'partner', 'other'
        ],

        'deal_stages' => [
            'prospecting' => ['label' => 'Prospecting', 'order' => 1, 'probability' => 10],
            'qualification' => ['label' => 'Qualification', 'order' => 2, 'probability' => 25],
            'proposal' => ['label' => 'Proposal', 'order' => 3, 'probability' => 50],
            'negotiation' => ['label' => 'Negotiation', 'order' => 4, 'probability' => 75],
            'closed_won' => ['label' => 'Closed Won', 'order' => 5, 'probability' => 100],
            'closed_lost' => ['label' => 'Closed Lost', 'order' => 6, 'probability' => 0],
        ],

        'task_priorities' => ['low', 'medium', 'high', 'urgent'],

        'currency' => [
            'code' => 'EUR',
            'symbol' => '€',
            'position' => 'after',
        ],
    ],

    // ===== EMAIL =====
    'email' => [
        'enabled' => false,
        'from_address' => 'noreply@example.com',
        'from_name' => 'CRM Application',
        'method' => 'mail',
        'smtp' => [
            'host' => 'smtp.hostinger.com',
            'port' => 587,
            'username' => '',
            'password' => '',
            'encryption' => 'tls',
        ],
    ],
];
