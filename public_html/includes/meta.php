<?php
/**
 * Meta Tags & JSON-LD Generator
 *
 * Usage: Appeler en haut de chaque page avec paramètres spécifiques
 *
 * Paramètres (array $meta) :
 * - title: string (obligatoire)
 * - description: string (obligatoire)
 * - canonical: string (URL canonique, auto si vide)
 * - robots: string (default: 'index, follow')
 * - og_type: string (default: 'website')
 * - og_image: string (URL image OG, default: logo)
 * - schema: array (schemas JSON-LD à inclure)
 */

if (!isset($meta)) {
    $meta = [];
}

// Defaults
$page_title = $meta['title'] ?? SITE_NAME;
$page_description = $meta['description'] ?? SITE_TAGLINE;
$canonical_url = $meta['canonical'] ?? (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
$robots = $meta['robots'] ?? 'index, follow';
$og_type = $meta['og_type'] ?? 'website';
$og_image = $meta['og_image'] ?? asset_url('svg/logo.svg');
$schemas = $meta['schema'] ?? [];

// Breadcrumb automatique (si pas accueil)
$is_home = ($_SERVER['REQUEST_URI'] === '/' || $_SERVER['REQUEST_URI'] === '/index.php');
if (!$is_home && !in_array('breadcrumb', array_column($schemas, 'type'))) {
    $schemas[] = ['type' => 'breadcrumb'];
}
?>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- SEO Meta Tags -->
<title><?php echo esc_html($page_title); ?></title>
<meta name="description" content="<?php echo esc_attr($page_description); ?>">
<meta name="robots" content="<?php echo esc_attr($robots); ?>">
<link rel="canonical" href="<?php echo esc_url($canonical_url); ?>">

<!-- Language -->
<meta name="language" content="<?php echo SITE_LANG; ?>">
<html lang="<?php echo SITE_LANG; ?>">

<!-- OpenGraph (Facebook, LinkedIn) -->
<meta property="og:type" content="<?php echo esc_attr($og_type); ?>">
<meta property="og:title" content="<?php echo esc_attr($page_title); ?>">
<meta property="og:description" content="<?php echo esc_attr($page_description); ?>">
<meta property="og:url" content="<?php echo esc_url($canonical_url); ?>">
<meta property="og:image" content="<?php echo esc_url($og_image); ?>">
<meta property="og:locale" content="fr_CH">
<meta property="og:site_name" content="<?php echo esc_attr(SITE_NAME); ?>">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo esc_attr($page_title); ?>">
<meta name="twitter:description" content="<?php echo esc_attr($page_description); ?>">
<meta name="twitter:image" content="<?php echo esc_url($og_image); ?>">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="<?php echo asset_url('svg/logo.svg'); ?>">

<!-- DNS Prefetch (Performance) -->
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<?php if (defined('CALENDLY_URL') && CALENDLY_URL): ?>
<link rel="dns-prefetch" href="//calendly.com">
<?php endif; ?>

<!-- Preload Critical CSS -->
<link rel="preload" href="<?php echo asset_url('css/styles.css'); ?>" as="style">

<!-- Stylesheet -->
<link rel="stylesheet" href="<?php echo asset_url('css/styles.css'); ?>">

<?php
// ============================================
// JSON-LD SCHEMAS
// ============================================

/**
 * Schema: Organization (sur toutes pages)
 */
function schema_organization() {
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => SITE_NAME,
        'url' => SITE_URL,
        'logo' => asset_url('svg/logo.svg'),
        'description' => SITE_TAGLINE,
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'telephone' => CONTACT_PHONE,
            'contactType' => 'Service Client',
            'email' => CONTACT_EMAIL,
            'availableLanguage' => ['fr']
        ]
    ];

    // Ajouter adresse si complétée
    if (CONTACT_ADDRESS_STREET !== 'À compléter') {
        $schema['address'] = [
            '@type' => 'PostalAddress',
            'streetAddress' => CONTACT_ADDRESS_STREET,
            'addressLocality' => CONTACT_ADDRESS_CITY,
            'postalCode' => CONTACT_ADDRESS_ZIP,
            'addressRegion' => CONTACT_ADDRESS_REGION,
            'addressCountry' => CONTACT_ADDRESS_COUNTRY
        ];
    }

    // Ajouter réseaux sociaux si complétés
    $social = array_filter([
        SOCIAL_LINKEDIN,
        SOCIAL_FACEBOOK,
        SOCIAL_INSTAGRAM,
        SOCIAL_TWITTER
    ]);
    if (!empty($social)) {
        $schema['sameAs'] = $social;
    }

    return $schema;
}

