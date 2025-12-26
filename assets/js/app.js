/**
 * CRM Application - Main JavaScript
 * Handles UI interactions, API calls, and state management
 */

(function() {
    'use strict';

    // ===== API Client =====
    const api = {
        baseUrl: '/api',
        csrfToken: sessionStorage.getItem('csrf_token'),

        async request(endpoint, options = {}) {
            const url = `${this.baseUrl}/${endpoint}.php`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            };

            // Add CSRF token for write operations
            if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(config.method)) {
                config.headers['X-CSRF-Token'] = this.csrfToken;
            }

            // Add body as JSON
            if (config.body && typeof config.body === 'object') {
                config.body = JSON.stringify(config.body);
            }

            try {
                const response = await fetch(url, config);
                const data = await response.json();

                if (!response.ok) {
                    throw new ApiError(data.error || 'Request failed', response.status, data);
                }

                return data;
            } catch (err) {
                if (err instanceof ApiError) throw err;
                throw new ApiError('Network error', 0, null);
            }
        },

        get(endpoint, params = {}) {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `${endpoint}?${queryString}` : endpoint;
            return this.request(url.replace('.php', ''), { method: 'GET' });
        },

        post(endpoint, body) {
            return this.request(endpoint, { method: 'POST', body });
        },

        put(endpoint, body) {
            return this.request(endpoint, { method: 'PUT', body });
        },

        delete(endpoint, id) {
            return this.request(`${endpoint}?id=${id}`, { method: 'DELETE' });
        },

        async refreshCsrf() {
            const data = await this.get('auth', { action: 'csrf' });
            if (data.ok && data.data.csrf_token) {
                this.csrfToken = data.data.csrf_token;
                sessionStorage.setItem('csrf_token', this.csrfToken);
            }
            return this.csrfToken;
        },
    };

    class ApiError extends Error {
        constructor(message, status, data) {
            super(message);
            this.name = 'ApiError';
            this.status = status;
            this.data = data;
        }
    }

    // ===== State Management =====
    const state = {
        currentView: 'dashboard',
        user: window.APP_USER || null,
        config: window.APP_CONFIG || {},

        // Pagination states
        leads: { page: 1, perPage: 25, total: 0, data: [], sort: 'created_at', order: 'DESC', filters: {} },
        deals: { page: 1, perPage: 25, total: 0, data: [], sort: 'created_at', order: 'DESC', filters: {} },
        tasks: { page: 1, perPage: 25, total: 0, data: [], sort: 'due_date', order: 'ASC', filters: {} },
        companies: { page: 1, perPage: 25, total: 0, data: [], sort: 'name', order: 'ASC', filters: {} },
        contacts: { page: 1, perPage: 25, total: 0, data: [], sort: 'last_name', order: 'ASC', filters: {} },
        users: { page: 1, perPage: 25, total: 0, data: [], filters: {} },
        pipeline: {},
    };

    // ===== Utility Functions =====
    const utils = {
        formatCurrency(amount) {
            const currency = state.config.currency || { symbol: '€', position: 'after' };
            const formatted = new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);

            return currency.position === 'before'
                ? `${currency.symbol}${formatted}`
                : `${formatted} ${currency.symbol}`;
        },

        formatDate(dateStr) {
            if (!dateStr) return '-';
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat(window.i18n?.getLocale() || 'fr', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).format(date);
        },

        formatDateTime(dateStr) {
            if (!dateStr) return '-';
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat(window.i18n?.getLocale() || 'fr', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
        },

        relativeTime(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const now = new Date();
            const diff = now - date;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 7) return this.formatDate(dateStr);
            if (days > 0) return `${days}d`;
            if (hours > 0) return `${hours}h`;
            if (minutes > 0) return `${minutes}m`;
            return 'now';
        },

        debounce(fn, delay = 300) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn(...args), delay);
            };
        },

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },
    };

    // ===== Toast Notifications =====
    const toast = {
        container: null,

        init() {
            this.container = document.getElementById('toastContainer');
        },

        show(message, type = 'info', duration = 4000) {
            const toastEl = document.createElement('div');
            toastEl.className = `toast toast-${type}`;
            toastEl.innerHTML = `
                <span class="toast-message">${utils.escapeHtml(message)}</span>
                <button class="toast-close" aria-label="Close">&times;</button>
            `;

            toastEl.querySelector('.toast-close').onclick = () => toastEl.remove();

            this.container.appendChild(toastEl);

            if (duration > 0) {
                setTimeout(() => toastEl.remove(), duration);
            }
        },

        success(message) { this.show(message, 'success'); },
        error(message) { this.show(message, 'error'); },
        warning(message) { this.show(message, 'warning'); },
        info(message) { this.show(message, 'info'); },
    };

    // ===== Modal =====
    const modal = {
        overlay: null,
        titleEl: null,
        bodyEl: null,
        footerEl: null,

        init() {
            this.overlay = document.getElementById('modalOverlay');
            this.titleEl = document.getElementById('modalTitle');
            this.bodyEl = document.getElementById('modalBody');
            this.footerEl = document.getElementById('modalFooter');

            // Close on overlay click
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) this.close();
            });

            // Close button
            this.overlay.querySelector('.modal-close').addEventListener('click', () => this.close());

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !this.overlay.hidden) this.close();
            });
        },

        open(title, content, footer = '') {
            this.titleEl.textContent = title;
            this.bodyEl.innerHTML = content;
            this.footerEl.innerHTML = footer;
            this.overlay.hidden = false;
            document.body.style.overflow = 'hidden';

            // Focus first input
            const firstInput = this.bodyEl.querySelector('input, select, textarea');
            if (firstInput) firstInput.focus();
        },

        close() {
            this.overlay.hidden = true;
            document.body.style.overflow = '';
        },
    };

    // ===== Navigation =====
    const nav = {
        init() {
            // Navigation items
            document.querySelectorAll('.nav-item, [data-view]').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const view = item.dataset.view;
                    if (view) this.navigateTo(view);
                });
            });

            // Menu toggle for mobile
            const menuToggle = document.getElementById('menuToggle');
            const sidebar = document.getElementById('sidebar');
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('open');
                    menuToggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
                });
            }

            // Handle hash navigation
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash.slice(1);
                if (hash && document.getElementById(`view-${hash}`)) {
                    this.navigateTo(hash);
                }
            });

            // Initial navigation
            const hash = window.location.hash.slice(1);
            if (hash && document.getElementById(`view-${hash}`)) {
                this.navigateTo(hash);
            }
        },

        navigateTo(viewName) {
            // Hide all views
            document.querySelectorAll('.view').forEach(v => {
                v.hidden = true;
                v.classList.remove('active');
            });

            // Show target view
            const view = document.getElementById(`view-${viewName}`);
            if (view) {
                view.hidden = false;
                view.classList.add('active');
            }

            // Update nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.view === viewName);
            });

            // Close mobile menu
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('open');

            // Update URL hash
            window.location.hash = viewName;

            // Update state
            state.currentView = viewName;

            // Load data for view
            this.loadViewData(viewName);
        },

        async loadViewData(viewName) {
            switch (viewName) {
                case 'dashboard':
                    await dashboard.load();
                    break;
                case 'leads':
                    await leads.load();
                    break;
                case 'deals':
                    await deals.load();
                    break;
                case 'tasks':
                    await tasks.load();
                    break;
                case 'companies':
                    await companies.load();
                    break;
                case 'contacts':
                    await contacts.load();
                    break;
                case 'users':
                    await users.load();
                    break;
            }
        },
    };

    // ===== Dashboard =====
    const dashboard = {
        async load() {
            await Promise.all([
                this.loadStats(),
                this.loadRecentLeads(),
                this.loadUpcomingTasks(),
                this.loadRecentActivities(),
            ]);
        },

        async loadStats() {
            try {
                const [leadsRes, dealsRes, tasksRes] = await Promise.all([
                    api.get('leads', { per_page: 1 }),
                    api.get('deals', { pipeline: 1 }),
                    api.get('tasks', { status: 'pending', per_page: 1 }),
                ]);

                document.getElementById('statLeads').textContent = leadsRes.meta?.total || 0;

                // Calculate pipeline stats
                let totalDeals = 0;
                let pipelineValue = 0;
                if (dealsRes.ok && dealsRes.data) {
                    Object.values(dealsRes.data).forEach(stage => {
                        if (!['closed_won', 'closed_lost'].includes(stage.label?.toLowerCase())) {
                            totalDeals += stage.count || 0;
                            pipelineValue += stage.weighted_amount || 0;
                        }
                    });
                }

                document.getElementById('statDeals').textContent = totalDeals;
                document.getElementById('statRevenue').textContent = utils.formatCurrency(pipelineValue);
                document.getElementById('statTasks').textContent = tasksRes.meta?.total || 0;

                // Update tasks badge
                const tasksBadge = document.getElementById('tasksBadge');
                if (tasksBadge) {
                    const count = tasksRes.meta?.total || 0;
                    tasksBadge.textContent = count;
                    tasksBadge.hidden = count === 0;
                }
            } catch (err) {
                console.error('Failed to load stats:', err);
            }
        },

        async loadRecentLeads() {
            const container = document.getElementById('recentLeads');
            try {
                const res = await api.get('leads', { per_page: 5, sort: 'created_at', order: 'DESC' });
                if (res.ok && res.data.length > 0) {
                    container.innerHTML = `
                        <ul class="activity-list">
                            ${res.data.map(lead => `
                                <li class="activity-item">
                                    <div class="activity-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                            <circle cx="12" cy="7" r="4"/>
                                        </svg>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-description">
                                            <strong>${utils.escapeHtml(lead.name)}</strong>
                                            ${lead.company_name ? `- ${utils.escapeHtml(lead.company_name)}` : ''}
                                        </div>
                                        <div class="activity-meta">
                                            <span class="badge status-${lead.status}">${window.i18n?.t('status_' + lead.status) || lead.status}</span>
                                            &bull; ${utils.relativeTime(lead.created_at)}
                                        </div>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                } else {
                    container.innerHTML = `<p class="text-muted">${window.i18n?.t('no_results') || 'No results'}</p>`;
                }
            } catch (err) {
                container.innerHTML = `<p class="text-danger">Error loading leads</p>`;
            }
        },

        async loadUpcomingTasks() {
            const container = document.getElementById('upcomingTasks');
            try {
                const res = await api.get('tasks', {
                    status: 'pending',
                    per_page: 5,
                    sort: 'due_date',
                    order: 'ASC'
                });
                if (res.ok && res.data.length > 0) {
                    container.innerHTML = `
                        <ul class="activity-list">
                            ${res.data.map(task => {
                                const isOverdue = task.due_date && new Date(task.due_date) < new Date();
                                return `
                                    <li class="activity-item">
                                        <div class="activity-icon" style="${isOverdue ? 'color: var(--color-danger);' : ''}">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M9 11l3 3L22 4"/>
                                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                                            </svg>
                                        </div>
                                        <div class="activity-content">
                                            <div class="activity-description">${utils.escapeHtml(task.title)}</div>
                                            <div class="activity-meta">
                                                <span class="badge priority-${task.priority}">${window.i18n?.t('priority_' + task.priority) || task.priority}</span>
                                                &bull; ${task.due_date ? utils.formatDate(task.due_date) : '-'}
                                                ${isOverdue ? `<span style="color: var(--color-danger);">(${window.i18n?.t('overdue') || 'Overdue'})</span>` : ''}
                                            </div>
                                        </div>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    `;
                } else {
                    container.innerHTML = `<p class="text-muted">${window.i18n?.t('no_results') || 'No results'}</p>`;
                }
            } catch (err) {
                container.innerHTML = `<p class="text-danger">Error loading tasks</p>`;
            }
        },

        async loadRecentActivities() {
            const container = document.getElementById('recentActivities');
            try {
                const res = await api.get('activities', { per_page: 10 });
                if (res.ok && res.data.length > 0) {
                    container.innerHTML = `
                        <ul class="activity-list">
                            ${res.data.map(activity => `
                                <li class="activity-item">
                                    <div class="activity-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-description">${utils.escapeHtml(activity.description)}</div>
                                        <div class="activity-meta">
                                            ${activity.user_first_name} ${activity.user_last_name}
                                            &bull; ${utils.relativeTime(activity.created_at)}
                                        </div>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                } else {
                    container.innerHTML = `<p class="text-muted">${window.i18n?.t('no_results') || 'No results'}</p>`;
                }
            } catch (err) {
                container.innerHTML = `<p class="text-danger">Error loading activities</p>`;
            }
        },
    };

    // ===== Leads Module =====
    const leads = {
        init() {
            // Search
            const searchInput = document.getElementById('leadsSearch');
            if (searchInput) {
                searchInput.addEventListener('input', utils.debounce(() => {
                    state.leads.filters.search = searchInput.value;
                    state.leads.page = 1;
                    this.load();
                }));
            }

            // Filters
            ['leadsStatusFilter', 'leadsPriorityFilter'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.addEventListener('change', () => {
                        const field = id.includes('Status') ? 'status' : 'priority';
                        state.leads.filters[field] = el.value;
                        state.leads.page = 1;
                        this.load();
                    });
                }
            });

            // Add button
            document.getElementById('addLeadBtn')?.addEventListener('click', () => this.showForm());

            // Export button
            document.getElementById('exportLeadsBtn')?.addEventListener('click', () => {
                window.location.href = '/api/leads.php?export=csv';
            });

            // Table sorting
            document.querySelectorAll('#leadsTable th[data-sort]').forEach(th => {
                th.addEventListener('click', () => {
                    const field = th.dataset.sort;
                    if (state.leads.sort === field) {
                        state.leads.order = state.leads.order === 'ASC' ? 'DESC' : 'ASC';
                    } else {
                        state.leads.sort = field;
                        state.leads.order = 'ASC';
                    }
                    this.load();
                });
            });
        },

        async load() {
            const tbody = document.getElementById('leadsTableBody');
            tbody.innerHTML = '<tr><td colspan="7" class="table-loading"><div class="loading-spinner"></div></td></tr>';

            try {
                const params = {
                    page: state.leads.page,
                    per_page: state.leads.perPage,
                    sort: state.leads.sort,
                    order: state.leads.order,
                    ...state.leads.filters,
                };

                const res = await api.get('leads', params);
                state.leads.data = res.data;
                state.leads.total = res.meta.total;

                this.render();
                this.renderPagination();
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="7" class="table-empty">Error loading data</td></tr>';
            }
        },

        render() {
            const tbody = document.getElementById('leadsTableBody');

            if (state.leads.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="table-empty">${window.i18n?.t('no_results') || 'No results'}</td></tr>`;
                return;
            }

            tbody.innerHTML = state.leads.data.map(lead => `
                <tr>
                    <td>
                        <strong>${utils.escapeHtml(lead.name)}</strong>
                        ${lead.email ? `<br><small class="text-muted">${utils.escapeHtml(lead.email)}</small>` : ''}
                    </td>
                    <td>${utils.escapeHtml(lead.company_name || '-')}</td>
                    <td><span class="badge status-${lead.status}">${window.i18n?.t('status_' + lead.status) || lead.status}</span></td>
                    <td><span class="badge priority-${lead.priority}">${window.i18n?.t('priority_' + lead.priority) || lead.priority}</span></td>
                    <td>${lead.score || 0}</td>
                    <td>${utils.formatDate(lead.next_action_date)}</td>
                    <td>
                        <button class="btn-icon" onclick="app.leads.showForm(${lead.id})" aria-label="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="app.leads.delete(${lead.id})" aria-label="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');
        },

        renderPagination() {
            const container = document.getElementById('leadsPagination');
            const totalPages = Math.ceil(state.leads.total / state.leads.perPage);

            if (totalPages <= 1) {
                container.innerHTML = '';
                return;
            }

            let html = '';

            // Previous button
            html += `<button class="pagination-btn" ${state.leads.page <= 1 ? 'disabled' : ''} onclick="app.leads.goToPage(${state.leads.page - 1})">&laquo;</button>`;

            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= state.leads.page - 2 && i <= state.leads.page + 2)) {
                    html += `<button class="pagination-btn ${i === state.leads.page ? 'active' : ''}" onclick="app.leads.goToPage(${i})">${i}</button>`;
                } else if (i === state.leads.page - 3 || i === state.leads.page + 3) {
                    html += '<span class="pagination-dots">...</span>';
                }
            }

            // Next button
            html += `<button class="pagination-btn" ${state.leads.page >= totalPages ? 'disabled' : ''} onclick="app.leads.goToPage(${state.leads.page + 1})">&raquo;</button>`;

            container.innerHTML = html;
        },

        goToPage(page) {
            state.leads.page = page;
            this.load();
        },

        async showForm(id = null) {
            let lead = { name: '', email: '', phone: '', company_name: '', status: 'new', source: '', priority: 'medium', score: 0, notes: '' };

            if (id) {
                try {
                    const res = await api.get('leads', { id });
                    if (res.ok) lead = res.data;
                } catch (err) {
                    toast.error('Failed to load lead');
                    return;
                }
            }

            const statusOptions = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']
                .map(s => `<option value="${s}" ${lead.status === s ? 'selected' : ''}>${window.i18n?.t('status_' + s) || s}</option>`)
                .join('');

            const priorityOptions = ['low', 'medium', 'high', 'urgent']
                .map(p => `<option value="${p}" ${lead.priority === p ? 'selected' : ''}>${window.i18n?.t('priority_' + p) || p}</option>`)
                .join('');

            const sourceOptions = (state.config.lead_sources || [])
                .map(s => `<option value="${s}" ${lead.source === s ? 'selected' : ''}>${s}</option>`)
                .join('');

            const content = `
                <form id="leadForm">
                    <div class="form-group">
                        <label for="leadName">${window.i18n?.t('col_name') || 'Name'} *</label>
                        <input type="text" id="leadName" class="form-input" value="${utils.escapeHtml(lead.name)}" required>
                    </div>
                    <div class="form-group">
                        <label for="leadEmail">${window.i18n?.t('col_email') || 'Email'}</label>
                        <input type="email" id="leadEmail" class="form-input" value="${utils.escapeHtml(lead.email || '')}">
                    </div>
                    <div class="form-group">
                        <label for="leadPhone">${window.i18n?.t('col_phone') || 'Phone'}</label>
                        <input type="tel" id="leadPhone" class="form-input" value="${utils.escapeHtml(lead.phone || '')}">
                    </div>
                    <div class="form-group">
                        <label for="leadCompany">${window.i18n?.t('col_company') || 'Company'}</label>
                        <input type="text" id="leadCompany" class="form-input" value="${utils.escapeHtml(lead.company_name || '')}">
                    </div>
                    <div class="form-group">
                        <label for="leadStatus">${window.i18n?.t('col_status') || 'Status'}</label>
                        <select id="leadStatus" class="form-input">${statusOptions}</select>
                    </div>
                    <div class="form-group">
                        <label for="leadSource">${window.i18n?.t('form_source') || 'Source'}</label>
                        <select id="leadSource" class="form-input">
                            <option value="">-</option>
                            ${sourceOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="leadPriority">${window.i18n?.t('col_priority') || 'Priority'}</label>
                        <select id="leadPriority" class="form-input">${priorityOptions}</select>
                    </div>
                    <div class="form-group">
                        <label for="leadScore">${window.i18n?.t('col_score') || 'Score'}</label>
                        <input type="number" id="leadScore" class="form-input" value="${lead.score || 0}" min="0" max="100">
                    </div>
                    <div class="form-group">
                        <label for="leadNotes">${window.i18n?.t('form_notes') || 'Notes'}</label>
                        <textarea id="leadNotes" class="form-input">${utils.escapeHtml(lead.notes || '')}</textarea>
                    </div>
                </form>
            `;

            const footer = `
                <button type="button" class="btn btn-secondary" onclick="modal.close()">${window.i18n?.t('cancel') || 'Cancel'}</button>
                <button type="button" class="btn btn-primary" onclick="app.leads.save(${id || 'null'})">${window.i18n?.t('save') || 'Save'}</button>
            `;

            modal.open(id ? (window.i18n?.t('edit') || 'Edit') + ' Lead' : (window.i18n?.t('add_lead') || 'Add Lead'), content, footer);
        },

        async save(id) {
            const data = {
                name: document.getElementById('leadName').value,
                email: document.getElementById('leadEmail').value,
                phone: document.getElementById('leadPhone').value,
                company_name: document.getElementById('leadCompany').value,
                status: document.getElementById('leadStatus').value,
                source: document.getElementById('leadSource').value,
                priority: document.getElementById('leadPriority').value,
                score: parseInt(document.getElementById('leadScore').value) || 0,
                notes: document.getElementById('leadNotes').value,
            };

            if (!data.name) {
                toast.error(window.i18n?.t('email_required') || 'Name is required');
                return;
            }

            try {
                if (id) {
                    data.id = id;
                    await api.put('leads', data);
                } else {
                    await api.post('leads', data);
                }
                modal.close();
                toast.success(window.i18n?.t('msg_save_success') || 'Saved successfully');
                this.load();
            } catch (err) {
                toast.error(window.i18n?.t('msg_save_error') || 'Error saving');
            }
        },

        async delete(id) {
            if (!confirm(window.i18n?.t('msg_delete_confirm') || 'Are you sure?')) return;

            try {
                await api.delete('leads', id);
                toast.success(window.i18n?.t('msg_delete_success') || 'Deleted');
                this.load();
            } catch (err) {
                toast.error(window.i18n?.t('msg_delete_error') || 'Error deleting');
            }
        },
    };

    // ===== Deals Module =====
    const deals = {
        viewMode: 'pipeline',

        init() {
            // View toggle
            document.getElementById('pipelineViewBtn')?.addEventListener('click', () => this.setViewMode('pipeline'));
            document.getElementById('listViewBtn')?.addEventListener('click', () => this.setViewMode('list'));

            // Add button
            document.getElementById('addDealBtn')?.addEventListener('click', () => this.showForm());

            // Export button
            document.getElementById('exportDealsBtn')?.addEventListener('click', () => {
                window.location.href = '/api/deals.php?export=csv';
            });

            // Search
            const searchInput = document.getElementById('dealsSearch');
            if (searchInput) {
                searchInput.addEventListener('input', utils.debounce(() => {
                    state.deals.filters.search = searchInput.value;
                    state.deals.page = 1;
                    this.loadList();
                }));
            }
        },

        setViewMode(mode) {
            this.viewMode = mode;
            document.getElementById('pipelineViewBtn').classList.toggle('active', mode === 'pipeline');
            document.getElementById('listViewBtn').classList.toggle('active', mode === 'list');
            document.getElementById('pipelineView').hidden = mode !== 'pipeline';
            document.getElementById('dealsListView').hidden = mode !== 'list';

            if (mode === 'pipeline') {
                this.loadPipeline();
            } else {
                this.loadList();
            }
        },

        async load() {
            if (this.viewMode === 'pipeline') {
                await this.loadPipeline();
            } else {
                await this.loadList();
            }
        },

        async loadPipeline() {
            const board = document.getElementById('pipelineBoard');
            board.innerHTML = '<div class="loading-spinner"></div>';

            try {
                const res = await api.get('deals', { pipeline: 1 });
                if (res.ok) {
                    state.pipeline = res.data;
                    this.renderPipeline();
                }
            } catch (err) {
                board.innerHTML = '<p class="text-danger">Error loading pipeline</p>';
            }
        },

        renderPipeline() {
            const board = document.getElementById('pipelineBoard');
            const stages = Object.entries(state.pipeline);

            board.innerHTML = stages.map(([key, stage]) => `
                <div class="pipeline-column" data-stage="${key}">
                    <div class="column-header">
                        <div class="column-title">
                            ${stage.label}
                            <span class="column-count">${stage.count}</span>
                        </div>
                        <div class="column-stats">
                            <span>${utils.formatCurrency(stage.total_amount)}</span>
                        </div>
                    </div>
                    <div class="column-body">
                        ${stage.deals.map(deal => `
                            <div class="deal-card" onclick="app.deals.showForm(${deal.id})">
                                <div class="deal-card-title">${utils.escapeHtml(deal.name)}</div>
                                ${deal.company_name ? `<div class="deal-card-company">${utils.escapeHtml(deal.company_name)}</div>` : ''}
                                <div class="deal-card-footer">
                                    <span class="deal-amount">${utils.formatCurrency(deal.amount)}</span>
                                    <span class="deal-probability">${deal.probability}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        },

        async loadList() {
            const tbody = document.getElementById('dealsTableBody');
            tbody.innerHTML = '<tr><td colspan="6" class="table-loading"><div class="loading-spinner"></div></td></tr>';

            try {
                const res = await api.get('deals', {
                    page: state.deals.page,
                    per_page: state.deals.perPage,
                    ...state.deals.filters,
                });
                state.deals.data = res.data;
                state.deals.total = res.meta.total;
                this.renderList();
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Error loading data</td></tr>';
            }
        },

        renderList() {
            const tbody = document.getElementById('dealsTableBody');

            if (state.deals.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="table-empty">${window.i18n?.t('no_results') || 'No results'}</td></tr>`;
                return;
            }

            tbody.innerHTML = state.deals.data.map(deal => `
                <tr>
                    <td><strong>${utils.escapeHtml(deal.name)}</strong></td>
                    <td><span class="badge badge-primary">${window.i18n?.t('stage_' + deal.stage) || deal.stage}</span></td>
                    <td>${utils.formatCurrency(deal.amount)}</td>
                    <td>${deal.probability}%</td>
                    <td>${utils.formatDate(deal.expected_close_date)}</td>
                    <td>
                        <button class="btn-icon" onclick="app.deals.showForm(${deal.id})" aria-label="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="app.deals.delete(${deal.id})" aria-label="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');
        },

        async showForm(id = null) {
            let deal = { name: '', stage: 'prospecting', amount: 0, probability: 10, expected_close_date: '', description: '' };

            if (id) {
                try {
                    const res = await api.get('deals', { id });
                    if (res.ok) deal = res.data;
                } catch (err) {
                    toast.error('Failed to load deal');
                    return;
                }
            }

            const stageOptions = Object.entries(state.config.deal_stages || {})
                .map(([key, stage]) => `<option value="${key}" ${deal.stage === key ? 'selected' : ''}>${stage.label}</option>`)
                .join('');

            const content = `
                <form id="dealForm">
                    <div class="form-group">
                        <label for="dealName">${window.i18n?.t('col_name') || 'Name'} *</label>
                        <input type="text" id="dealName" class="form-input" value="${utils.escapeHtml(deal.name)}" required>
                    </div>
                    <div class="form-group">
                        <label for="dealStage">${window.i18n?.t('col_stage') || 'Stage'}</label>
                        <select id="dealStage" class="form-input">${stageOptions}</select>
                    </div>
                    <div class="form-group">
                        <label for="dealAmount">${window.i18n?.t('col_amount') || 'Amount'}</label>
                        <input type="number" id="dealAmount" class="form-input" value="${deal.amount || 0}" min="0" step="100">
                    </div>
                    <div class="form-group">
                        <label for="dealProbability">${window.i18n?.t('form_probability') || 'Probability (%)'}</label>
                        <input type="number" id="dealProbability" class="form-input" value="${deal.probability || 0}" min="0" max="100">
                    </div>
                    <div class="form-group">
                        <label for="dealCloseDate">${window.i18n?.t('form_expected_close') || 'Expected Close Date'}</label>
                        <input type="date" id="dealCloseDate" class="form-input" value="${deal.expected_close_date || ''}">
                    </div>
                    <div class="form-group">
                        <label for="dealDescription">${window.i18n?.t('form_description') || 'Description'}</label>
                        <textarea id="dealDescription" class="form-input">${utils.escapeHtml(deal.description || '')}</textarea>
                    </div>
                </form>
            `;

            const footer = `
                <button type="button" class="btn btn-secondary" onclick="modal.close()">${window.i18n?.t('cancel') || 'Cancel'}</button>
                <button type="button" class="btn btn-primary" onclick="app.deals.save(${id || 'null'})">${window.i18n?.t('save') || 'Save'}</button>
            `;

            modal.open(id ? (window.i18n?.t('edit') || 'Edit') + ' Deal' : (window.i18n?.t('add_deal') || 'Add Deal'), content, footer);
        },

        async save(id) {
            const data = {
                name: document.getElementById('dealName').value,
                stage: document.getElementById('dealStage').value,
                amount: parseFloat(document.getElementById('dealAmount').value) || 0,
                probability: parseInt(document.getElementById('dealProbability').value) || 0,
                expected_close_date: document.getElementById('dealCloseDate').value,
                description: document.getElementById('dealDescription').value,
            };

            if (!data.name) {
                toast.error('Name is required');
                return;
            }

            try {
                if (id) {
                    data.id = id;
                    await api.put('deals', data);
                } else {
                    await api.post('deals', data);
                }
                modal.close();
                toast.success(window.i18n?.t('msg_save_success') || 'Saved');
                this.load();
            } catch (err) {
                toast.error(window.i18n?.t('msg_save_error') || 'Error saving');
            }
        },

        async delete(id) {
            if (!confirm(window.i18n?.t('msg_delete_confirm') || 'Are you sure?')) return;

            try {
                await api.delete('deals', id);
                toast.success(window.i18n?.t('msg_delete_success') || 'Deleted');
                this.load();
            } catch (err) {
                toast.error(window.i18n?.t('msg_delete_error') || 'Error deleting');
            }
        },
    };

    // ===== Tasks Module (simplified) =====
    const tasks = {
        init() {
            document.getElementById('addTaskBtn')?.addEventListener('click', () => this.showForm());

            const searchInput = document.getElementById('tasksSearch');
            if (searchInput) {
                searchInput.addEventListener('input', utils.debounce(() => {
                    state.tasks.filters.search = searchInput.value;
                    state.tasks.page = 1;
                    this.load();
                }));
            }
        },

        async load() {
            const tbody = document.getElementById('tasksTableBody');
            tbody.innerHTML = '<tr><td colspan="7" class="table-loading"><div class="loading-spinner"></div></td></tr>';

            try {
                const res = await api.get('tasks', {
                    page: state.tasks.page,
                    per_page: state.tasks.perPage,
                    ...state.tasks.filters,
                });
                state.tasks.data = res.data;
                state.tasks.total = res.meta.total;
                this.render();
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="7" class="table-empty">Error loading data</td></tr>';
            }
        },

        render() {
            const tbody = document.getElementById('tasksTableBody');

            if (state.tasks.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="table-empty">${window.i18n?.t('no_results') || 'No results'}</td></tr>`;
                return;
            }

            tbody.innerHTML = state.tasks.data.map(task => `
                <tr>
                    <td><input type="checkbox" data-id="${task.id}"></td>
                    <td><strong>${utils.escapeHtml(task.title)}</strong></td>
                    <td><span class="badge task-${task.status}">${window.i18n?.t('task_' + task.status) || task.status}</span></td>
                    <td><span class="badge priority-${task.priority}">${window.i18n?.t('priority_' + task.priority) || task.priority}</span></td>
                    <td>${utils.formatDate(task.due_date)}</td>
                    <td>${task.lead_name || task.deal_name || '-'}</td>
                    <td>
                        <button class="btn-icon" onclick="app.tasks.showForm(${task.id})" aria-label="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="app.tasks.delete(${task.id})" aria-label="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');
        },

        async showForm(id = null) {
            let task = { title: '', description: '', due_date: '', status: 'pending', priority: 'medium' };

            if (id) {
                try {
                    const res = await api.get('tasks', { id });
                    if (res.ok) task = res.data;
                } catch (err) {
                    toast.error('Failed to load task');
                    return;
                }
            }

            const statusOptions = ['pending', 'in_progress', 'completed', 'cancelled']
                .map(s => `<option value="${s}" ${task.status === s ? 'selected' : ''}>${window.i18n?.t('task_' + s) || s}</option>`)
                .join('');

            const priorityOptions = ['low', 'medium', 'high', 'urgent']
                .map(p => `<option value="${p}" ${task.priority === p ? 'selected' : ''}>${window.i18n?.t('priority_' + p) || p}</option>`)
                .join('');

            const content = `
                <form id="taskForm">
                    <div class="form-group">
                        <label for="taskTitle">${window.i18n?.t('col_title') || 'Title'} *</label>
                        <input type="text" id="taskTitle" class="form-input" value="${utils.escapeHtml(task.title)}" required>
                    </div>
                    <div class="form-group">
                        <label for="taskStatus">${window.i18n?.t('col_status') || 'Status'}</label>
                        <select id="taskStatus" class="form-input">${statusOptions}</select>
                    </div>
                    <div class="form-group">
                        <label for="taskPriority">${window.i18n?.t('col_priority') || 'Priority'}</label>
                        <select id="taskPriority" class="form-input">${priorityOptions}</select>
                    </div>
                    <div class="form-group">
                        <label for="taskDueDate">${window.i18n?.t('col_due_date') || 'Due Date'}</label>
                        <input type="datetime-local" id="taskDueDate" class="form-input" value="${task.due_date ? task.due_date.replace(' ', 'T').slice(0, 16) : ''}">
                    </div>
                    <div class="form-group">
                        <label for="taskDescription">${window.i18n?.t('form_description') || 'Description'}</label>
                        <textarea id="taskDescription" class="form-input">${utils.escapeHtml(task.description || '')}</textarea>
                    </div>
                </form>
            `;

            const footer = `
                <button type="button" class="btn btn-secondary" onclick="modal.close()">${window.i18n?.t('cancel') || 'Cancel'}</button>
                <button type="button" class="btn btn-primary" onclick="app.tasks.save(${id || 'null'})">${window.i18n?.t('save') || 'Save'}</button>
            `;

            modal.open(id ? (window.i18n?.t('edit') || 'Edit') + ' Task' : (window.i18n?.t('add_task') || 'Add Task'), content, footer);
        },

        async save(id) {
            const data = {
                title: document.getElementById('taskTitle').value,
                status: document.getElementById('taskStatus').value,
                priority: document.getElementById('taskPriority').value,
                due_date: document.getElementById('taskDueDate').value,
                description: document.getElementById('taskDescription').value,
            };

            if (!data.title) {
                toast.error('Title is required');
                return;
            }

            try {
                if (id) {
                    data.id = id;
                    await api.put('tasks', data);
                } else {
                    await api.post('tasks', data);
                }
                modal.close();
                toast.success(window.i18n?.t('msg_save_success') || 'Saved');
                this.load();
            } catch (err) {
                toast.error(window.i18n?.t('msg_save_error') || 'Error saving');
            }
        },

        async delete(id) {
            if (!confirm(window.i18n?.t('msg_delete_confirm') || 'Are you sure?')) return;

            try {
                await api.delete('tasks', id);
                toast.success(window.i18n?.t('msg_delete_success') || 'Deleted');
                this.load();
            } catch (err) {
                toast.error(window.i18n?.t('msg_delete_error') || 'Error deleting');
            }
        },
    };

    // ===== Companies Module (simplified) =====
    const companies = {
        init() {
            document.getElementById('addCompanyBtn')?.addEventListener('click', () => this.showForm());
        },

        async load() {
            const tbody = document.getElementById('companiesTableBody');
            tbody.innerHTML = '<tr><td colspan="6" class="table-loading"><div class="loading-spinner"></div></td></tr>';

            try {
                const res = await api.get('companies', { page: state.companies.page, per_page: state.companies.perPage });
                state.companies.data = res.data;
                state.companies.total = res.meta.total;
                this.render();
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Error loading data</td></tr>';
            }
        },

        render() {
            const tbody = document.getElementById('companiesTableBody');
            if (state.companies.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="table-empty">${window.i18n?.t('no_results')}</td></tr>`;
                return;
            }

            tbody.innerHTML = state.companies.data.map(c => `
                <tr>
                    <td><strong>${utils.escapeHtml(c.name)}</strong></td>
                    <td>${utils.escapeHtml(c.industry || '-')}</td>
                    <td>${utils.escapeHtml(c.city || '-')}</td>
                    <td>${utils.escapeHtml(c.country || '-')}</td>
                    <td>${c.contacts_count || 0}</td>
                    <td>
                        <button class="btn-icon" onclick="app.companies.showForm(${c.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                        <button class="btn-icon" onclick="app.companies.delete(${c.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
                    </td>
                </tr>
            `).join('');
        },

        async showForm(id = null) {
            let company = { name: '', industry: '', website: '', phone: '', email: '', city: '', country: '' };
            if (id) {
                try {
                    const res = await api.get('companies', { id });
                    if (res.ok) company = res.data;
                } catch (err) { toast.error('Failed to load'); return; }
            }

            const content = `
                <form id="companyForm">
                    <div class="form-group"><label for="companyName">${window.i18n?.t('col_name')} *</label><input type="text" id="companyName" class="form-input" value="${utils.escapeHtml(company.name)}" required></div>
                    <div class="form-group"><label for="companyIndustry">${window.i18n?.t('col_industry')}</label><input type="text" id="companyIndustry" class="form-input" value="${utils.escapeHtml(company.industry || '')}"></div>
                    <div class="form-group"><label for="companyWebsite">${window.i18n?.t('form_website')}</label><input type="url" id="companyWebsite" class="form-input" value="${utils.escapeHtml(company.website || '')}"></div>
                    <div class="form-group"><label for="companyPhone">${window.i18n?.t('col_phone')}</label><input type="tel" id="companyPhone" class="form-input" value="${utils.escapeHtml(company.phone || '')}"></div>
                    <div class="form-group"><label for="companyCity">${window.i18n?.t('col_city')}</label><input type="text" id="companyCity" class="form-input" value="${utils.escapeHtml(company.city || '')}"></div>
                    <div class="form-group"><label for="companyCountry">${window.i18n?.t('col_country')}</label><input type="text" id="companyCountry" class="form-input" value="${utils.escapeHtml(company.country || '')}"></div>
                </form>
            `;
            const footer = `<button type="button" class="btn btn-secondary" onclick="modal.close()">${window.i18n?.t('cancel')}</button><button type="button" class="btn btn-primary" onclick="app.companies.save(${id || 'null'})">${window.i18n?.t('save')}</button>`;
            modal.open(id ? 'Edit Company' : window.i18n?.t('add_company'), content, footer);
        },

        async save(id) {
            const data = {
                name: document.getElementById('companyName').value,
                industry: document.getElementById('companyIndustry').value,
                website: document.getElementById('companyWebsite').value,
                phone: document.getElementById('companyPhone').value,
                city: document.getElementById('companyCity').value,
                country: document.getElementById('companyCountry').value,
            };
            if (!data.name) { toast.error('Name required'); return; }
            try {
                if (id) { data.id = id; await api.put('companies', data); }
                else { await api.post('companies', data); }
                modal.close(); toast.success('Saved'); this.load();
            } catch (err) { toast.error('Error'); }
        },

        async delete(id) {
            if (!confirm('Are you sure?')) return;
            try { await api.delete('companies', id); toast.success('Deleted'); this.load(); }
            catch (err) { toast.error('Error'); }
        },
    };

    // ===== Contacts Module (simplified) =====
    const contacts = {
        init() {
            document.getElementById('addContactBtn')?.addEventListener('click', () => this.showForm());
        },

        async load() {
            const tbody = document.getElementById('contactsTableBody');
            tbody.innerHTML = '<tr><td colspan="6" class="table-loading"><div class="loading-spinner"></div></td></tr>';
            try {
                const res = await api.get('contacts', { page: state.contacts.page, per_page: state.contacts.perPage });
                state.contacts.data = res.data;
                state.contacts.total = res.meta.total;
                this.render();
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Error</td></tr>';
            }
        },

        render() {
            const tbody = document.getElementById('contactsTableBody');
            if (state.contacts.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="table-empty">${window.i18n?.t('no_results')}</td></tr>`;
                return;
            }
            tbody.innerHTML = state.contacts.data.map(c => `
                <tr>
                    <td><strong>${utils.escapeHtml(c.first_name)} ${utils.escapeHtml(c.last_name)}</strong></td>
                    <td>${utils.escapeHtml(c.email || '-')}</td>
                    <td>${utils.escapeHtml(c.phone || '-')}</td>
                    <td>${utils.escapeHtml(c.job_title || '-')}</td>
                    <td>${utils.escapeHtml(c.company_name || '-')}</td>
                    <td>
                        <button class="btn-icon" onclick="app.contacts.showForm(${c.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                        <button class="btn-icon" onclick="app.contacts.delete(${c.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
                    </td>
                </tr>
            `).join('');
        },

        async showForm(id = null) {
            let contact = { first_name: '', last_name: '', email: '', phone: '', job_title: '' };
            if (id) {
                try {
                    const res = await api.get('contacts', { id });
                    if (res.ok) contact = res.data;
                } catch (err) { toast.error('Failed'); return; }
            }
            const content = `
                <form id="contactForm">
                    <div class="form-group"><label>${window.i18n?.t('form_first_name')} *</label><input type="text" id="contactFirstName" class="form-input" value="${utils.escapeHtml(contact.first_name)}" required></div>
                    <div class="form-group"><label>${window.i18n?.t('form_last_name')} *</label><input type="text" id="contactLastName" class="form-input" value="${utils.escapeHtml(contact.last_name)}" required></div>
                    <div class="form-group"><label>${window.i18n?.t('col_email')}</label><input type="email" id="contactEmail" class="form-input" value="${utils.escapeHtml(contact.email || '')}"></div>
                    <div class="form-group"><label>${window.i18n?.t('col_phone')}</label><input type="tel" id="contactPhone" class="form-input" value="${utils.escapeHtml(contact.phone || '')}"></div>
                    <div class="form-group"><label>${window.i18n?.t('col_job_title')}</label><input type="text" id="contactJobTitle" class="form-input" value="${utils.escapeHtml(contact.job_title || '')}"></div>
                </form>
            `;
            const footer = `<button class="btn btn-secondary" onclick="modal.close()">${window.i18n?.t('cancel')}</button><button class="btn btn-primary" onclick="app.contacts.save(${id || 'null'})">${window.i18n?.t('save')}</button>`;
            modal.open(id ? 'Edit Contact' : window.i18n?.t('add_contact'), content, footer);
        },

        async save(id) {
            const data = {
                first_name: document.getElementById('contactFirstName').value,
                last_name: document.getElementById('contactLastName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                job_title: document.getElementById('contactJobTitle').value,
            };
            if (!data.first_name || !data.last_name) { toast.error('Name required'); return; }
            try {
                if (id) { data.id = id; await api.put('contacts', data); }
                else { await api.post('contacts', data); }
                modal.close(); toast.success('Saved'); this.load();
            } catch (err) { toast.error('Error'); }
        },

        async delete(id) {
            if (!confirm('Are you sure?')) return;
            try { await api.delete('contacts', id); toast.success('Deleted'); this.load(); }
            catch (err) { toast.error('Error'); }
        },
    };

    // ===== Users Module (Admin only) =====
    const users = {
        init() {
            if (state.user?.role !== 'admin') return;
            document.getElementById('addUserBtn')?.addEventListener('click', () => this.showForm());
        },

        async load() {
            if (state.user?.role !== 'admin') return;
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = '<tr><td colspan="6" class="table-loading"><div class="loading-spinner"></div></td></tr>';
            try {
                const res = await api.get('users', { page: state.users.page, per_page: state.users.perPage });
                state.users.data = res.data;
                state.users.total = res.meta.total;
                this.render();
            } catch (err) {
                tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Error</td></tr>';
            }
        },

        render() {
            const tbody = document.getElementById('usersTableBody');
            if (state.users.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="table-empty">${window.i18n?.t('no_results')}</td></tr>`;
                return;
            }
            tbody.innerHTML = state.users.data.map(u => `
                <tr>
                    <td><strong>${utils.escapeHtml(u.first_name)} ${utils.escapeHtml(u.last_name)}</strong></td>
                    <td>${utils.escapeHtml(u.email)}</td>
                    <td><span class="badge ${u.role === 'admin' ? 'badge-primary' : 'badge-gray'}">${window.i18n?.t('role_' + u.role) || u.role}</span></td>
                    <td><span class="badge ${u.is_active ? 'badge-success' : 'badge-danger'}">${u.is_active ? window.i18n?.t('active') : window.i18n?.t('inactive')}</span></td>
                    <td>${utils.formatDateTime(u.last_login)}</td>
                    <td>
                        <button class="btn-icon" onclick="app.users.showForm(${u.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                        ${u.id !== state.user.id ? `<button class="btn-icon" onclick="app.users.delete(${u.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>` : ''}
                    </td>
                </tr>
            `).join('');
        },

        async showForm(id = null) {
            let user = { first_name: '', last_name: '', email: '', role: 'user', is_active: true };
            if (id) {
                try {
                    const res = await api.get('users', { id });
                    if (res.ok) user = res.data;
                } catch (err) { toast.error('Failed'); return; }
            }
            const content = `
                <form id="userForm">
                    <div class="form-group"><label>${window.i18n?.t('form_first_name')} *</label><input type="text" id="userFirstName" class="form-input" value="${utils.escapeHtml(user.first_name)}" required></div>
                    <div class="form-group"><label>${window.i18n?.t('form_last_name')} *</label><input type="text" id="userLastName" class="form-input" value="${utils.escapeHtml(user.last_name)}" required></div>
                    <div class="form-group"><label>${window.i18n?.t('col_email')} *</label><input type="email" id="userEmail" class="form-input" value="${utils.escapeHtml(user.email)}" required></div>
                    <div class="form-group"><label>${window.i18n?.t('form_role')}</label><select id="userRole" class="form-input"><option value="user" ${user.role === 'user' ? 'selected' : ''}>${window.i18n?.t('role_user')}</option><option value="admin" ${user.role === 'admin' ? 'selected' : ''}>${window.i18n?.t('role_admin')}</option></select></div>
                    ${!id ? `<div class="form-group"><label>${window.i18n?.t('form_password')} *</label><input type="password" id="userPassword" class="form-input" required minlength="8"></div>` : ''}
                    <div class="form-group"><label><input type="checkbox" id="userActive" ${user.is_active ? 'checked' : ''}> ${window.i18n?.t('active')}</label></div>
                </form>
            `;
            const footer = `<button class="btn btn-secondary" onclick="modal.close()">${window.i18n?.t('cancel')}</button><button class="btn btn-primary" onclick="app.users.save(${id || 'null'})">${window.i18n?.t('save')}</button>`;
            modal.open(id ? 'Edit User' : window.i18n?.t('add_user'), content, footer);
        },

        async save(id) {
            const data = {
                first_name: document.getElementById('userFirstName').value,
                last_name: document.getElementById('userLastName').value,
                email: document.getElementById('userEmail').value,
                role: document.getElementById('userRole').value,
                is_active: document.getElementById('userActive').checked,
            };
            if (!id) data.password = document.getElementById('userPassword')?.value;
            if (!data.first_name || !data.last_name || !data.email) { toast.error('Required fields'); return; }
            if (!id && (!data.password || data.password.length < 8)) { toast.error('Password min 8 chars'); return; }
            try {
                if (id) { data.id = id; await api.put('users', data); }
                else { await api.post('users', data); }
                modal.close(); toast.success('Saved'); this.load();
            } catch (err) { toast.error(err.message || 'Error'); }
        },

        async delete(id) {
            if (!confirm('Are you sure?')) return;
            try { await api.delete('users', id); toast.success('Deleted'); this.load(); }
            catch (err) { toast.error(err.message || 'Error'); }
        },
    };

    // ===== Theme Toggle =====
    function initTheme() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ===== Language Selector =====
    function initLangSelector() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        if (!langBtn || !langDropdown) return;

        langBtn.addEventListener('click', () => {
            const isOpen = !langDropdown.hidden;
            langDropdown.hidden = isOpen;
            langBtn.setAttribute('aria-expanded', !isOpen);
        });

        langDropdown.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            if (lang && window.i18n) {
                window.i18n.setLocale(lang);
                langDropdown.hidden = true;
                langBtn.setAttribute('aria-expanded', false);
            }
        });

        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.hidden = true;
                langBtn.setAttribute('aria-expanded', false);
            }
        });
    }

    // ===== User Menu =====
    function initUserMenu() {
        const userBtn = document.getElementById('userBtn');
        const userDropdown = document.getElementById('userDropdown');
        if (!userBtn || !userDropdown) return;

        userBtn.addEventListener('click', () => {
            const isOpen = !userDropdown.hidden;
            userDropdown.hidden = isOpen;
            userBtn.setAttribute('aria-expanded', !isOpen);
        });

        userDropdown.addEventListener('click', async (e) => {
            const action = e.target.dataset.action || e.target.closest('[data-action]')?.dataset.action;
            if (action === 'logout') {
                e.preventDefault();
                try {
                    await api.post('auth', { action: 'logout' });
                    window.location.href = '/views/login.php';
                } catch (err) {
                    window.location.href = '/views/login.php';
                }
            }
            userDropdown.hidden = true;
        });

        document.addEventListener('click', (e) => {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.hidden = true;
                userBtn.setAttribute('aria-expanded', false);
            }
        });
    }

    // ===== Initialize Application =====
    async function init() {
        // Initialize CSRF token
        if (!api.csrfToken) {
            await api.refreshCsrf();
        }

        // Initialize components
        toast.init();
        modal.init();
        nav.init();

        // Initialize modules
        leads.init();
        deals.init();
        tasks.init();
        companies.init();
        contacts.init();
        users.init();

        // Initialize UI components
        initTheme();
        initLangSelector();
        initUserMenu();

        // Load initial data
        await dashboard.load();
    }

    // Expose to global scope
    window.app = {
        leads,
        deals,
        tasks,
        companies,
        contacts,
        users,
        api,
        utils,
        toast,
    };

    window.modal = modal;

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
