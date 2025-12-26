<?php
/**
 * Login Page
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

// Redirect if already logged in
if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
    header('Location: app.php');
    exit;
}

require_once __DIR__ . '/layout.php';

ob_start();
?>
<div class="login-container">
    <div class="login-card">
        <div class="login-header">
            <img src="/assets/img/logo.svg" alt="" class="login-logo" width="64" height="64">
            <h1 class="login-title" data-i18n="login_title"><?= htmlspecialchars($appName) ?></h1>
            <p class="login-tagline" data-i18n="login_tagline"><?= htmlspecialchars($appTagline) ?></p>
        </div>

        <form id="loginForm" class="login-form" method="post" novalidate>
            <div class="form-group">
                <label for="email" data-i18n="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-input"
                    required
                    autocomplete="email"
                    aria-describedby="emailError"
                    placeholder="email@example.com"
                >
                <span id="emailError" class="form-error" role="alert" hidden></span>
            </div>

            <div class="form-group">
                <label for="password" data-i18n="password">Password</label>
                <div class="password-input-wrapper">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-input"
                        required
                        autocomplete="current-password"
                        aria-describedby="passwordError"
                        minlength="8"
                    >
                    <button type="button" class="password-toggle" aria-label="Show password" tabindex="-1">
                        <svg class="icon-eye" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg class="icon-eye-off" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" hidden>
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                    </button>
                </div>
                <span id="passwordError" class="form-error" role="alert" hidden></span>
            </div>

            <div id="loginError" class="alert alert-error" role="alert" hidden>
                <span data-i18n="login_error">Invalid email or password</span>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="loginBtn">
                <span data-i18n="login_button">Sign In</span>
                <span class="btn-spinner" hidden></span>
            </button>
        </form>

        <div class="login-footer">
            <div class="lang-selector-inline">
                <button type="button" class="lang-option" data-lang="fr">FR</button>
                <button type="button" class="lang-option" data-lang="en">EN</button>
                <button type="button" class="lang-option" data-lang="de">DE</button>
                <button type="button" class="lang-option" data-lang="it">IT</button>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    const passwordToggle = document.querySelector('.password-toggle');

    // Password visibility toggle
    passwordToggle.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.querySelector('.icon-eye').hidden = !isPassword;
        this.querySelector('.icon-eye-off').hidden = isPassword;
        this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous errors
        loginError.hidden = true;
        document.querySelectorAll('.form-error').forEach(el => el.hidden = true);
        document.querySelectorAll('.form-input').forEach(el => el.classList.remove('input-error'));

        // Validate
        let isValid = true;

        if (!emailInput.value || !emailInput.validity.valid) {
            showFieldError('email', window.i18n ? window.i18n.t('email_required') : 'Valid email is required');
            isValid = false;
        }

        if (!passwordInput.value || passwordInput.value.length < 8) {
            showFieldError('password', window.i18n ? window.i18n.t('password_required') : 'Password must be at least 8 characters');
            isValid = false;
        }

        if (!isValid) return;

        // Show loading
        loginBtn.disabled = true;
        loginBtn.querySelector('.btn-spinner').hidden = false;

        try {
            const response = await fetch('/api/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    email: emailInput.value,
                    password: passwordInput.value,
                }),
            });

            const data = await response.json();

            if (data.ok) {
                // Store CSRF token
                if (data.data.csrf_token) {
                    sessionStorage.setItem('csrf_token', data.data.csrf_token);
                }

                // Store user locale preference
                if (data.data.user && data.data.user.locale) {
                    localStorage.setItem('locale', data.data.user.locale);
                }

                // Redirect to app
                window.location.href = 'app.php';
            } else {
                // Show error
                loginError.hidden = false;
                const errorSpan = loginError.querySelector('span');
                if (data.error === 'account_locked') {
                    const minutes = Math.ceil((data.data?.remaining_seconds || 900) / 60);
                    errorSpan.textContent = window.i18n
                        ? window.i18n.t('account_locked', { minutes })
                        : `Account locked. Try again in ${minutes} minutes.`;
                } else if (data.error === 'account_inactive') {
                    errorSpan.textContent = window.i18n
                        ? window.i18n.t('account_inactive')
                        : 'Account is inactive. Contact administrator.';
                } else {
                    errorSpan.textContent = window.i18n
                        ? window.i18n.t('invalid_credentials')
                        : 'Invalid email or password';
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            loginError.hidden = false;
            loginError.querySelector('span').textContent = window.i18n
                ? window.i18n.t('network_error')
                : 'Connection error. Please try again.';
        } finally {
            loginBtn.disabled = false;
            loginBtn.querySelector('.btn-spinner').hidden = true;
        }
    });

    function showFieldError(field, message) {
        const input = document.getElementById(field);
        const error = document.getElementById(field + 'Error');
        input.classList.add('input-error');
        error.textContent = message;
        error.hidden = false;
    }

    // Language selector
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            localStorage.setItem('locale', lang);
            document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (window.i18n) {
                window.i18n.setLocale(lang);
            }
        });
    });

    // Set active language
    const currentLang = localStorage.getItem('locale') || 'fr';
    const activeBtn = document.querySelector(`.lang-option[data-lang="${currentLang}"]`);
    if (activeBtn) activeBtn.classList.add('active');
});
</script>
<?php
$content = ob_get_clean();
renderPage('Login', $content, ['bodyClass' => 'login-body']);
