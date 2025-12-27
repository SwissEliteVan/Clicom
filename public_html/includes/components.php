<?php
/**
 * Components Helpers — Clic COM
 *
 * Fonctions réutilisables pour générer des composants HTML
 */

/**
 * Bouton primaire
 */
function btn_primary($text, $url, $attrs = []) {
    $class = 'btn btn-primary ' . ($attrs['class'] ?? '');
    $target = isset($attrs['external']) && $attrs['external'] ? 'target="_blank" rel="noopener"' : '';
    $icon = $attrs['icon'] ?? '';

    $html = '<a href="' . esc_url($url) . '" class="' . esc_attr(trim($class)) . '" ' . $target . '>';
    if ($icon) {
        $html .= '<svg class="icon" width="20" height="20" aria-hidden="true">' . $icon . '</svg>';
    }
    $html .= '<span>' . esc_html($text) . '</span>';
    $html .= '</a>';

    return $html;
}

/**
 * Bouton secondaire
 */
function btn_secondary($text, $url, $attrs = []) {
    $class = 'btn btn-secondary ' . ($attrs['class'] ?? '');
    $target = isset($attrs['external']) && $attrs['external'] ? 'target="_blank" rel="noopener"' : '';

    return '<a href="' . esc_url($url) . '" class="' . esc_attr(trim($class)) . '" ' . $target . '>' . esc_html($text) . '</a>';
}

/**
 * Card service
 */
