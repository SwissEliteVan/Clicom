<?php
/**
 * Article Single — Clic COM
 * Template pour afficher un article de blog
 */

define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

// Get slug from URL
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';

// Load posts from JSON
$postsFile = __DIR__ . '/posts.json';
$post = null;
$allPosts = [];

if (file_exists($postsFile) && !empty($slug)) {
    $postsJson = file_get_contents($postsFile);
    $allPosts = json_decode($postsJson, true);

    // Find post by slug
    foreach ($allPosts as $p) {
        if ($p['slug'] === $slug) {
            $post = $p;
            break;
        }
    }
}

// 404 if post not found
if (!$post) {
    header('HTTP/1.1 404 Not Found');
    include __DIR__ . '/../404.php';
    exit;
}

// Meta data
$meta = [
    'title' => esc_html($post['title']) . ' — Blog Clic COM',
    'description' => esc_html($post['excerpt']),
    'canonical' => site_url('blog/post.php?slug=' . urlencode($post['slug'])),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Blog', 'url' => site_url('blog/')],
                ['name' => $post['title'], 'url' => site_url('blog/post.php?slug=' . urlencode($post['slug']))]
            ]
        ],
        [
            'type' => 'article',
            'headline' => $post['title'],
            'description' => $post['excerpt'],
            'datePublished' => $post['date'],
            'author' => $post['author']
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Blog', 'url' => site_url('blog/')],
    ['name' => $post['title']]
]);
?>

<article class="section">
    <div class="container" style="max-width: 800px;">

        <!-- Article Header -->
        <header style="margin-bottom: var(--space-2xl); text-align: center;">

            <!-- Category badge -->
            <div style="margin-bottom: var(--space-base);">
                <span class="badge" style="background: var(--color-accent-primary); color: #fff; padding: 6px 16px; border-radius: var(--radius-sm); font-weight: 600; font-size: var(--font-size-sm);">
                    <?php echo esc_html($post['category']); ?>
                </span>
            </div>

            <!-- Title -->
            <h1 style="margin-bottom: var(--space-lg);">
                <?php echo esc_html($post['title']); ?>
            </h1>

            <!-- Meta info -->
            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-lg); flex-wrap: wrap; font-size: var(--font-size-sm); color: var(--color-text-muted);">
                <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <?php echo esc_html($post['author']); ?>
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

        </header>

        <!-- Article Content -->
        <div class="article-content" style="line-height: var(--line-height-relaxed); font-size: var(--font-size-base);">
            <?php echo $post['content']; ?>
        </div>

        <!-- Article Footer -->
        <footer style="margin-top: var(--space-3xl); padding-top: var(--space-2xl); border-top: var(--border);">

            <div class="card" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 120, 0.05) 100%); padding: var(--space-xl); text-align: center;">
                <h2 class="h4" style="margin-bottom: var(--space-base);">Cet article vous a été utile ?</h2>
                <p class="text-muted" style="margin-bottom: var(--space-lg);">
                    Si vous avez besoin d'aide concrète sur votre projet marketing, on propose un diagnostic gratuit de 30 minutes.
                </p>
                <div class="hero-cta" style="justify-content: center;">
                    <a href="<?php echo site_url('contact/'); ?>" class="btn btn-primary">
                        Demander un diagnostic
                    </a>
                    <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary" target="_blank" rel="noopener">
                        Planifier un appel
                    </a>
                </div>
            </div>

            <!-- Back to blog -->
            <div style="text-align: center; margin-top: var(--space-xl);">
                <a href="<?php echo site_url('blog/'); ?>" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: var(--space-xs); vertical-align: text-bottom;">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Retour au blog
                </a>
            </div>

        </footer>

    </div>
</article>

<!-- Related articles (optional) -->
<?php
// Get 2 random other articles
$relatedPosts = array_filter($allPosts, function($p) use ($post) {
    return $p['slug'] !== $post['slug'];
});
shuffle($relatedPosts);
$relatedPosts = array_slice($relatedPosts, 0, 2);

if (!empty($relatedPosts)):
?>
<section class="section" style="background: var(--color-bg-secondary);">
    <div class="container" style="max-width: 1000px;">

        <h2 class="h4" style="text-align: center; margin-bottom: var(--space-xl);">Articles recommandés</h2>

        <div class="grid grid-2" style="gap: var(--space-xl);">
            <?php foreach ($relatedPosts as $related): ?>
                <div class="card card-service">
                    <div style="margin-bottom: var(--space-sm);">
                        <span class="badge" style="background: var(--color-accent-secondary); color: #fff; padding: 4px 10px; border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: 600;">
                            <?php echo esc_html($related['category']); ?>
                        </span>
                    </div>
                    <h3 class="card-title h5"><?php echo esc_html($related['title']); ?></h3>
                    <p class="card-description"><?php echo esc_html($related['excerpt']); ?></p>
                    <a href="<?php echo site_url('blog/post.php?slug=' . urlencode($related['slug'])); ?>" class="card-link">
                        Lire l'article
                        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>
<?php endif; ?>

<style>
/* Article content styling */
.article-content h2 {
    margin-top: var(--space-2xl);
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-text);
}

.article-content h3 {
    margin-top: var(--space-xl);
    margin-bottom: var(--space-base);
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-text);
}

.article-content p {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
}

.article-content ul,
.article-content ol {
    margin: var(--space-lg) 0 var(--space-lg) var(--space-xl);
    line-height: var(--line-height-relaxed);
}

.article-content li {
    margin-bottom: var(--space-sm);
}

.article-content strong {
    font-weight: 600;
    color: var(--color-text);
}

.article-content a {
    color: var(--color-accent-primary);
    text-decoration: underline;
}

.article-content a:hover {
    color: var(--color-accent-primary-hover);
}

.article-content blockquote {
    margin: var(--space-xl) 0;
    padding: var(--space-lg);
    background: rgba(0, 102, 204, 0.05);
    border-left: 4px solid var(--color-accent-primary);
    border-radius: var(--radius-sm);
    font-style: italic;
    color: var(--color-text-muted);
}

.article-content pre {
    margin: var(--space-lg) 0;
    padding: var(--space-base);
    background: var(--color-bg-secondary);
    border: var(--border);
    border-radius: var(--radius-sm);
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
}

.article-content table {
    width: 100%;
    margin: var(--space-xl) 0;
    border-collapse: collapse;
    font-size: var(--font-size-sm);
}

.article-content table thead {
    background: var(--color-bg-secondary);
}

.article-content table th,
.article-content table td {
    padding: var(--space-sm) var(--space-base);
    border: var(--border);
    text-align: left;
}

.article-content table th {
    font-weight: 600;
    color: var(--color-text);
}

.article-content table td {
    color: var(--color-text-muted);
}

@media (max-width: 768px) {
    .article-content h2 {
        font-size: var(--font-size-xl);
    }

    .article-content h3 {
        font-size: var(--font-size-lg);
    }

    .article-content table {
        font-size: var(--font-size-xs);
    }

    .article-content table th,
    .article-content table td {
        padding: var(--space-xs);
    }
}
</style>

<?php include __DIR__ . '/../includes/footer.php'; ?>
