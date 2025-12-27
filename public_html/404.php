<?php
/**
 * Page 404 — Not Found
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/components.php';

// Set 404 header
http_response_code(404);

// Meta data
$meta = [
    'title' => 'Page non trouvée (404) — ' . SITE_NAME,
    'description' => 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    'canonical' => site_url('404.php'),
    'robots' => 'noindex, follow'
];

include __DIR__ . '/includes/meta.php';
include __DIR__ . '/includes/header.php';
?>

<section class="section">
    <div class="container" style="max-width: 720px; text-align: center;">

        <!-- 404 Illustration -->
        <div style="margin-bottom: var(--space-xl);">
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                <!-- 404 Number -->
                <text x="100" y="70" font-family="system-ui, sans-serif" font-size="72" font-weight="700" fill="#E0E0E0" text-anchor="middle">404</text>

                <!-- Search icon overlay -->
                <circle cx="140" cy="50" r="20" stroke="#0066CC" stroke-width="4" fill="none"/>
                <line x1="154" y1="64" x2="168" y2="78" stroke="#0066CC" stroke-width="4" stroke-linecap="round"/>
            </svg>
        </div>

        <h1>Page non trouvée</h1>

        <p class="text-lg text-muted mb-xl">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div class="card" style="text-align: left; margin-bottom: var(--space-xl);">
            <h2 class="h4 mb-base">Que faire maintenant ?</h2>

            <ul style="list-style: none;">
                <li style="margin-bottom: var(--space-base);">
                    <strong>Vérifiez l'URL</strong> — Peut-être une simple faute de frappe ?
                </li>
                <li style="margin-bottom: var(--space-base);">
                    <strong>Retournez à l'accueil</strong> — C'est souvent le meilleur point de départ.
                </li>
                <li style="margin-bottom: var(--space-base);">
                    <strong>Utilisez la navigation</strong> — Tous nos liens sont dans le menu ci-dessus.
                </li>
                <li>
                    <strong>Contactez-nous</strong> — Si vous cherchez quelque chose de spécifique, on peut vous aider.
                </li>
            </ul>
        </div>

        <div class="hero-cta" style="justify-content: center; margin-bottom: var(--space-2xl);">
            <a href="<?php echo site_url(); ?>" class="btn btn-primary btn-lg">
                Retour à l'accueil
            </a>
            <a href="<?php echo site_url('contact/'); ?>" class="btn btn-secondary btn-lg">
                Nous contacter
            </a>
        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2 class="h4 mb-lg">Pages populaires</h2>

        <div class="grid grid-3" style="text-align: left;">
            <div class="card card-service">
                <h3 class="card-title h5">Services & Offres</h3>
                <p class="card-description">Nos 5 packs marketing pour PME suisses.</p>
                <a href="<?php echo site_url('services/'); ?>" class="card-link">
                    Découvrir
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <div class="card card-service">
                <h3 class="card-title h5">Notre Méthode</h3>
                <p class="card-description">Comment on génère des clients mesurables.</p>
                <a href="<?php echo site_url('resultats/'); ?>" class="card-link">
                    En savoir plus
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <div class="card card-service">
                <h3 class="card-title h5">Blog Marketing</h3>
                <p class="card-description">Guides pratiques pour PME.</p>
                <a href="<?php echo site_url('blog/'); ?>" class="card-link">
                    Lire les articles
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>

    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