function card_service($data) {
    $icon = $data['icon'] ?? '';
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $link_text = $data['link_text'] ?? 'En savoir plus';
    $link_url = $data['link_url'] ?? '#';

    ob_start();
    ?>
    <div class="card card-service">
        <?php if ($icon): ?>
        <div class="card-icon">
            <?php echo $icon; // SVG déjà échappé ?>
        </div>
        <?php endif; ?>

        <h3 class="card-title"><?php echo esc_html($title); ?></h3>

        <p class="card-description"><?php echo esc_html($description); ?></p>

        <a href="<?php echo esc_url($link_url); ?>" class="card-link">
            <?php echo esc_html($link_text); ?>
            <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </a>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Card pricing
 */
function card_pricing($data) {
    $featured = $data['featured'] ?? false;
    $badge = $data['badge'] ?? '';
    $title = $data['title'] ?? '';
    $tagline = $data['tagline'] ?? '';
    $price = $data['price'] ?? '';
    $price_note = $data['price_note'] ?? '';
    $features = $data['features'] ?? [];
    $cta_text = $data['cta_text'] ?? 'Démarrer';
    $cta_url = $data['cta_url'] ?? '#';

    $class = 'card card-pricing' . ($featured ? ' card-featured' : '');

    ob_start();
    ?>
    <div class="<?php echo esc_attr($class); ?>">
        <?php if ($badge): ?>
        <div class="card-badge"><?php echo esc_html($badge); ?></div>
        <?php endif; ?>

        <div class="card-header">
            <h3 class="card-title"><?php echo esc_html($title); ?></h3>
            <?php if ($tagline): ?>
            <p class="card-tagline"><?php echo esc_html($tagline); ?></p>
            <?php endif; ?>
        </div>

        <div class="card-price">
            <span class="price"><?php echo esc_html($price); ?></span>
            <?php if ($price_note): ?>
            <span class="price-note"><?php echo esc_html($price_note); ?></span>
            <?php endif; ?>
        </div>

        <?php if (!empty($features)): ?>
        <ul class="card-features">
            <?php foreach ($features as $feature): ?>
            <li>
                <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span><?php echo esc_html($feature); ?></span>
            </li>
            <?php endforeach; ?>
        </ul>
        <?php endif; ?>

        <div class="card-footer">
            <a href="<?php echo esc_url($cta_url); ?>" class="btn btn-primary btn-block">
                <?php echo esc_html($cta_text); ?>
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * FAQ Item (Accordion)
 */
function faq_item($question, $answer, $id) {
    ob_start();
    ?>
    <div class="faq-item">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-<?php echo esc_attr($id); ?>">
            <span><?php echo esc_html($question); ?></span>
            <svg class="icon icon-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
        <div class="faq-answer" id="faq-answer-<?php echo esc_attr($id); ?>" role="region" aria-hidden="true">
            <div class="faq-answer-content">
                <?php echo wp_kses_post($answer); // Permet HTML basique (p, strong, a) ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * wp_kses_post equivalent (sécurité)
 */
function wp_kses_post($string) {
    $allowed_tags = [
        'p' => [],
        'strong' => [],
        'em' => [],
        'a' => ['href' => [], 'target' => [], 'rel' => []],
        'ul' => [],
        'ol' => [],
        'li' => [],
        'br' => []
    ];
    return strip_tags($string, '<p><strong><em><a><ul><ol><li><br>');
}

/**
 * Testimonial Card
 */
function testimonial_card($data) {
    $quote = $data['quote'] ?? '';
    $name = $data['name'] ?? '';
    $title = $data['title'] ?? '';
    $company = $data['company'] ?? '';
    $is_example = $data['is_example'] ?? false;

    ob_start();
    ?>
    <div class="card card-testimonial">
        <blockquote class="testimonial-quote">
            <?php echo esc_html($quote); ?>
        </blockquote>

        <div class="testimonial-author">
            <div class="testimonial-avatar" aria-hidden="true">
                <?php echo esc_html(strtoupper(substr($name, 0, 1))); ?>
            </div>
            <div class="testimonial-info">
                <div class="testimonial-name"><?php echo esc_html($name); ?></div>
                <div class="testimonial-title">
                    <?php echo esc_html($title); ?>
                    <?php if ($company): ?>
                        chez <?php echo esc_html($company); ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <?php if ($is_example): ?>
        <div class="card-disclaimer">
            <small>Exemple (à remplacer par témoignage réel)</small>
        </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Section CTA
 */
function section_cta($data) {
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $cta_primary_text = $data['cta_primary_text'] ?? '';
    $cta_primary_url = $data['cta_primary_url'] ?? '';
    $cta_secondary_text = $data['cta_secondary_text'] ?? '';
    $cta_secondary_url = $data['cta_secondary_url'] ?? '';

    ob_start();
    ?>
    <section class="section section-cta">
        <div class="container">
            <div class="cta-content">
                <h2 class="cta-title"><?php echo esc_html($title); ?></h2>
                <?php if ($description): ?>
                <p class="cta-description"><?php echo esc_html($description); ?></p>
                <?php endif; ?>

                <div class="cta-buttons">
                    <?php if ($cta_primary_text): ?>
                    <a href="<?php echo esc_url($cta_primary_url); ?>" class="btn btn-primary btn-lg">
                        <?php echo esc_html($cta_primary_text); ?>
                    </a>
                    <?php endif; ?>

                    <?php if ($cta_secondary_text): ?>
                    <a href="<?php echo esc_url($cta_secondary_url); ?>" class="btn btn-secondary btn-lg" target="_blank" rel="noopener">
                        <?php echo esc_html($cta_secondary_text); ?>
                    </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Breadcrumb
 */
function breadcrumb($items) {
    if (empty($items)) return '';

    ob_start();
    ?>
    <nav class="breadcrumb" aria-label="Fil d'ariane">
        <ol class="breadcrumb-list">
            <?php foreach ($items as $index => $item): ?>
            <li class="breadcrumb-item<?php echo ($index === count($items) - 1) ? ' active' : ''; ?>">
                <?php if (isset($item['url']) && $index !== count($items) - 1): ?>
                <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['name']); ?></a>
                <?php else: ?>
                <span><?php echo esc_html($item['name']); ?></span>
                <?php endif; ?>
            </li>
            <?php endforeach; ?>
        </ol>
    </nav>
    <?php
    return ob_get_clean();
}

/**
 * SVG Icon Loader
 */
function svg_icon($name, $size = 24) {
    $icons_path = __DIR__ . '/../assets/svg/icons/';
    $file = $icons_path . $name . '.svg';

    if (file_exists($file)) {
        $svg = file_get_contents($file);
        // Remplacer width/height par taille spécifiée
        $svg = preg_replace('/width="[^"]*"/', 'width="' . $size . '"', $svg);
        $svg = preg_replace('/height="[^"]*"/', 'height="' . $size . '"', $svg);
        return $svg;
    }

    return '';
}

/* ============================================
 * CONVERSION OPTIMIZATION COMPONENTS
 * ============================================ */

/**
 * Lead Magnet Section
 *
 * @param array $data Configuration du lead magnet
 * @return string HTML
 */
function lead_magnet($data) {
    $title = $data['title'] ?? 'Téléchargez notre guide gratuit';
    $description = $data['description'] ?? '';
    $download_url = $data['download_url'] ?? '#';
    $download_text = $data['download_text'] ?? 'Télécharger gratuitement';
    $features = $data['features'] ?? [];
    $icon = $data['icon'] ?? 'download';

    ob_start();
    ?>
    <div class="card lead-magnet" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 120, 0.05) 100%); border: 2px solid var(--color-accent-primary); padding: var(--space-xl);">
        <div style="display: flex; gap: var(--space-lg); align-items: start; flex-wrap: wrap;">

            <!-- Icon -->
            <div style="flex-shrink: 0;">
                <div style="width: 64px; height: 64px; background: var(--color-accent-primary); border-radius: var(--radius-base); display: flex; align-items: center; justify-content: center;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <?php if ($icon === 'download'): ?>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                        <?php elseif ($icon === 'checklist'): ?>
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        <?php endif; ?>
                    </svg>
                </div>
            </div>

            <!-- Content -->
            <div style="flex: 1; min-width: 250px;">
                <h3 class="h4" style="margin-bottom: var(--space-sm);"><?php echo esc_html($title); ?></h3>
                <?php if ($description): ?>
                <p class="text-muted" style="margin-bottom: var(--space-base); font-size: var(--font-size-base);">
                    <?php echo esc_html($description); ?>
                </p>
                <?php endif; ?>

                <?php if (!empty($features)): ?>
                <ul style="list-style: none; margin: var(--space-base) 0; padding: 0;">
                    <?php foreach ($features as $feature): ?>
                    <li style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-xs);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span style="font-size: var(--font-size-sm);"><?php echo esc_html($feature); ?></span>
                    </li>
                    <?php endforeach; ?>
                </ul>
                <?php endif; ?>

                <a href="<?php echo esc_url($download_url); ?>" class="btn btn-primary" style="margin-top: var(--space-base);">
                    <?php echo esc_html($download_text); ?>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: var(--space-xs);">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </a>
            </div>

        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Social Proof Bar
 *
 * @param array $stats Statistiques à afficher
 * @return string HTML
 */
function social_proof_bar($stats = []) {
    if (empty($stats)) {
        // Stats par défaut (à personnaliser)
        $stats = [
            ['number' => '30+', 'label' => 'PME accompagnées'],
            ['number' => '4.9/5', 'label' => 'Note moyenne'],
            ['number' => '15+', 'label' => 'Demandes/mois générées']
        ];
    }

    ob_start();
    ?>
    <div class="social-proof-bar" style="background: var(--color-surface); border-top: var(--border); border-bottom: var(--border); padding: var(--space-xl) 0;">
        <div class="container">
            <div class="grid grid-3" style="text-align: center; gap: var(--space-2xl);">
                <?php foreach ($stats as $stat): ?>
                <div class="stat-item">
                    <div class="stat-number" style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-accent-primary); margin-bottom: var(--space-xs);">
                        <?php echo esc_html($stat['number']); ?>
                    </div>
                    <div class="stat-label" style="font-size: var(--font-size-base); color: var(--color-text-muted);">
                        <?php echo esc_html($stat['label']); ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Trust Badges Section
 *
 * @param array $badges Liste des badges à afficher
 * @return string HTML
 */
function trust_badges($badges = []) {
    if (empty($badges)) {
        // Badges par défaut
        $badges = [
            ['icon' => 'shield', 'text' => '100% Confidentiel'],
            ['icon' => 'check', 'text' => 'Sans engagement'],
            ['icon' => 'lock', 'text' => 'Données sécurisées'],
            ['icon' => 'clock', 'text' => 'Réponse sous 24h']
        ];
    }

    ob_start();
    ?>
    <div class="trust-badges" style="display: flex; flex-wrap: wrap; gap: var(--space-lg); justify-content: center; align-items: center; margin: var(--space-xl) 0;">
        <?php foreach ($badges as $badge): ?>
        <div class="trust-badge" style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm) var(--space-base); background: rgba(0, 168, 120, 0.05); border-radius: var(--radius-base);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2">
                <?php if ($badge['icon'] === 'shield'): ?>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <?php elseif ($badge['icon'] === 'check'): ?>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                <?php elseif ($badge['icon'] === 'lock'): ?>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <?php elseif ($badge['icon'] === 'clock'): ?>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
                <?php endif; ?>
            </svg>
            <span style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">
                <?php echo esc_html($badge['text']); ?>
            </span>
        </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Urgency Banner
 *
 * @param array $data Configuration de l'urgence
 * @return string HTML
 */
function urgency_banner($data) {
    $message = $data['message'] ?? 'Places limitées : Seulement 3 nouveaux clients acceptés ce mois-ci';
    $cta_text = $data['cta_text'] ?? 'Réserver ma place';
    $cta_url = $data['cta_url'] ?? site_url('contact/');
    $style = $data['style'] ?? 'warning'; // warning, info, success

    $bg_color = match($style) {
        'warning' => 'rgba(245, 124, 0, 0.1)',
        'info' => 'rgba(0, 102, 204, 0.1)',
        'success' => 'rgba(0, 168, 120, 0.1)',
        default => 'rgba(245, 124, 0, 0.1)'
    };

    $border_color = match($style) {
        'warning' => '#F57C00',
        'info' => '#0066CC',
        'success' => '#00A878',
        default => '#F57C00'
    };

    ob_start();
    ?>
    <div class="urgency-banner" style="background: <?php echo $bg_color; ?>; border-left: 4px solid <?php echo $border_color; ?>; padding: var(--space-lg); border-radius: var(--radius-sm); margin: var(--space-xl) 0;">
        <div style="display: flex; gap: var(--space-base); align-items: center; justify-content: space-between; flex-wrap: wrap;">

            <!-- Icon + Message -->
            <div style="display: flex; gap: var(--space-base); align-items: center; flex: 1; min-width: 250px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="<?php echo $border_color; ?>" stroke-width="2" style="flex-shrink: 0;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span style="font-weight: var(--font-weight-semibold); font-size: var(--font-size-base);">
                    <?php echo esc_html($message); ?>
                </span>
            </div>

            <!-- CTA -->
            <a href="<?php echo esc_url($cta_url); ?>" class="btn btn-primary" style="flex-shrink: 0;">
                <?php echo esc_html($cta_text); ?>
            </a>

        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Testimonials Slider/Grid
 *
 * @param array $testimonials Liste de témoignages
 * @param string $layout 'grid' ou 'slider'
 * @return string HTML
 */
function testimonials_section($testimonials, $layout = 'grid') {
    if (empty($testimonials)) return '';

    ob_start();
    ?>
    <div class="testimonials-section">
        <div class="<?php echo $layout === 'grid' ? 'grid grid-2' : 'testimonials-slider'; ?>" style="gap: var(--space-xl);">
            <?php foreach ($testimonials as $testimonial): ?>
                <?php echo testimonial_card($testimonial); ?>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Scarcity Counter (Spots Remaining)
 *
 * @param int $spots_remaining Nombre de places restantes
 * @return string HTML
 */
function scarcity_counter($spots_remaining = 3) {
    ob_start();
    ?>
    <div class="scarcity-counter" style="display: inline-flex; align-items: center; gap: var(--space-sm); background: rgba(211, 47, 47, 0.1); color: var(--color-error); padding: var(--space-sm) var(--space-base); border-radius: var(--radius-full); font-weight: var(--font-weight-semibold); font-size: var(--font-size-sm);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <span>Plus que <strong><?php echo (int)$spots_remaining; ?> places</strong> disponibles ce mois-ci</span>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Value Stack (Liste de bénéfices avec prix)
 *
 * @param array $items Liste d'items avec valeur
 * @param string $total_value Valeur totale
 * @param string $your_price Votre prix
 * @return string HTML
 */
function value_stack($items, $total_value = '', $your_price = '') {
    ob_start();
    ?>
    <div class="value-stack card" style="background: var(--color-surface); padding: var(--space-xl); border: 2px solid var(--color-accent-secondary);">
        <h3 class="h4" style="margin-bottom: var(--space-lg); text-align: center;">Ce que vous obtenez :</h3>

        <ul style="list-style: none; padding: 0; margin: 0 0 var(--space-xl) 0;">
            <?php foreach ($items as $item): ?>
            <li style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-base) 0; border-bottom: 1px solid var(--color-border);">
                <span style="display: flex; align-items: center; gap: var(--space-sm);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <strong><?php echo esc_html($item['name']); ?></strong>
                </span>
                <?php if (isset($item['value'])): ?>
                <span class="text-muted"><?php echo esc_html($item['value']); ?></span>
                <?php endif; ?>
            </li>
            <?php endforeach; ?>
        </ul>

        <?php if ($total_value || $your_price): ?>
        <div style="border-top: 2px solid var(--color-border); padding-top: var(--space-lg);">
            <?php if ($total_value): ?>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
                <span class="text-muted">Valeur totale :</span>
                <span class="text-muted" style="text-decoration: line-through; font-size: var(--font-size-lg);">
                    <?php echo esc_html($total_value); ?>
                </span>
            </div>
            <?php endif; ?>

            <?php if ($your_price): ?>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">Votre prix :</span>
                <span style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-accent-primary);">
                    <?php echo esc_html($your_price); ?>
                </span>
            </div>
            <?php endif; ?>
        </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