/**
 * Schema: LocalBusiness (Accueil uniquement, si adresse)
 */
function schema_local_business() {
    if (CONTACT_ADDRESS_STREET === 'À compléter') {
        return null;
    }

    return [
        '@context' => 'https://schema.org',
        '@type' => 'MarketingAgency',
        'name' => SITE_NAME,
        'image' => asset_url('svg/logo.svg'),
        'url' => SITE_URL,
        'telephone' => CONTACT_PHONE,
        'email' => CONTACT_EMAIL,
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => CONTACT_ADDRESS_STREET,
            'addressLocality' => CONTACT_ADDRESS_CITY,
            'postalCode' => CONTACT_ADDRESS_ZIP,
            'addressRegion' => CONTACT_ADDRESS_REGION,
            'addressCountry' => CONTACT_ADDRESS_COUNTRY
        ],
        'priceRange' => 'CHF 490 - CHF 5000',
        'areaServed' => [
            '@type' => 'Country',
            'name' => 'Switzerland'
        ]
    ];
}

/**
 * Schema: BreadcrumbList
 */
function schema_breadcrumb($items) {
    $breadcrumb_items = [];
    foreach ($items as $index => $item) {
        $breadcrumb_items[] = [
            '@type' => 'ListItem',
            'position' => $index + 1,
            'name' => $item['name'],
            'item' => $item['url']
        ];
    }

    return [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => $breadcrumb_items
    ];
}

/**
 * Schema: FAQPage
 */
function schema_faq($questions) {
    $faq_items = [];
    foreach ($questions as $q) {
        $faq_items[] = [
            '@type' => 'Question',
            'name' => $q['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $q['answer']
            ]
        ];
    }

    return [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => $faq_items
    ];
}

/**
 * Schema: Article (Blog)
 */
function schema_article($article) {
    return [
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => $article['title'],
        'description' => $article['excerpt'],
        'image' => $article['image'] ?? asset_url('svg/logo.svg'),
        'datePublished' => $article['date'],
        'dateModified' => $article['modified'] ?? $article['date'],
        'author' => [
            '@type' => 'Organization',
            'name' => SITE_NAME
        ],
        'publisher' => [
            '@type' => 'Organization',
            'name' => SITE_NAME,
            'logo' => [
                '@type' => 'ImageObject',
                'url' => asset_url('svg/logo.svg')
            ]
        ]
    ];
}

/**
 * Output schemas
 */
$all_schemas = [];

// Organization (toujours)
$all_schemas[] = schema_organization();

// Schemas spécifiques selon page
if (!empty($schemas)) {
    foreach ($schemas as $schema) {
        switch ($schema['type']) {
            case 'local_business':
                $local = schema_local_business();
                if ($local) $all_schemas[] = $local;
                break;

            case 'breadcrumb':
                if (isset($schema['items'])) {
                    $all_schemas[] = schema_breadcrumb($schema['items']);
                }
                break;

            case 'faq':
                if (isset($schema['questions'])) {
                    $all_schemas[] = schema_faq($schema['questions']);
                }
                break;

            case 'article':
                if (isset($schema['data'])) {
                    $all_schemas[] = schema_article($schema['data']);
                }
                break;
        }
    }
}

// Output JSON-LD
foreach ($all_schemas as $schema):
?>
<script type="application/ld+json">
<?php echo json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>
<?php endforeach; ?>
