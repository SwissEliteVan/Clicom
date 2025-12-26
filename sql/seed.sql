-- CRM Application Seed Data
-- Run this file AFTER schema.sql to populate initial data
-- Passwords are: Admin123! and User123! (bcrypt hashed)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ===== USERS =====
-- Password: Admin123! (bcrypt hash)
INSERT INTO `users` (`email`, `password`, `first_name`, `last_name`, `role`, `locale`, `is_active`) VALUES
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin', 'fr', 1),
('user@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Standard', 'User', 'user', 'en', 1);

-- Note: The above password hash is for 'password' - in production, use the actual hashed passwords:
-- Admin123! -> you need to generate this with password_hash('Admin123!', PASSWORD_DEFAULT)
-- For testing, both accounts use 'password' as the password

-- ===== COMPANIES =====
INSERT INTO `companies` (`name`, `industry`, `website`, `phone`, `email`, `city`, `country`, `notes`, `owner_id`, `created_by`) VALUES
('Acme Corporation', 'Technology', 'https://example-acme.test', '+1 555-0100', 'contact@example-acme.test', 'New York', 'USA', 'Large enterprise client', 1, 1),
('Beta Industries', 'Manufacturing', 'https://example-beta.test', '+1 555-0200', 'info@example-beta.test', 'Chicago', 'USA', 'Manufacturing sector leader', 1, 1),
('Gamma Solutions', 'Consulting', 'https://example-gamma.test', '+33 1 55 00 00 00', 'contact@example-gamma.test', 'Paris', 'France', 'European consulting firm', 2, 1),
('Delta Services', 'Services', 'https://example-delta.test', '+49 30 5500 0000', 'info@example-delta.test', 'Berlin', 'Germany', 'Business services provider', 2, 1),
('Epsilon Tech', 'Software', 'https://example-epsilon.test', '+39 06 5500 0000', 'hello@example-epsilon.test', 'Rome', 'Italy', 'Software development company', 1, 1);

-- ===== CONTACTS =====
INSERT INTO `contacts` (`first_name`, `last_name`, `email`, `phone`, `job_title`, `company_id`, `owner_id`, `created_by`) VALUES
('John', 'Smith', 'john.smith@example-acme.test', '+1 555-0101', 'CEO', 1, 1, 1),
('Jane', 'Doe', 'jane.doe@example-acme.test', '+1 555-0102', 'CTO', 1, 1, 1),
('Pierre', 'Dupont', 'pierre.dupont@example-gamma.test', '+33 1 55 00 00 01', 'Director', 3, 2, 1),
('Hans', 'Mueller', 'hans.mueller@example-delta.test', '+49 30 5500 0001', 'Manager', 4, 2, 1),
('Maria', 'Rossi', 'maria.rossi@example-epsilon.test', '+39 06 5500 0001', 'Developer', 5, 1, 1);

-- ===== LEADS =====
INSERT INTO `leads` (`name`, `email`, `phone`, `company_name`, `status`, `source`, `priority`, `score`, `next_action_date`, `last_contact_date`, `notes`, `company_id`, `contact_id`, `owner_id`, `created_by`) VALUES
('New Software Project', 'inquiry@example-acme.test', '+1 555-0100', 'Acme Corporation', 'new', 'website', 'high', 75, DATE_ADD(CURDATE(), INTERVAL 3 DAY), CURDATE(), 'Interested in custom software development', 1, 1, 1, 1),
('Consulting Engagement', 'rfp@example-beta.test', '+1 555-0200', 'Beta Industries', 'contacted', 'referral', 'medium', 50, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'Looking for process optimization', 2, NULL, 1, 1),
('European Expansion', 'contact@example-gamma.test', '+33 1 55 00 00 00', 'Gamma Solutions', 'qualified', 'trade_show', 'high', 80, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'Met at Paris Tech Summit', 3, 3, 2, 1),
('Digital Transformation', 'info@example-delta.test', '+49 30 5500 0000', 'Delta Services', 'proposal', 'cold_call', 'urgent', 90, CURDATE(), DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'Proposal sent, awaiting response', 4, 4, 2, 1),
('Mobile App Development', 'hello@example-epsilon.test', '+39 06 5500 0000', 'Epsilon Tech', 'new', 'social_media', 'low', 25, DATE_ADD(CURDATE(), INTERVAL 14 DAY), NULL, 'Initial inquiry via LinkedIn', 5, 5, 1, 1);

