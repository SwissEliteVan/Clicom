<?php
/**
 * Main Application Page
 */

declare(strict_types=1);

// Start session
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'cookie_samesite' => 'Strict',
    ]);
}

// Check authentication
if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Load config and get user
$configPath = __DIR__ . '/../config/config.php';
$config = file_exists($configPath) ? require $configPath : [];

// Get user from database
try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $config['database']['host'] ?? 'localhost',
        $config['database']['port'] ?? 3306,
        $config['database']['name'] ?? '',
        $config['database']['charset'] ?? 'utf8mb4'
    );

    $db = new PDO($dsn, $config['database']['user'] ?? '', $config['database']['password'] ?? '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $db->prepare('SELECT id, email, first_name, last_name, role, locale FROM users WHERE id = ? AND is_active = 1');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();

    if (!$user) {
        session_destroy();
        header('Location: login.php');
        exit;
    }
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    die('Database connection error. Please check configuration.');
}

require_once __DIR__ . '/layout.php';

ob_start();
?>
<div class="app-layout">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" id="sidebar" role="navigation" aria-label="Main navigation">
        <nav class="nav-menu">
            <a href="#dashboard" class="nav-item active" data-view="dashboard" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="9"/>
                    <rect x="14" y="3" width="7" height="5"/>
                    <rect x="14" y="12" width="7" height="9"/>
                    <rect x="3" y="16" width="7" height="5"/>
                </svg>
                <span data-i18n="nav_dashboard">Dashboard</span>
            </a>
            <a href="#leads" class="nav-item" data-view="leads" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <span data-i18n="nav_leads">Leads</span>
            </a>
            <a href="#deals" class="nav-item" data-view="deals" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
                <span data-i18n="nav_deals">Deals</span>
            </a>
            <a href="#tasks" class="nav-item" data-view="tasks" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                <span data-i18n="nav_tasks">Tasks</span>
                <span class="nav-badge" id="tasksBadge" hidden>0</span>
            </a>
            <a href="#companies" class="nav-item" data-view="companies" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/>
                </svg>
                <span data-i18n="nav_companies">Companies</span>
            </a>
            <a href="#contacts" class="nav-item" data-view="contacts" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <span data-i18n="nav_contacts">Contacts</span>
            </a>
            <?php if ($user['role'] === 'admin'): ?>
            <div class="nav-divider"></div>
            <a href="#users" class="nav-item" data-view="users" role="menuitem">
                <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
                <span data-i18n="nav_users">Users</span>
            </a>
            <?php endif; ?>
        </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="app-content">
        <!-- Dashboard View -->
        <section class="view active" id="view-dashboard" aria-labelledby="dashboard-title">
            <header class="view-header">
                <h1 id="dashboard-title" data-i18n="dashboard_title">Dashboard</h1>
            </header>

            <div class="dashboard-grid">
                <!-- Stats Cards -->
                <div class="stats-row">
                    <div class="stat-card">
                        <div class="stat-icon leads-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" id="statLeads">-</span>
                            <span class="stat-label" data-i18n="total_leads">Total Leads</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon deals-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" id="statDeals">-</span>
                            <span class="stat-label" data-i18n="open_deals">Open Deals</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon revenue-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"/>
                                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" id="statRevenue">-</span>
                            <span class="stat-label" data-i18n="pipeline_value">Pipeline Value</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon tasks-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"/>
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" id="statTasks">-</span>
                            <span class="stat-label" data-i18n="pending_tasks">Pending Tasks</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Leads -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h2 data-i18n="recent_leads">Recent Leads</h2>
                        <a href="#leads" class="card-link" data-view="leads" data-i18n="view_all">View All</a>
                    </div>
                    <div class="card-body">
                        <div id="recentLeads" class="list-placeholder">
                            <div class="loading-spinner"></div>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Tasks -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h2 data-i18n="upcoming_tasks">Upcoming Tasks</h2>
                        <a href="#tasks" class="card-link" data-view="tasks" data-i18n="view_all">View All</a>
                    </div>
                    <div class="card-body">
                        <div id="upcomingTasks" class="list-placeholder">
                            <div class="loading-spinner"></div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="dashboard-card full-width">
                    <div class="card-header">
                        <h2 data-i18n="recent_activities">Recent Activities</h2>
                    </div>
                    <div class="card-body">
                        <div id="recentActivities" class="list-placeholder">
                            <div class="loading-spinner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Leads View -->
        <section class="view" id="view-leads" aria-labelledby="leads-title" hidden>
            <header class="view-header">
                <h1 id="leads-title" data-i18n="nav_leads">Leads</h1>
                <div class="view-actions">
                    <button class="btn btn-secondary" id="exportLeadsBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        <span data-i18n="export_csv">Export CSV</span>
                    </button>
                    <button class="btn btn-primary" id="addLeadBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span data-i18n="add_lead">Add Lead</span>
                    </button>
                </div>
            </header>

            <div class="filters-bar">
                <div class="search-box">
                    <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="search" id="leadsSearch" class="search-input" data-i18n-placeholder="search_leads" placeholder="Search leads...">
                </div>
                <select id="leadsStatusFilter" class="filter-select">
                    <option value="" data-i18n="all_statuses">All Statuses</option>
                    <option value="new" data-i18n="status_new">New</option>
                    <option value="contacted" data-i18n="status_contacted">Contacted</option>
                    <option value="qualified" data-i18n="status_qualified">Qualified</option>
                    <option value="proposal" data-i18n="status_proposal">Proposal</option>
                    <option value="negotiation" data-i18n="status_negotiation">Negotiation</option>
                    <option value="won" data-i18n="status_won">Won</option>
                    <option value="lost" data-i18n="status_lost">Lost</option>
                </select>
                <select id="leadsPriorityFilter" class="filter-select">
                    <option value="" data-i18n="all_priorities">All Priorities</option>
                    <option value="low" data-i18n="priority_low">Low</option>
                    <option value="medium" data-i18n="priority_medium">Medium</option>
                    <option value="high" data-i18n="priority_high">High</option>
                    <option value="urgent" data-i18n="priority_urgent">Urgent</option>
                </select>
            </div>

            <div class="table-container">
                <table class="data-table" id="leadsTable">
                    <thead>
                        <tr>
                            <th data-sort="name" data-i18n="col_name">Name</th>
                            <th data-sort="company_name" data-i18n="col_company">Company</th>
                            <th data-sort="status" data-i18n="col_status">Status</th>
                            <th data-sort="priority" data-i18n="col_priority">Priority</th>
                            <th data-sort="score" data-i18n="col_score">Score</th>
                            <th data-sort="next_action_date" data-i18n="col_next_action">Next Action</th>
                            <th data-i18n="col_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="leadsTableBody">
                        <tr>
                            <td colspan="7" class="table-loading">
                                <div class="loading-spinner"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pagination" id="leadsPagination"></div>
        </section>

        <!-- Deals View -->
        <section class="view" id="view-deals" aria-labelledby="deals-title" hidden>
            <header class="view-header">
                <h1 id="deals-title" data-i18n="nav_deals">Deals</h1>
                <div class="view-actions">
                    <div class="view-toggle">
                        <button class="toggle-btn active" id="pipelineViewBtn" data-i18n="view_pipeline">Pipeline</button>
                        <button class="toggle-btn" id="listViewBtn" data-i18n="view_list">List</button>
                    </div>
                    <button class="btn btn-secondary" id="exportDealsBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        <span data-i18n="export_csv">Export CSV</span>
                    </button>
                    <button class="btn btn-primary" id="addDealBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span data-i18n="add_deal">Add Deal</span>
                    </button>
                </div>
            </header>

            <!-- Pipeline View -->
            <div id="pipelineView" class="pipeline-container">
                <div class="pipeline-board" id="pipelineBoard">
                    <div class="loading-spinner"></div>
                </div>
            </div>

            <!-- List View -->
            <div id="dealsListView" hidden>
                <div class="filters-bar">
                    <div class="search-box">
                        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                        </svg>
                        <input type="search" id="dealsSearch" class="search-input" data-i18n-placeholder="search_deals" placeholder="Search deals...">
                    </div>
                    <select id="dealsStageFilter" class="filter-select">
                        <option value="" data-i18n="all_stages">All Stages</option>
                    </select>
                </div>

                <div class="table-container">
                    <table class="data-table" id="dealsTable">
                        <thead>
                            <tr>
                                <th data-sort="name" data-i18n="col_name">Name</th>
                                <th data-sort="stage" data-i18n="col_stage">Stage</th>
                                <th data-sort="amount" data-i18n="col_amount">Amount</th>
                                <th data-sort="probability" data-i18n="col_probability">Probability</th>
                                <th data-sort="expected_close_date" data-i18n="col_close_date">Close Date</th>
                                <th data-i18n="col_actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="dealsTableBody"></tbody>
                    </table>
                </div>

                <div class="pagination" id="dealsPagination"></div>
            </div>
        </section>

        <!-- Tasks View -->
        <section class="view" id="view-tasks" aria-labelledby="tasks-title" hidden>
            <header class="view-header">
                <h1 id="tasks-title" data-i18n="nav_tasks">Tasks</h1>
                <div class="view-actions">
                    <button class="btn btn-primary" id="addTaskBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span data-i18n="add_task">Add Task</span>
                    </button>
                </div>
            </header>

            <div class="filters-bar">
                <div class="search-box">
                    <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="search" id="tasksSearch" class="search-input" data-i18n-placeholder="search_tasks" placeholder="Search tasks...">
                </div>
                <select id="tasksStatusFilter" class="filter-select">
                    <option value="" data-i18n="all_statuses">All Statuses</option>
                    <option value="pending" data-i18n="task_pending">Pending</option>
                    <option value="in_progress" data-i18n="task_in_progress">In Progress</option>
                    <option value="completed" data-i18n="task_completed">Completed</option>
                    <option value="cancelled" data-i18n="task_cancelled">Cancelled</option>
                </select>
                <select id="tasksPriorityFilter" class="filter-select">
                    <option value="" data-i18n="all_priorities">All Priorities</option>
                    <option value="low" data-i18n="priority_low">Low</option>
                    <option value="medium" data-i18n="priority_medium">Medium</option>
                    <option value="high" data-i18n="priority_high">High</option>
                    <option value="urgent" data-i18n="priority_urgent">Urgent</option>
                </select>
            </div>

            <div class="table-container">
                <table class="data-table" id="tasksTable">
                    <thead>
                        <tr>
                            <th class="checkbox-col">
                                <input type="checkbox" id="selectAllTasks" aria-label="Select all">
                            </th>
                            <th data-sort="title" data-i18n="col_title">Title</th>
                            <th data-sort="status" data-i18n="col_status">Status</th>
                            <th data-sort="priority" data-i18n="col_priority">Priority</th>
                            <th data-sort="due_date" data-i18n="col_due_date">Due Date</th>
                            <th data-i18n="col_related">Related To</th>
                            <th data-i18n="col_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tasksTableBody"></tbody>
                </table>
            </div>

            <div class="pagination" id="tasksPagination"></div>
        </section>

        <!-- Companies View -->
        <section class="view" id="view-companies" aria-labelledby="companies-title" hidden>
            <header class="view-header">
                <h1 id="companies-title" data-i18n="nav_companies">Companies</h1>
                <div class="view-actions">
                    <button class="btn btn-primary" id="addCompanyBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span data-i18n="add_company">Add Company</span>
                    </button>
                </div>
            </header>

            <div class="filters-bar">
                <div class="search-box">
                    <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="search" id="companiesSearch" class="search-input" data-i18n-placeholder="search_companies" placeholder="Search companies...">
                </div>
            </div>

            <div class="table-container">
                <table class="data-table" id="companiesTable">
                    <thead>
                        <tr>
                            <th data-sort="name" data-i18n="col_name">Name</th>
                            <th data-sort="industry" data-i18n="col_industry">Industry</th>
                            <th data-sort="city" data-i18n="col_city">City</th>
                            <th data-sort="country" data-i18n="col_country">Country</th>
                            <th data-i18n="col_contacts">Contacts</th>
                            <th data-i18n="col_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="companiesTableBody"></tbody>
                </table>
            </div>

            <div class="pagination" id="companiesPagination"></div>
        </section>

        <!-- Contacts View -->
        <section class="view" id="view-contacts" aria-labelledby="contacts-title" hidden>
            <header class="view-header">
                <h1 id="contacts-title" data-i18n="nav_contacts">Contacts</h1>
                <div class="view-actions">
                    <button class="btn btn-primary" id="addContactBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span data-i18n="add_contact">Add Contact</span>
                    </button>
                </div>
            </header>

            <div class="filters-bar">
                <div class="search-box">
                    <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="search" id="contactsSearch" class="search-input" data-i18n-placeholder="search_contacts" placeholder="Search contacts...">
                </div>
            </div>

            <div class="table-container">
                <table class="data-table" id="contactsTable">
                    <thead>
                        <tr>
                            <th data-sort="last_name" data-i18n="col_name">Name</th>
                            <th data-sort="email" data-i18n="col_email">Email</th>
                            <th data-i18n="col_phone">Phone</th>
                            <th data-sort="job_title" data-i18n="col_job_title">Job Title</th>
                            <th data-i18n="col_company">Company</th>
                            <th data-i18n="col_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="contactsTableBody"></tbody>
                </table>
            </div>

            <div class="pagination" id="contactsPagination"></div>
        </section>

        <!-- Users View (Admin Only) -->
        <?php if ($user['role'] === 'admin'): ?>
        <section class="view" id="view-users" aria-labelledby="users-title" hidden>
            <header class="view-header">
                <h1 id="users-title" data-i18n="nav_users">Users</h1>
                <div class="view-actions">
                    <button class="btn btn-primary" id="addUserBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span data-i18n="add_user">Add User</span>
                    </button>
                </div>
            </header>

            <div class="table-container">
                <table class="data-table" id="usersTable">
                    <thead>
                        <tr>
                            <th data-i18n="col_name">Name</th>
                            <th data-i18n="col_email">Email</th>
                            <th data-i18n="col_role">Role</th>
                            <th data-i18n="col_status">Status</th>
                            <th data-i18n="col_last_login">Last Login</th>
                            <th data-i18n="col_actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody"></tbody>
                </table>
            </div>

            <div class="pagination" id="usersPagination"></div>
        </section>
        <?php endif; ?>
    </div>
</div>

<script>
    // Pass user data and config to JavaScript
    window.APP_USER = <?= json_encode([
        'id' => $user['id'],
        'email' => $user['email'],
        'first_name' => $user['first_name'],
        'last_name' => $user['last_name'],
        'role' => $user['role'],
        'locale' => $user['locale'],
    ]) ?>;

    window.APP_CONFIG = <?= json_encode([
        'app_name' => $config['app']['name'] ?? 'CRM',
        'currency' => $config['crm']['currency'] ?? ['code' => 'EUR', 'symbol' => '€', 'position' => 'after'],
        'lead_statuses' => $config['crm']['lead_statuses'] ?? [],
        'deal_stages' => $config['crm']['deal_stages'] ?? [],
        'lead_sources' => $config['crm']['lead_sources'] ?? [],
        'task_priorities' => $config['crm']['task_priorities'] ?? [],
    ]) ?>;
</script>
<?php
$content = ob_get_clean();
renderPage('Dashboard', $content, [
    'bodyClass' => 'app-body',
    'showNav' => true,
    'user' => $user,
    'locale' => $user['locale'],
]);
