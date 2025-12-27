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
