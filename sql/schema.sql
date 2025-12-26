-- CRM Application Database Schema
-- Compatible with MySQL 5.7+ and MariaDB 10.3+
-- Run this file first to create the database structure

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ===== USERS TABLE =====
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `locale` VARCHAR(5) NOT NULL DEFAULT 'fr',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `last_login` DATETIME NULL,
    `login_attempts` INT UNSIGNED NOT NULL DEFAULT 0,
    `locked_until` DATETIME NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_users_email` (`email`),
    KEY `idx_users_role` (`role`),
    KEY `idx_users_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== COMPANIES TABLE =====
CREATE TABLE IF NOT EXISTS `companies` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `industry` VARCHAR(100) NULL,
    `website` VARCHAR(255) NULL,
    `phone` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    `owner_id` INT UNSIGNED NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_companies_name` (`name`),
    KEY `idx_companies_owner` (`owner_id`),
    CONSTRAINT `fk_companies_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_companies_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== CONTACTS TABLE =====
CREATE TABLE IF NOT EXISTS `contacts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(50) NULL,
    `mobile` VARCHAR(50) NULL,
    `job_title` VARCHAR(100) NULL,
    `company_id` INT UNSIGNED NULL,
    `address` TEXT NULL,
    `notes` TEXT NULL,
    `owner_id` INT UNSIGNED NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_contacts_name` (`last_name`, `first_name`),
    KEY `idx_contacts_email` (`email`),
    KEY `idx_contacts_company` (`company_id`),
    KEY `idx_contacts_owner` (`owner_id`),
    CONSTRAINT `fk_contacts_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_contacts_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_contacts_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== LEADS TABLE =====
CREATE TABLE IF NOT EXISTS `leads` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(50) NULL,
    `company_name` VARCHAR(255) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'new',
    `source` VARCHAR(50) NULL,
    `priority` ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    `score` INT UNSIGNED NOT NULL DEFAULT 0,
    `next_action_date` DATE NULL,
    `last_contact_date` DATE NULL,
    `notes` TEXT NULL,
    `company_id` INT UNSIGNED NULL,
    `contact_id` INT UNSIGNED NULL,
    `owner_id` INT UNSIGNED NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_leads_status` (`status`),
    KEY `idx_leads_source` (`source`),
    KEY `idx_leads_priority` (`priority`),
    KEY `idx_leads_owner` (`owner_id`),
    KEY `idx_leads_next_action` (`next_action_date`),
    CONSTRAINT `fk_leads_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_leads_contact` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_leads_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_leads_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== DEALS TABLE =====
CREATE TABLE IF NOT EXISTS `deals` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `stage` VARCHAR(50) NOT NULL DEFAULT 'prospecting',
    `amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `probability` INT UNSIGNED NOT NULL DEFAULT 0,
    `expected_close_date` DATE NULL,
    `actual_close_date` DATE NULL,
    `description` TEXT NULL,
    `lead_id` INT UNSIGNED NULL,
    `company_id` INT UNSIGNED NULL,
    `contact_id` INT UNSIGNED NULL,
    `owner_id` INT UNSIGNED NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_deals_stage` (`stage`),
    KEY `idx_deals_owner` (`owner_id`),
    KEY `idx_deals_close_date` (`expected_close_date`),
    CONSTRAINT `fk_deals_lead` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_deals_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_deals_contact` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_deals_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_deals_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== TASKS TABLE =====
CREATE TABLE IF NOT EXISTS `tasks` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `due_date` DATETIME NULL,
    `status` ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    `priority` ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    `lead_id` INT UNSIGNED NULL,
    `deal_id` INT UNSIGNED NULL,
    `company_id` INT UNSIGNED NULL,
    `contact_id` INT UNSIGNED NULL,
    `assigned_to` INT UNSIGNED NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `completed_at` DATETIME NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_tasks_status` (`status`),
    KEY `idx_tasks_priority` (`priority`),
    KEY `idx_tasks_due_date` (`due_date`),
    KEY `idx_tasks_assigned` (`assigned_to`),
    CONSTRAINT `fk_tasks_lead` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_tasks_deal` FOREIGN KEY (`deal_id`) REFERENCES `deals` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_tasks_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_tasks_contact` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_tasks_assigned` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_tasks_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== NOTES TABLE =====
CREATE TABLE IF NOT EXISTS `notes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `entity_type` ENUM('lead', 'deal', 'company', 'contact') NOT NULL,
    `entity_id` INT UNSIGNED NOT NULL,
    `is_pinned` TINYINT(1) NOT NULL DEFAULT 0,
    `created_by` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_notes_entity` (`entity_type`, `entity_id`),
    KEY `idx_notes_pinned` (`is_pinned`),
    CONSTRAINT `fk_notes_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== ACTIVITIES TABLE =====
CREATE TABLE IF NOT EXISTS `activities` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `entity_type` VARCHAR(50) NULL,
    `entity_id` INT UNSIGNED NULL,
    `metadata` JSON NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_activities_type` (`type`),
    KEY `idx_activities_entity` (`entity_type`, `entity_id`),
    KEY `idx_activities_user` (`user_id`),
    KEY `idx_activities_date` (`created_at`),
    CONSTRAINT `fk_activities_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== SESSIONS TABLE (for session management) =====
CREATE TABLE IF NOT EXISTS `sessions` (
    `id` VARCHAR(128) NOT NULL,
    `user_id` INT UNSIGNED NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `payload` TEXT NOT NULL,
    `last_activity` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_sessions_user` (`user_id`),
    KEY `idx_sessions_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== CSRF TOKENS TABLE =====
CREATE TABLE IF NOT EXISTS `csrf_tokens` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(64) NOT NULL,
    `session_id` VARCHAR(128) NOT NULL,
    `expires_at` DATETIME NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_csrf_token` (`token`),
    KEY `idx_csrf_session` (`session_id`),
    KEY `idx_csrf_expires` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- Create indexes for full-text search (optional, MySQL 5.6+)
-- ALTER TABLE leads ADD FULLTEXT INDEX ft_leads_search (name, email, company_name, notes);
-- ALTER TABLE deals ADD FULLTEXT INDEX ft_deals_search (name, description);
-- ALTER TABLE companies ADD FULLTEXT INDEX ft_companies_search (name, notes);
-- ALTER TABLE contacts ADD FULLTEXT INDEX ft_contacts_search (first_name, last_name, email, notes);
