<?php
/**
 * Footer Template — Clic COM
 *
 * Includes:
 * - Footer navigation (4 colonnes)
 * - CTA Calendly
 * - Liens légaux
 * - Copyright
 * - Scripts (Google Analytics, main.js)
 */
?>

</main>
<!-- Main Content End -->

<!-- Footer -->
<footer class="footer" role="contentinfo">
    <div class="container">

        <div class="footer-grid">

            <!-- Colonne 1 : À propos -->
            <div class="footer-col">
                <h3 class="footer-title"><?php echo esc_html(SITE_NAME); ?></h3>
                <p class="footer-tagline"><?php echo esc_html(SITE_TAGLINE); ?></p>

                <?php
                // Réseaux sociaux (si complétés)
                $social_links = array_filter([
                    'LinkedIn' => SOCIAL_LINKEDIN,
                    'Facebook' => SOCIAL_FACEBOOK,
                    'Instagram' => SOCIAL_INSTAGRAM,
                    'Twitter' => SOCIAL_TWITTER
                ]);

                if (!empty($social_links)):
                ?>
                <div class="footer-social">
                    <?php foreach ($social_links as $name => $url): ?>
                        <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr($name); ?>">
                            <?php echo esc_html(substr($name, 0, 2)); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>

            <!-- Colonne 2 : Services -->
            <div class="footer-col">
                <h4 class="footer-heading">Services</h4>
                <ul class="footer-links">
                    <li><a href="<?php echo site_url('services/#clic-clients'); ?>">Clic & Clients</a></li>
                    <li><a href="<?php echo site_url('services/#acquisition-turbo'); ?>">Acquisition Turbo</a></li>
                    <li><a href="<?php echo site_url('services/#crm'); ?>">CRM & Relances</a></li>
                    <li><a href="<?php echo site_url('services/#reseaux'); ?>">Réseaux Sociaux</a></li>
                    <li><a href="<?php echo site_url('services/#cmo'); ?>">CMO Partagé</a></li>
                </ul>
            </div>

            <!-- Colonne 3 : Ressources -->
            <div class="footer-col">
                <h4 class="footer-heading">Ressources</h4>
                <ul class="footer-links">
                    <li><a href="<?php echo site_url('blog/'); ?>">Blog</a></li>
                    <li><a href="<?php echo site_url('resultats/'); ?>">Résultats & Méthode</a></li>
                    <li><a href="<?php echo site_url('a-propos/'); ?>">À propos</a></li>
                    <li><a href="<?php echo site_url('contact/'); ?>">Contact</a></li>
                </ul>
            </div>

            <!-- Colonne 4 : Contact -->
            <div class="footer-col">
                <h4 class="footer-heading">Contact</h4>
                <ul class="footer-contact">
                    <li>
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <a href="mailto:<?php echo esc_attr(CONTACT_EMAIL); ?>"><?php echo esc_html(CONTACT_EMAIL); ?></a>
                    </li>
                    <li>
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <a href="tel:<?php echo esc_attr(str_replace(' ', '', CONTACT_PHONE)); ?>"><?php echo esc_html(CONTACT_PHONE); ?></a>
                    </li>
                    <?php if (CONTACT_ADDRESS_STREET !== 'À compléter'): ?>
                    <li>
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span><?php echo esc_html(CONTACT_ADDRESS_CITY); ?>, <?php echo esc_html(CONTACT_ADDRESS_REGION); ?></span>
                    </li>
                    <?php endif; ?>
                </ul>

                <!-- CTA Calendly -->
                <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-primary btn-sm footer-cta" target="_blank" rel="noopener">
                    Planifier un appel gratuit
                </a>
            </div>

        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="footer-legal">
                <a href="<?php echo site_url('mentions-legales/'); ?>">Mentions légales</a>
                <span class="separator">|</span>
                <a href="<?php echo site_url('confidentialite/'); ?>">Politique de confidentialité</a>
            </div>

            <div class="footer-copyright">
                &copy; <?php echo date('Y'); ?> <?php echo esc_html(LEGAL_COMPANY_NAME); ?>
                <?php if (LEGAL_UID !== 'CHE-XXX.XXX.XXX'): ?>
                    — UID: <?php echo esc_html(LEGAL_UID); ?>
                <?php endif; ?>
            </div>
        </div>

    </div>
</footer>

<!-- Scripts -->

<!-- Google Analytics 4 -->
<?php if (defined('GA4_MEASUREMENT_ID') && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX'): ?>
<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr(GA4_MEASUREMENT_ID); ?>"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '<?php echo esc_js(GA4_MEASUREMENT_ID); ?>', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
});
</script>
<?php endif; ?>

<!-- Main JavaScript -->
<script src="<?php echo asset_url('js/main.js'); ?>" defer></script>

</body>
</html>
