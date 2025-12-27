<?php
/**
 * Blog — Clic COM
 * Liste des articles marketing pour PME suisses
 */

define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

// Load posts from JSON
$postsFile = __DIR__ . '/posts.json';
$posts = [];
if (file_exists($postsFile)) {
    $postsJson = file_get_contents($postsFile);
    $posts = json_decode($postsJson, true);
    // Sort by date DESC (most recent first)
    usort($posts, function($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });
}

$meta = [
    'title' => 'Blog Marketing PME — Guides pratiques pour entrepreneurs suisses',
    'description' => 'Guides pratiques, stratégies concrètes et astuces marketing pour PME suisses. Google Ads, SEO local, conversion, acquisition clients.',
    'canonical' => site_url('blog/'),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Blog', 'url' => site_url('blog/')]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Blog']
]);
?>

<section class="section hero" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 120, 0.05) 100%);">
    <div class="container" style="max-width: 800px; text-align: center;">
        <h1>Blog Marketing pour PME</h1>
        <p class="text-lg text-muted" style="margin-top: var(--space-lg);">
            Guides pratiques, stratégies concrètes et astuces pour générer des clients. Sans jargon.
        </p>
    </div>
</section>

<section class="section">
    <div class="container" style="max-width: 1000px;">

        <?php if (empty($posts)): ?>
            <div class="card" style="text-align: center; padding: var(--space-3xl);">
                <p class="text-muted">Aucun article publié pour le moment. Revenez bientôt !</p>
            </div>
        <?php else: ?>

            <div class="grid" style="grid-template-columns: 1fr; gap: var(--space-2xl);">

                <?php foreach ($posts as $post): ?>
                    <article class="card card-post" style="display: flex; flex-direction: column; gap: var(--space-lg); padding: var(--space-xl); transition: transform 0.2s, box-shadow 0.2s;">

                        <!-- Meta info -->
                        <div style="display: flex; align-items: center; gap: var(--space-base); flex-wrap: wrap; font-size: var(--font-size-sm); color: var(--color-text-muted);">
                            <span class="badge" style="background: var(--color-accent-primary); color: #fff; padding: 4px 12px; border-radius: var(--radius-sm); font-weight: 600;">
                                <?php echo esc_html($post['category']); ?>
                            </span>
                            <span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <?php
                                    $date = new DateTime($post['date']);
                                    echo $date->format('d.m.Y');
                                ?>
                            </span>
                            <span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <?php echo esc_html($post['readTime']); ?> min de lecture
                            </span>
                        </div>

                        <!-- Title -->
                        <h2 class="h3" style="margin: 0;">
                            <a href="<?php echo site_url('blog/post.php?slug=' . urlencode($post['slug'])); ?>" style="color: inherit; text-decoration: none;">
                                <?php echo esc_html($post['title']); ?>
                            </a>
                        </h2>

                        <!-- Excerpt -->
                        <p class="text-muted" style="margin: 0; line-height: var(--line-height-relaxed);">
                            <?php echo esc_html($post['excerpt']); ?>
                        </p>

                        <!-- CTA -->
                        <div>
                            <a href="<?php echo site_url('blog/post.php?slug=' . urlencode($post['slug'])); ?>" class="btn btn-secondary">
                                Lire l'article
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: var(--space-xs); vertical-align: text-bottom;">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>

                    </article>
                <?php endforeach; ?>

            </div>

        <?php endif; ?>

        <hr style="border: none; border-top: var(--border); margin: var(--space-3xl) 0;">

        <div style="text-align: center;">
            <h2 class="h4" style="margin-bottom: var(--space-base);">Vous cherchez un accompagnement personnalisé ?</h2>
            <p class="text-muted" style="margin-bottom: var(--space-lg);">
                Nos guides sont utiles, mais parfois vous avez besoin d'aide concrète sur votre projet.
            </p>
            <div class="hero-cta" style="justify-content: center;">
                <a href="<?php echo site_url('contact/'); ?>" class="btn btn-primary">
                    Demander un diagnostic gratuit
                </a>
                <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary" target="_blank" rel="noopener">
                    Planifier un appel 30 min
                </a>
            </div>
        </div>

    </div>
</section>

<style>
.card-post:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
    .card-post {
        padding: var(--space-lg);
    }
}
</style>

<?php include __DIR__ . '/../includes/footer.php'; ?>