-- ===== DEALS =====
INSERT INTO `deals` (`name`, `stage`, `amount`, `probability`, `expected_close_date`, `description`, `lead_id`, `company_id`, `contact_id`, `owner_id`, `created_by`) VALUES
('Acme Software Contract', 'proposal', 75000.00, 50, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'Custom CRM development project', 1, 1, 1, 1, 1),
('Beta Consulting Deal', 'qualification', 25000.00, 25, DATE_ADD(CURDATE(), INTERVAL 60 DAY), 'Process optimization consulting', 2, 2, NULL, 1, 1),
('Gamma Partnership', 'negotiation', 150000.00, 75, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'Strategic partnership agreement', 3, 3, 3, 2, 1),
('Delta Transformation', 'prospecting', 50000.00, 10, DATE_ADD(CURDATE(), INTERVAL 90 DAY), 'Digital transformation initiative', 4, 4, 4, 2, 1);

-- ===== TASKS =====
INSERT INTO `tasks` (`title`, `description`, `due_date`, `status`, `priority`, `lead_id`, `deal_id`, `assigned_to`, `created_by`) VALUES
('Follow up with Acme', 'Send updated proposal with pricing options', DATE_ADD(NOW(), INTERVAL 2 DAY), 'pending', 'high', 1, 1, 1, 1),
('Schedule demo for Beta', 'Prepare and schedule product demonstration', DATE_ADD(NOW(), INTERVAL 5 DAY), 'pending', 'medium', 2, 2, 1, 1),
('Review Gamma contract', 'Legal review of partnership terms', DATE_ADD(NOW(), INTERVAL 3 DAY), 'in_progress', 'urgent', 3, 3, 2, 1),
('Call Delta stakeholders', 'Initial discovery call with decision makers', DATE_ADD(NOW(), INTERVAL 1 DAY), 'pending', 'high', 4, 4, 2, 1),
('Update CRM data', 'Clean up and update contact information', DATE_ADD(NOW(), INTERVAL 7 DAY), 'pending', 'low', NULL, NULL, 1, 1);

-- ===== NOTES =====
INSERT INTO `notes` (`content`, `entity_type`, `entity_id`, `is_pinned`, `created_by`) VALUES
('Initial meeting went well. Client is very interested in our solution.', 'lead', 1, 1, 1),
('Competitor pricing is 20% higher. We have a good chance.', 'deal', 1, 0, 1),
('Key decision maker is the CTO. Focus on technical benefits.', 'company', 1, 1, 1),
('Prefers email communication over phone calls.', 'contact', 1, 0, 1),
('Budget approved for Q1. Need to close before end of month.', 'deal', 3, 1, 2);

-- ===== ACTIVITIES =====
INSERT INTO `activities` (`type`, `description`, `entity_type`, `entity_id`, `user_id`) VALUES
('lead_created', 'Created new lead: New Software Project', 'lead', 1, 1),
('lead_created', 'Created new lead: Consulting Engagement', 'lead', 2, 1),
('deal_created', 'Created new deal: Acme Software Contract', 'deal', 1, 1),
('note_added', 'Added note to lead', 'lead', 1, 1),
('status_changed', 'Changed lead status from new to contacted', 'lead', 2, 1),
('login', 'User logged in', NULL, NULL, 1),
('deal_stage_changed', 'Moved deal to negotiation stage', 'deal', 3, 2);

SET FOREIGN_KEY_CHECKS = 1;
