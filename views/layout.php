<?php
/**
 * Layout Template - Base HTML structure
 */

declare(strict_types=1);

// Load configuration
$configPath = __DIR__ . '/../config/config.php';
$config = file_exists($configPath) ? require $configPath : [];

$appName = $config['app']['name'] ?? 'CRM Application';
$appTagline = $config['app']['tagline'] ?? 'Leads & Sales Manager';
$defaultLocale = $config['app']['locale'] ?? 'fr';

// Handle error pages
$error = $_GET['error'] ?? null;
$errorMessages = [
    '404' => 'Page not found',
    '403' => 'Access forbidden',
    '500' => 'Server error',
];

/**
 * Render HTML page
 */
function renderPage(string $title, string $content, array $options = []): void {
    global $appName, $defaultLocale;

    $locale = $options['locale'] ?? $defaultLocale;
    $bodyClass = $options['bodyClass'] ?? '';
    $scripts = $options['scripts'] ?? [];
    $showNav = $options['showNav'] ?? false;
    $user = $options['user'] ?? null;
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($locale) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#2563eb">

    <title><?= htmlspecialchars($title) ?> - <?= htmlspecialchars($appName) ?></title>

    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="stylesheet" href="/assets/css/styles.css">

    <script>
        // Apply saved theme immediately to prevent flash
        (function() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>
</head>
<body class="<?= htmlspecialchars($bodyClass) ?>">
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <?php if ($showNav && $user): ?>
    <header class="app-header" role="banner">
        <div class="header-left">
            <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <a href="/views/app.php" class="logo-link">
                <img src="/assets/img/logo.svg" alt="" class="logo" width="32" height="32">
                <span class="app-name"><?= htmlspecialchars($appName) ?></span>
            </a>
        </div>

        <div class="header-right">
            <div class="lang-selector">
                <button class="lang-btn" id="langBtn" aria-haspopup="listbox" aria-expanded="false">
                    <span id="currentLang">FR</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                </button>
                <ul class="lang-dropdown" id="langDropdown" role="listbox" hidden>
                    <li role="option" data-lang="fr">Francais</li>
                    <li role="option" data-lang="en">English</li>
                    <li role="option" data-lang="de">Deutsch</li>
                    <li role="option" data-lang="it">Italiano</li>
                </ul>
            </div>

            <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
                <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
                <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
            </button>

            <div class="user-menu">
                <button class="user-btn" id="userBtn" aria-haspopup="menu" aria-expanded="false">
                    <span class="user-avatar" aria-hidden="true">
                        <?= strtoupper(substr($user['first_name'] ?? 'U', 0, 1)) ?>
                    </span>
                    <span class="user-name"><?= htmlspecialchars(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? '')) ?></span>
                </button>
                <ul class="user-dropdown" id="userDropdown" role="menu" hidden>
                    <li role="menuitem"><a href="#" data-action="profile" data-i18n="profile">Profile</a></li>
                    <?php if (($user['role'] ?? '') === 'admin'): ?>
                    <li role="menuitem"><a href="#" data-action="settings" data-i18n="settings">Settings</a></li>
                    <?php endif; ?>
                    <li role="separator"></li>
                    <li role="menuitem"><a href="#" data-action="logout" data-i18n="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </header>
    <?php endif; ?>

    <main id="main-content" class="main-content" role="main">
        <?= $content ?>
    </main>

    <!-- Toast Container for notifications -->
    <div id="toastContainer" class="toast-container" role="status" aria-live="polite" aria-atomic="true"></div>

    <!-- Modal Container -->
    <div id="modalOverlay" class="modal-overlay" hidden>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div class="modal-header">
                <h2 id="modalTitle" class="modal-title"></h2>
                <button class="modal-close" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body" id="modalBody"></div>
            <div class="modal-footer" id="modalFooter"></div>
        </div>
    </div>

    <script src="/assets/js/i18n.js" defer></script>
    <script src="/assets/js/app.js" defer></script>
    <?php foreach ($scripts as $script): ?>
    <script src="<?= htmlspecialchars($script) ?>" defer></script>
    <?php endforeach; ?>
</body>
</html>
<?php
}

// Handle error pages
if ($error && isset($errorMessages[$error])) {
    ob_start();
    ?>
    <div class="error-page">
        <h1 class="error-code"><?= htmlspecialchars($error) ?></h1>
        <p class="error-message"><?= htmlspecialchars($errorMessages[$error]) ?></p>
        <a href="/" class="btn btn-primary">Go to Home</a>
    </div>
    <?php
    $content = ob_get_clean();
    renderPage($errorMessages[$error], $content, ['bodyClass' => 'error-body']);
    exit;
}
