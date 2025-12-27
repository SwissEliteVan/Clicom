<?php
/**
 * Page Merci — Clic COM
 * Affichée après soumission formulaire contact
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

// Meta data
$meta = [
    'title' => 'Merci — Votre message a été envoyé',
    'description' => 'Votre demande a bien été reçue. Nous vous répondons sous 24h.',
    'canonical' => site_url('merci/'),
    'robots' => 'noindex, follow'
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="section">
    <div class="container" style="max-width: 720px; text-align: center;">

        <!-- Icon Success -->
        <div style="margin-bottom: var(--space-xl);">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-success); margin: 0 auto;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>

        <h1>Merci pour votre message !</h1>

        <p class="text-lg text-muted mb-xl">
            Votre demande a bien été reçue. Nous vous répondons sous 24h (jours ouvrés).
        </p>

        <div class="card" style="text-align: left; margin-bottom: var(--space-xl);">
            <h2 class="h4 mb-base">Et maintenant ?</h2>

            <ul style="list-style: none;">
                <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px; color: var(--color-accent-primary);">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                        <strong>Vérifiez votre boîte email</strong> — Vous devriez avoir reçu une confirmation automatique.
                    </span>
                </li>

                <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px; color: var(--color-accent-primary);">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                        <strong>On vous répond rapidement</strong> — Généralement sous 4-6h en journée, maximum 24h (jours ouvrés).
                    </span>
                </li>

                <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px; color: var(--color-accent-primary);">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                        <strong>Envie d'aller plus vite ?</strong> Planifiez directement un appel gratuit de 30 min.
                    </span>
                </li>
            </ul>

            <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary btn-block" target="_blank" rel="noopener">
                Planifier un appel maintenant
            </a>
        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2 class="h4 mb-lg">En attendant, découvrez…</h2>

        <div class="grid grid-3" style="text-align: left;">
            <div class="card card-service">
                <h3 class="card-title h5">Nos Services</h3>
                <p class="card-description">Découvrez nos 5 packs marketing adaptés aux PME suisses.</p>
                <a href="<?php echo site_url('services/'); ?>" class="card-link">
                    Voir les offres
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <div class="card card-service">
                <h3 class="card-title h5">Notre Méthode</h3>
                <p class="card-description">Comment on génère des clients (pas juste des clics).</p>
                <a href="<?php echo site_url('resultats/'); ?>" class="card-link">
                    Découvrir
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <div class="card card-service">
                <h3 class="card-title h5">Blog</h3>
                <p class="card-description">Guides pratiques marketing pour PME suisses.</p>
                <a href="<?php echo site_url('blog/'); ?>" class="card-link">
                    Lire les articles
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>

        <div class="mt-2xl">
            <a href="<?php echo site_url(); ?>" class="btn btn-primary">
                Retour à l'accueil
            </a>
        </div>

    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
