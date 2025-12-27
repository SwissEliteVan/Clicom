<?php
/**
 * Header Template — Clic COM
 *
 * Includes:
 * - Skip link (a11y)
 * - Navbar sticky avec navigation + CTA Calendly
 * - Menu mobile responsive
 */

// Déterminer page active pour navigation
$current_page = basename($_SERVER['PHP_SELF'], '.php');
$current_dir = basename(dirname($_SERVER['PHP_SELF']));

function is_active($page) {
    global $current_page, $current_dir;
    return ($current_page === $page || $current_dir === $page) ? 'active' : '';
}
?>
<!DOCTYPE html>
<html lang="<?php echo SITE_LANG; ?>">
<head>
    <?php
    // Meta tags déjà inclus avant ce fichier
    // via include 'includes/meta.php' dans chaque page
    ?>
</head>
<body>

<!-- Skip Link (Accessibilité) -->
<a href="#main-content" class="skip-link">Aller au contenu principal</a>

<!-- Navbar -->
<header class="navbar" role="banner">
    <div class="container navbar-container">

        <!-- Logo -->
        <a href="<?php echo site_url(); ?>" class="navbar-logo" aria-label="Retour à l'accueil">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <!-- Logo simplifié : lettres CC stylisées -->
                <text x="2" y="24" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="currentColor">CC</text>
            </svg>
            <span class="navbar-logo-text"><?php echo esc_html(SITE_NAME); ?></span>
        </a>

        <!-- Menu Toggle (Mobile) -->
        <button class="navbar-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="navbar-menu">
            <svg class="icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="display:none;">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <!-- Navigation -->
        <nav class="navbar-nav" id="navbar-menu" role="navigation" aria-label="Navigation principale">
            <ul class="navbar-menu">
                <li><a href="<?php echo site_url(); ?>" class="<?php echo is_active('index'); ?>">Accueil</a></li>
                <li><a href="<?php echo site_url('services/'); ?>" class="<?php echo is_active('services'); ?>">Services</a></li>
                <li><a href="<?php echo site_url('resultats/'); ?>" class="<?php echo is_active('resultats'); ?>">Résultats</a></li>
                <li><a href="<?php echo site_url('blog/'); ?>" class="<?php echo is_active('blog'); ?>">Blog</a></li>
                <li><a href="<?php echo site_url('contact/'); ?>" class="<?php echo is_active('contact'); ?>">Contact</a></li>
            </ul>

            <!-- CTA Calendly (Desktop + Mobile) -->
            <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary navbar-cta" target="_blank" rel="noopener">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Planifier un appel</span>
            </a>
        </nav>

    </div>
</header>

<!-- Main Content Start -->
<main id="main-content" role="main">
