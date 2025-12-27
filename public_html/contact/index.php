<?php
/**
 * Page Contact — Clic COM
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

// Meta data
$meta = [
    'title' => 'Contact — Clic COM | Devis gratuit sous 24h',
    'description' => 'Demandez un devis ou planifiez un appel gratuit de 30 min. Réponse sous 24h (jours ouvrés). Suisse romande.',
    'canonical' => site_url('contact/'),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Contact', 'url' => site_url('contact/')]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

// Breadcrumb
echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Contact']
]);
?>

<section class="section">
    <div class="container">
        <div class="text-center mb-2xl">
            <h1>Contactez-nous</h1>
            <p class="text-lg text-muted">
                Une question ? Un projet ? On vous répond sous 24h (jours ouvrés).
            </p>
        </div>

        <div class="grid grid-2" style="max-width: 1000px; margin: 0 auto;">

            <!-- Formulaire -->
            <div>
                <h2 class="h4 mb-lg">Envoyez-nous un message</h2>

                <form id="contact-form" action="<?php echo site_url('api/contact.php'); ?>" method="POST">

                    <!-- Honeypot (hidden) -->
                    <input type="text" name="website" class="form-field-hp" tabindex="-1" autocomplete="off">

                    <!-- Timestamp (hidden, anti-bot) -->
                    <input type="hidden" name="form_timestamp" value="">

                    <div class="form-group">
                        <label for="name" class="form-label">Nom complet <span style="color: var(--color-error);">*</span></label>
                        <input type="text" id="name" name="name" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label for="email" class="form-label">Email <span style="color: var(--color-error);">*</span></label>
                        <input type="email" id="email" name="email" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label for="phone" class="form-label">Téléphone (optionnel)</label>
                        <input type="tel" id="phone" name="phone" class="form-input" placeholder="+41 21 XXX XX XX">
                        <span class="form-help">Format Suisse conseillé : +41 21 123 45 67</span>
                    </div>

                    <div class="form-group">
                        <label for="message" class="form-label">Votre message <span style="color: var(--color-error);">*</span></label>
                        <textarea id="message" name="message" class="form-textarea" required placeholder="Décrivez votre projet ou votre question..."></textarea>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">
                            Envoyer le message
                        </button>
                    </div>

                    <p class="text-sm text-muted">
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: text-bottom;">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Vos données sont protégées. Consultez notre <a href="<?php echo site_url('confidentialite/'); ?>">politique de confidentialité</a>.
                    </p>
                </form>
            </div>

            <!-- Calendly + Infos -->
            <div>
                <h2 class="h4 mb-lg">Ou planifiez directement un appel</h2>

                <p class="mb-base">
                    Discutons de votre projet lors d'un appel gratuit de 30 minutes.
                </p>

                <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary btn-block mb-xl" target="_blank" rel="noopener">
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Réserver mon créneau</span>
                </a>

                <?php if (defined('CALENDLY_EMBED') && CALENDLY_EMBED): ?>
                <!-- Calendly Embed (optionnel) -->
                <div style="margin-bottom: var(--space-xl);">
                    <iframe
                        src="<?php echo esc_url(CALENDLY_URL); ?>?embed_domain=<?php echo esc_attr($_SERVER['HTTP_HOST']); ?>&embed_type=Inline"
                        width="100%"
                        height="700"
                        frameborder="0"
                        loading="lazy"
                        title="Planifier un appel avec Clic COM"
                        style="border-radius: var(--radius-base); border: var(--border);"
                    ></iframe>
                    <p class="text-sm text-muted mt-sm">
                        Si l'agenda ne s'affiche pas, <a href="<?php echo esc_url(CALENDLY_URL); ?>" target="_blank" rel="noopener">cliquez ici pour ouvrir Calendly</a>.
                    </p>
                </div>
                <?php endif; ?>

                <hr style="border: none; border-top: var(--border); margin: var(--space-xl) 0;">

                <h3 class="h5 mb-base">Nos coordonnées</h3>

                <ul style="list-style: none;">
                    <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <a href="mailto:<?php echo esc_attr(CONTACT_EMAIL); ?>"><?php echo esc_html(CONTACT_EMAIL); ?></a>
                    </li>

                    <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <a href="tel:<?php echo esc_attr(str_replace(' ', '', CONTACT_PHONE)); ?>"><?php echo esc_html(CONTACT_PHONE); ?></a>
                    </li>

                    <?php if (CONTACT_ADDRESS_STREET !== 'À compléter'): ?>
                    <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>
                            <?php echo esc_html(CONTACT_ADDRESS_STREET); ?><br>
                            <?php echo esc_html(CONTACT_ADDRESS_ZIP . ' ' . CONTACT_ADDRESS_CITY); ?><br>
                            <?php echo esc_html(CONTACT_ADDRESS_REGION . ', Suisse'); ?>
                        </span>
                    </li>
                    <?php else: ?>
                    <li style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-base);">
                        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Suisse romande</span>
                    </li>
                    <?php endif; ?>
                </ul>

                <hr style="border: none; border-top: var(--border); margin: var(--space-xl) 0;">

                <h3 class="h5 mb-base">Horaires de réponse</h3>
                <p class="text-muted">Lundi — Vendredi, 9h — 17h</p>
                <p class="text-muted text-sm">Emails et messages reçus en dehors de ces horaires seront traités le jour ouvré suivant.</p>
            </div>

        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
