/**
 * CRM Application - Internationalization (i18n)
 * Supports: French (fr), English (en), German (de), Italian (it)
 */

(function() {
    'use strict';

    // Translation dictionaries
    const translations = {
        fr: {
            // App
            app_name: 'Application CRM',
            login_title: 'Connexion',
            login_tagline: 'Gestionnaire de Leads & Ventes',
            login_button: 'Se connecter',
            logout: 'Deconnexion',
            profile: 'Profil',
            settings: 'Parametres',

            // Auth
            email: 'Email',
            password: 'Mot de passe',
            email_required: 'Email valide requis',
            password_required: 'Mot de passe requis (8 caracteres min.)',
            invalid_credentials: 'Email ou mot de passe incorrect',
            account_locked: 'Compte verrouille. Reessayez dans {minutes} minutes.',
            account_inactive: 'Compte inactif. Contactez l\'administrateur.',
            network_error: 'Erreur de connexion. Veuillez reessayer.',

            // Navigation
            nav_dashboard: 'Tableau de bord',
            nav_leads: 'Leads',
            nav_deals: 'Affaires',
            nav_tasks: 'Taches',
            nav_companies: 'Entreprises',
            nav_contacts: 'Contacts',
            nav_users: 'Utilisateurs',

            // Dashboard
            dashboard_title: 'Tableau de bord',
            total_leads: 'Total Leads',
            open_deals: 'Affaires ouvertes',
            pipeline_value: 'Valeur pipeline',
            pending_tasks: 'Taches en attente',
            recent_leads: 'Leads recents',
            upcoming_tasks: 'Taches a venir',
            recent_activities: 'Activites recentes',
            view_all: 'Voir tout',

            // Actions
            add_lead: 'Ajouter un lead',
            add_deal: 'Ajouter une affaire',
            add_task: 'Ajouter une tache',
            add_company: 'Ajouter une entreprise',
            add_contact: 'Ajouter un contact',
            add_user: 'Ajouter un utilisateur',
            edit: 'Modifier',
            delete: 'Supprimer',
            save: 'Enregistrer',
            cancel: 'Annuler',
            close: 'Fermer',
            confirm: 'Confirmer',
            export_csv: 'Exporter CSV',

            // Views
            view_pipeline: 'Pipeline',
            view_list: 'Liste',

            // Search & Filters
            search_leads: 'Rechercher des leads...',
            search_deals: 'Rechercher des affaires...',
            search_tasks: 'Rechercher des taches...',
            search_companies: 'Rechercher des entreprises...',
            search_contacts: 'Rechercher des contacts...',
            all_statuses: 'Tous les statuts',
            all_priorities: 'Toutes les priorites',
            all_stages: 'Toutes les etapes',

            // Table columns
            col_name: 'Nom',
            col_email: 'Email',
            col_phone: 'Telephone',
            col_company: 'Entreprise',
            col_status: 'Statut',
            col_priority: 'Priorite',
            col_score: 'Score',
            col_next_action: 'Prochaine action',
            col_stage: 'Etape',
            col_amount: 'Montant',
            col_probability: 'Probabilite',
            col_close_date: 'Date cloture',
            col_title: 'Titre',
            col_due_date: 'Date limite',
            col_related: 'Lie a',
            col_industry: 'Secteur',
            col_city: 'Ville',
            col_country: 'Pays',
            col_contacts: 'Contacts',
            col_job_title: 'Poste',
            col_role: 'Role',
            col_last_login: 'Derniere connexion',
            col_actions: 'Actions',

            // Statuses
            status_new: 'Nouveau',
            status_contacted: 'Contacte',
            status_qualified: 'Qualifie',
            status_proposal: 'Proposition',
            status_negotiation: 'Negociation',
            status_won: 'Gagne',
            status_lost: 'Perdu',

            // Priorities
            priority_low: 'Basse',
            priority_medium: 'Moyenne',
            priority_high: 'Haute',
            priority_urgent: 'Urgente',

            // Task statuses
            task_pending: 'En attente',
            task_in_progress: 'En cours',
            task_completed: 'Termine',
            task_cancelled: 'Annule',

            // Deal stages
            stage_prospecting: 'Prospection',
            stage_qualification: 'Qualification',
            stage_proposal: 'Proposition',
            stage_negotiation: 'Negociation',
            stage_closed_won: 'Gagne',
            stage_closed_lost: 'Perdu',

            // Form labels
            form_first_name: 'Prenom',
            form_last_name: 'Nom',
            form_email: 'Email',
            form_phone: 'Telephone',
            form_mobile: 'Mobile',
            form_company: 'Entreprise',
            form_website: 'Site web',
            form_address: 'Adresse',
            form_city: 'Ville',
            form_country: 'Pays',
            form_industry: 'Secteur',
            form_job_title: 'Poste',
            form_source: 'Source',
            form_status: 'Statut',
            form_priority: 'Priorite',
            form_stage: 'Etape',
            form_amount: 'Montant',
            form_probability: 'Probabilite (%)',
            form_expected_close: 'Date cloture prevue',
            form_description: 'Description',
            form_notes: 'Notes',
            form_owner: 'Responsable',
            form_assigned_to: 'Assigne a',
            form_role: 'Role',
            form_password: 'Mot de passe',
            form_new_password: 'Nouveau mot de passe',
            form_confirm_password: 'Confirmer mot de passe',

            // Messages
            msg_loading: 'Chargement...',
            msg_no_data: 'Aucune donnee',
            msg_save_success: 'Enregistre avec succes',
            msg_save_error: 'Erreur lors de l\'enregistrement',
            msg_delete_confirm: 'Etes-vous sur de vouloir supprimer ?',
            msg_delete_success: 'Supprime avec succes',
            msg_delete_error: 'Erreur lors de la suppression',

            // User roles
            role_admin: 'Administrateur',
            role_user: 'Utilisateur',

            // Misc
            active: 'Actif',
            inactive: 'Inactif',
            yes: 'Oui',
            no: 'Non',
            today: 'Aujourd\'hui',
            yesterday: 'Hier',
            tomorrow: 'Demain',
            overdue: 'En retard',
            no_results: 'Aucun resultat',
        },

        en: {
            // App
            app_name: 'CRM Application',
            login_title: 'Sign In',
            login_tagline: 'Leads & Sales Manager',
            login_button: 'Sign In',
            logout: 'Logout',
            profile: 'Profile',
            settings: 'Settings',

            // Auth
            email: 'Email',
            password: 'Password',
            email_required: 'Valid email is required',
            password_required: 'Password is required (min. 8 characters)',
            invalid_credentials: 'Invalid email or password',
            account_locked: 'Account locked. Try again in {minutes} minutes.',
            account_inactive: 'Account is inactive. Contact administrator.',
            network_error: 'Connection error. Please try again.',

            // Navigation
            nav_dashboard: 'Dashboard',
            nav_leads: 'Leads',
            nav_deals: 'Deals',
            nav_tasks: 'Tasks',
            nav_companies: 'Companies',
            nav_contacts: 'Contacts',
            nav_users: 'Users',

            // Dashboard
            dashboard_title: 'Dashboard',
            total_leads: 'Total Leads',
            open_deals: 'Open Deals',
            pipeline_value: 'Pipeline Value',
            pending_tasks: 'Pending Tasks',
            recent_leads: 'Recent Leads',
            upcoming_tasks: 'Upcoming Tasks',
            recent_activities: 'Recent Activities',
            view_all: 'View All',

            // Actions
            add_lead: 'Add Lead',
            add_deal: 'Add Deal',
            add_task: 'Add Task',
            add_company: 'Add Company',
            add_contact: 'Add Contact',
            add_user: 'Add User',
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel',
            close: 'Close',
            confirm: 'Confirm',
            export_csv: 'Export CSV',

            // Views
            view_pipeline: 'Pipeline',
            view_list: 'List',

            // Search & Filters
            search_leads: 'Search leads...',
            search_deals: 'Search deals...',
            search_tasks: 'Search tasks...',
            search_companies: 'Search companies...',
            search_contacts: 'Search contacts...',
            all_statuses: 'All Statuses',
            all_priorities: 'All Priorities',
            all_stages: 'All Stages',

            // Table columns
            col_name: 'Name',
            col_email: 'Email',
            col_phone: 'Phone',
            col_company: 'Company',
            col_status: 'Status',
            col_priority: 'Priority',
            col_score: 'Score',
            col_next_action: 'Next Action',
            col_stage: 'Stage',
            col_amount: 'Amount',
            col_probability: 'Probability',
            col_close_date: 'Close Date',
            col_title: 'Title',
            col_due_date: 'Due Date',
            col_related: 'Related To',
            col_industry: 'Industry',
            col_city: 'City',
            col_country: 'Country',
            col_contacts: 'Contacts',
            col_job_title: 'Job Title',
            col_role: 'Role',
            col_last_login: 'Last Login',
            col_actions: 'Actions',

            // Statuses
            status_new: 'New',
            status_contacted: 'Contacted',
            status_qualified: 'Qualified',
            status_proposal: 'Proposal',
            status_negotiation: 'Negotiation',
            status_won: 'Won',
            status_lost: 'Lost',

            // Priorities
            priority_low: 'Low',
            priority_medium: 'Medium',
            priority_high: 'High',
            priority_urgent: 'Urgent',

            // Task statuses
            task_pending: 'Pending',
            task_in_progress: 'In Progress',
            task_completed: 'Completed',
            task_cancelled: 'Cancelled',

            // Deal stages
            stage_prospecting: 'Prospecting',
            stage_qualification: 'Qualification',
            stage_proposal: 'Proposal',
            stage_negotiation: 'Negotiation',
            stage_closed_won: 'Closed Won',
            stage_closed_lost: 'Closed Lost',

            // Form labels
            form_first_name: 'First Name',
            form_last_name: 'Last Name',
            form_email: 'Email',
            form_phone: 'Phone',
            form_mobile: 'Mobile',
            form_company: 'Company',
            form_website: 'Website',
            form_address: 'Address',
            form_city: 'City',
            form_country: 'Country',
            form_industry: 'Industry',
            form_job_title: 'Job Title',
            form_source: 'Source',
            form_status: 'Status',
            form_priority: 'Priority',
            form_stage: 'Stage',
            form_amount: 'Amount',
            form_probability: 'Probability (%)',
            form_expected_close: 'Expected Close Date',
            form_description: 'Description',
            form_notes: 'Notes',
            form_owner: 'Owner',
            form_assigned_to: 'Assigned To',
            form_role: 'Role',
            form_password: 'Password',
            form_new_password: 'New Password',
            form_confirm_password: 'Confirm Password',

            // Messages
            msg_loading: 'Loading...',
            msg_no_data: 'No data',
            msg_save_success: 'Saved successfully',
            msg_save_error: 'Error saving data',
            msg_delete_confirm: 'Are you sure you want to delete?',
            msg_delete_success: 'Deleted successfully',
            msg_delete_error: 'Error deleting',

            // User roles
            role_admin: 'Administrator',
            role_user: 'User',

            // Misc
            active: 'Active',
            inactive: 'Inactive',
            yes: 'Yes',
            no: 'No',
            today: 'Today',
            yesterday: 'Yesterday',
            tomorrow: 'Tomorrow',
            overdue: 'Overdue',
            no_results: 'No results',
        },

        de: {
            // App
            app_name: 'CRM-Anwendung',
            login_title: 'Anmelden',
            login_tagline: 'Leads & Verkaufsmanager',
            login_button: 'Anmelden',
            logout: 'Abmelden',
            profile: 'Profil',
            settings: 'Einstellungen',

            // Auth
            email: 'E-Mail',
            password: 'Passwort',
            email_required: 'Gultige E-Mail erforderlich',
            password_required: 'Passwort erforderlich (mind. 8 Zeichen)',
            invalid_credentials: 'Ungultige E-Mail oder Passwort',
            account_locked: 'Konto gesperrt. Versuchen Sie es in {minutes} Minuten erneut.',
            account_inactive: 'Konto ist inaktiv. Kontaktieren Sie den Administrator.',
            network_error: 'Verbindungsfehler. Bitte versuchen Sie es erneut.',

            // Navigation
            nav_dashboard: 'Dashboard',
            nav_leads: 'Leads',
            nav_deals: 'Geschafte',
            nav_tasks: 'Aufgaben',
            nav_companies: 'Unternehmen',
            nav_contacts: 'Kontakte',
            nav_users: 'Benutzer',

            // Dashboard
            dashboard_title: 'Dashboard',
            total_leads: 'Gesamt Leads',
            open_deals: 'Offene Geschafte',
            pipeline_value: 'Pipeline-Wert',
            pending_tasks: 'Ausstehende Aufgaben',
            recent_leads: 'Neueste Leads',
            upcoming_tasks: 'Bevorstehende Aufgaben',
            recent_activities: 'Neueste Aktivitaten',
            view_all: 'Alle anzeigen',

            // Actions
            add_lead: 'Lead hinzufugen',
            add_deal: 'Geschaft hinzufugen',
            add_task: 'Aufgabe hinzufugen',
            add_company: 'Unternehmen hinzufugen',
            add_contact: 'Kontakt hinzufugen',
            add_user: 'Benutzer hinzufugen',
            edit: 'Bearbeiten',
            delete: 'Loschen',
            save: 'Speichern',
            cancel: 'Abbrechen',
            close: 'Schliessen',
            confirm: 'Bestatigen',
            export_csv: 'CSV exportieren',

            // Views
            view_pipeline: 'Pipeline',
            view_list: 'Liste',

            // Search & Filters
            search_leads: 'Leads suchen...',
            search_deals: 'Geschafte suchen...',
            search_tasks: 'Aufgaben suchen...',
            search_companies: 'Unternehmen suchen...',
            search_contacts: 'Kontakte suchen...',
            all_statuses: 'Alle Status',
            all_priorities: 'Alle Prioritaten',
            all_stages: 'Alle Phasen',

            // Table columns
            col_name: 'Name',
            col_email: 'E-Mail',
            col_phone: 'Telefon',
            col_company: 'Unternehmen',
            col_status: 'Status',
            col_priority: 'Prioritat',
            col_score: 'Punktzahl',
            col_next_action: 'Nachste Aktion',
            col_stage: 'Phase',
            col_amount: 'Betrag',
            col_probability: 'Wahrscheinlichkeit',
            col_close_date: 'Abschlussdatum',
            col_title: 'Titel',
            col_due_date: 'Fallig am',
            col_related: 'Bezogen auf',
            col_industry: 'Branche',
            col_city: 'Stadt',
            col_country: 'Land',
            col_contacts: 'Kontakte',
            col_job_title: 'Position',
            col_role: 'Rolle',
            col_last_login: 'Letzte Anmeldung',
            col_actions: 'Aktionen',

            // Statuses
            status_new: 'Neu',
            status_contacted: 'Kontaktiert',
            status_qualified: 'Qualifiziert',
            status_proposal: 'Angebot',
            status_negotiation: 'Verhandlung',
            status_won: 'Gewonnen',
            status_lost: 'Verloren',

            // Priorities
            priority_low: 'Niedrig',
            priority_medium: 'Mittel',
            priority_high: 'Hoch',
            priority_urgent: 'Dringend',

            // Task statuses
            task_pending: 'Ausstehend',
            task_in_progress: 'In Bearbeitung',
            task_completed: 'Abgeschlossen',
            task_cancelled: 'Abgebrochen',

            // Deal stages
            stage_prospecting: 'Akquise',
            stage_qualification: 'Qualifizierung',
            stage_proposal: 'Angebot',
            stage_negotiation: 'Verhandlung',
            stage_closed_won: 'Gewonnen',
            stage_closed_lost: 'Verloren',

            // Form labels
            form_first_name: 'Vorname',
            form_last_name: 'Nachname',
            form_email: 'E-Mail',
            form_phone: 'Telefon',
            form_mobile: 'Mobil',
            form_company: 'Unternehmen',
            form_website: 'Webseite',
            form_address: 'Adresse',
            form_city: 'Stadt',
            form_country: 'Land',
            form_industry: 'Branche',
            form_job_title: 'Position',
            form_source: 'Quelle',
            form_status: 'Status',
            form_priority: 'Prioritat',
            form_stage: 'Phase',
            form_amount: 'Betrag',
            form_probability: 'Wahrscheinlichkeit (%)',
            form_expected_close: 'Erwartetes Abschlussdatum',
            form_description: 'Beschreibung',
            form_notes: 'Notizen',
            form_owner: 'Besitzer',
            form_assigned_to: 'Zugewiesen an',
            form_role: 'Rolle',
            form_password: 'Passwort',
            form_new_password: 'Neues Passwort',
            form_confirm_password: 'Passwort bestatigen',

            // Messages
            msg_loading: 'Laden...',
            msg_no_data: 'Keine Daten',
            msg_save_success: 'Erfolgreich gespeichert',
            msg_save_error: 'Fehler beim Speichern',
            msg_delete_confirm: 'Sind Sie sicher, dass Sie loschen mochten?',
            msg_delete_success: 'Erfolgreich geloscht',
            msg_delete_error: 'Fehler beim Loschen',

            // User roles
            role_admin: 'Administrator',
            role_user: 'Benutzer',

            // Misc
            active: 'Aktiv',
            inactive: 'Inaktiv',
            yes: 'Ja',
            no: 'Nein',
            today: 'Heute',
            yesterday: 'Gestern',
            tomorrow: 'Morgen',
            overdue: 'Uberfällig',
            no_results: 'Keine Ergebnisse',
        },

        it: {
            // App
            app_name: 'Applicazione CRM',
            login_title: 'Accedi',
            login_tagline: 'Gestore Lead e Vendite',
            login_button: 'Accedi',
            logout: 'Esci',
            profile: 'Profilo',
            settings: 'Impostazioni',

            // Auth
            email: 'Email',
            password: 'Password',
            email_required: 'Email valida richiesta',
            password_required: 'Password richiesta (min. 8 caratteri)',
            invalid_credentials: 'Email o password non validi',
            account_locked: 'Account bloccato. Riprova tra {minutes} minuti.',
            account_inactive: 'Account inattivo. Contatta l\'amministratore.',
            network_error: 'Errore di connessione. Riprova.',

            // Navigation
            nav_dashboard: 'Dashboard',
            nav_leads: 'Lead',
            nav_deals: 'Affari',
            nav_tasks: 'Attivita',
            nav_companies: 'Aziende',
            nav_contacts: 'Contatti',
            nav_users: 'Utenti',

            // Dashboard
            dashboard_title: 'Dashboard',
            total_leads: 'Lead Totali',
            open_deals: 'Affari Aperti',
            pipeline_value: 'Valore Pipeline',
            pending_tasks: 'Attivita in Sospeso',
            recent_leads: 'Lead Recenti',
            upcoming_tasks: 'Attivita Imminenti',
            recent_activities: 'Attivita Recenti',
            view_all: 'Vedi Tutto',

            // Actions
            add_lead: 'Aggiungi Lead',
            add_deal: 'Aggiungi Affare',
            add_task: 'Aggiungi Attivita',
            add_company: 'Aggiungi Azienda',
            add_contact: 'Aggiungi Contatto',
            add_user: 'Aggiungi Utente',
            edit: 'Modifica',
            delete: 'Elimina',
            save: 'Salva',
            cancel: 'Annulla',
            close: 'Chiudi',
            confirm: 'Conferma',
            export_csv: 'Esporta CSV',

            // Views
            view_pipeline: 'Pipeline',
            view_list: 'Lista',

            // Search & Filters
            search_leads: 'Cerca lead...',
            search_deals: 'Cerca affari...',
            search_tasks: 'Cerca attivita...',
            search_companies: 'Cerca aziende...',
            search_contacts: 'Cerca contatti...',
            all_statuses: 'Tutti gli Stati',
            all_priorities: 'Tutte le Priorita',
            all_stages: 'Tutte le Fasi',

            // Table columns
            col_name: 'Nome',
            col_email: 'Email',
            col_phone: 'Telefono',
            col_company: 'Azienda',
            col_status: 'Stato',
            col_priority: 'Priorita',
            col_score: 'Punteggio',
            col_next_action: 'Prossima Azione',
            col_stage: 'Fase',
            col_amount: 'Importo',
            col_probability: 'Probabilita',
            col_close_date: 'Data Chiusura',
            col_title: 'Titolo',
            col_due_date: 'Scadenza',
            col_related: 'Collegato a',
            col_industry: 'Settore',
            col_city: 'Citta',
            col_country: 'Paese',
            col_contacts: 'Contatti',
            col_job_title: 'Ruolo',
            col_role: 'Ruolo',
            col_last_login: 'Ultimo Accesso',
            col_actions: 'Azioni',

            // Statuses
            status_new: 'Nuovo',
            status_contacted: 'Contattato',
            status_qualified: 'Qualificato',
            status_proposal: 'Proposta',
            status_negotiation: 'Negoziazione',
            status_won: 'Vinto',
            status_lost: 'Perso',

            // Priorities
            priority_low: 'Bassa',
            priority_medium: 'Media',
            priority_high: 'Alta',
            priority_urgent: 'Urgente',

            // Task statuses
            task_pending: 'In Sospeso',
            task_in_progress: 'In Corso',
            task_completed: 'Completato',
            task_cancelled: 'Annullato',

            // Deal stages
            stage_prospecting: 'Prospezione',
            stage_qualification: 'Qualificazione',
            stage_proposal: 'Proposta',
            stage_negotiation: 'Negoziazione',
            stage_closed_won: 'Vinto',
            stage_closed_lost: 'Perso',

            // Form labels
            form_first_name: 'Nome',
            form_last_name: 'Cognome',
            form_email: 'Email',
            form_phone: 'Telefono',
            form_mobile: 'Cellulare',
            form_company: 'Azienda',
            form_website: 'Sito Web',
            form_address: 'Indirizzo',
            form_city: 'Citta',
            form_country: 'Paese',
            form_industry: 'Settore',
            form_job_title: 'Ruolo',
            form_source: 'Fonte',
            form_status: 'Stato',
            form_priority: 'Priorita',
            form_stage: 'Fase',
            form_amount: 'Importo',
            form_probability: 'Probabilita (%)',
            form_expected_close: 'Data Chiusura Prevista',
            form_description: 'Descrizione',
            form_notes: 'Note',
            form_owner: 'Proprietario',
            form_assigned_to: 'Assegnato a',
            form_role: 'Ruolo',
            form_password: 'Password',
            form_new_password: 'Nuova Password',
            form_confirm_password: 'Conferma Password',

            // Messages
            msg_loading: 'Caricamento...',
            msg_no_data: 'Nessun dato',
            msg_save_success: 'Salvato con successo',
            msg_save_error: 'Errore nel salvataggio',
            msg_delete_confirm: 'Sei sicuro di voler eliminare?',
            msg_delete_success: 'Eliminato con successo',
            msg_delete_error: 'Errore nell\'eliminazione',

            // User roles
            role_admin: 'Amministratore',
            role_user: 'Utente',

            // Misc
            active: 'Attivo',
            inactive: 'Inattivo',
            yes: 'Si',
            no: 'No',
            today: 'Oggi',
            yesterday: 'Ieri',
            tomorrow: 'Domani',
            overdue: 'Scaduto',
            no_results: 'Nessun risultato',
        },
    };

    // i18n class
    class I18n {
        constructor() {
            this.currentLocale = this.getSavedLocale() || 'fr';
            this.fallbackLocale = 'en';
        }

        getSavedLocale() {
            // Try localStorage first, then user preference from server
            const saved = localStorage.getItem('locale');
            if (saved && translations[saved]) {
                return saved;
            }

            // Check user data from server
            if (window.APP_USER && window.APP_USER.locale && translations[window.APP_USER.locale]) {
                return window.APP_USER.locale;
            }

            // Browser language detection
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                return browserLang;
            }

            return null;
        }

        setLocale(locale) {
            if (!translations[locale]) {
                console.warn(`Locale "${locale}" not available`);
                return;
            }

            this.currentLocale = locale;
            localStorage.setItem('locale', locale);

            // Update user preference on server if logged in
            if (window.APP_USER) {
                this.updateUserLocale(locale);
            }

            // Update all translated elements
            this.updatePageTranslations();

            // Update HTML lang attribute
            document.documentElement.lang = locale;

            // Dispatch event for other components
            document.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale } }));
        }

        getLocale() {
            return this.currentLocale;
        }

        t(key, params = {}) {
            let text = translations[this.currentLocale]?.[key]
                || translations[this.fallbackLocale]?.[key]
                || key;

            // Replace placeholders like {minutes}
            Object.keys(params).forEach(param => {
                text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
            });

            return text;
        }

        updatePageTranslations() {
            // Update elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                el.textContent = this.t(key);
            });

            // Update elements with data-i18n-placeholder attribute
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                el.placeholder = this.t(key);
            });

            // Update document title if needed
            const titleEl = document.querySelector('title');
            if (titleEl && titleEl.dataset.i18n) {
                titleEl.textContent = this.t(titleEl.dataset.i18n);
            }

            // Update language selector display
            const currentLangEl = document.getElementById('currentLang');
            if (currentLangEl) {
                currentLangEl.textContent = this.currentLocale.toUpperCase();
            }

            // Update dropdown selection
            document.querySelectorAll('.lang-dropdown li').forEach(li => {
                li.setAttribute('aria-selected', li.dataset.lang === this.currentLocale);
            });
        }

        async updateUserLocale(locale) {
            try {
                const csrfToken = sessionStorage.getItem('csrf_token');
                if (!csrfToken) return;

                await fetch('/api/users.php', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken,
                    },
                    body: JSON.stringify({
                        id: window.APP_USER.id,
                        locale: locale,
                    }),
                });
            } catch (err) {
                console.error('Failed to update user locale:', err);
            }
        }
    }

    // Create global instance
    window.i18n = new I18n();

    // Initialize translations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.i18n.updatePageTranslations();
        });
    } else {
        window.i18n.updatePageTranslations();
    }
})();
