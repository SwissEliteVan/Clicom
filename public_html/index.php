<?php
/**
 * Page d'Accueil — Clic COM
 * Marketing qui convertit pour PME Suisses
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/components.php';

// Meta data
$meta = [
    'title' => 'Clic COM — Marketing qui convertit pour PME Suisses',
    'description' => 'Acquisition, landing pages, relances : marketing orienté ventes pour PME suisses. Budget clair, résultats mesurables. Testez notre pack découverte 490 CHF.',
    'canonical' => site_url(),
    'og_type' => 'website',
    'schema' => [
        ['type' => 'local_business'], // Si adresse complétée
        [
            'type' => 'faq',
            'questions' => [ // FAQ pour JSON-LD
                [
                    'question' => 'Combien de temps avant de voir des résultats ?',
                    'answer' => 'Premières demandes : 15-30 jours (selon canal). Performance optimale : 90 jours (temps d\'optimiser campagnes + pages).'
                ],
                [
                    'question' => 'Quel budget publicitaire minimum ?',
                    'answer' => 'Pack Clic & Clients : 300-500 CHF/mois Google Ads. Pack Acquisition Turbo : 1000-2000 CHF/mois (Google + Meta). Le budget pub est géré par vous, on optimise les campagnes.'
                ],
                [
                    'question' => 'Travaillez-vous avec toutes les industries ?',
                    'answer' => 'Priorité PME Suisse (services B2B, commerce local, e-commerce). On refuse les secteurs réglementés complexes (pharma, finance) ou illégaux.'
                ],
                [
                    'question' => 'Dois-je signer un contrat longue durée ?',
                    'answer' => 'Non. Packs one-time = paiement unique. Packs récurrents = sans engagement (préavis 30j).'
                ]
            ]
        ]
    ]
];

// Include meta
include __DIR__ . '/includes/meta.php';
include __DIR__ . '/includes/header.php';
?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <span class="hero-badge">Agence marketing PME Suisse</span>

            <h1 class="hero-title">Gagnez des clients, pas juste des clics.</h1>

            <p class="hero-subtitle">
                Le marketing qui fait vendre : acquisition, pages de conversion, relances.<br>
                Simple, mesurable, adapté aux PME suisses.
            </p>

            <ul class="hero-features">
                <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Plus de demandes qualifiées</strong> — Acquisition ciblée PME Suisse, pas de trafic inutile</span>
                </li>
                <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Budget maîtrisé</strong> — Prix clairs, pas de dépassements surprise, reporting transparent</span>
                </li>
                <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Actions rapides</strong> — Mise en place sous 7 jours, premiers résultats sous 30 jours</span>
                </li>
            </ul>

            <div class="hero-cta">
                <?php echo btn_primary('Testez notre pack découverte', site_url('contact/')); ?>
                <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary" target="_blank" rel="noopener">
                    Planifier un appel gratuit de 30 min
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Section: Problèmes fréquents (4 Objections) -->
<section class="section section-alt">
    <div class="container">
        <div class="text-center mb-2xl">
            <h2>Votre marketing ne convertit pas ? 4 raisons fréquentes</h2>
            <p class="text-lg text-muted">Vous n'êtes pas seul. Voici ce qu'on entend tous les jours de la part des PME suisses.</p>
        </div>

        <div class="grid grid-2">
            <!-- Objection 1 -->
            <div class="card">
                <h3 class="card-title">« J'ai déjà une agence »</h3>
                <p class="card-description">
                    Tant mieux. Une bonne agence est un atout.
                </p>
                <p class="card-description">
                    Mais si vous ne comprenez pas exactement ce qu'elle fait, si les rapports parlent plus de "reach" que de demandes, ou si vous payez sans savoir ce qui fonctionne vraiment… on peut vous aider à reprendre le contrôle.
                </p>
                <p class="card-description">
                    <strong>Notre solution :</strong> Audit gratuit (30 min, Calendly) : on analyse vos campagnes actuelles et on vous dit franchement ce qui fonctionne, ce qui coûte pour rien, et ce que vous pourriez améliorer.
                </p>
                <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">
                    Obtenir un audit gratuit
                </a>
            </div>

            <!-- Objection 2 -->
            <div class="card">
                <h3 class="card-title">« J'ai un petit budget »</h3>
                <p class="card-description">
                    <strong>Justement.</strong> C'est précisément quand le budget est limité qu'il faut être chirurgical.
                </p>
                <p class="card-description">
                    Pas de campagnes "pour tester". Pas de stratégies floues. Juste ce qui convertit, avec un budget défini à l'avance et des résultats mesurables chaque mois.
                </p>
                <p class="card-description">
                    <strong>Notre approche :</strong>
                </p>
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Budget mensuel clair (pas de dépassements surprise)</li>
                    <li>Focus sur 1-2 canaux max (qualité > dispersion)</li>
                    <li>Reporting simplifié : coût par demande, pas 40 métriques inutiles</li>
                </ul>
                <p class="card-description">
                    <strong>Exemple concret :</strong> Pack "Clic & Clients" (490 CHF) : page de vente optimisée + campagne Google Ads ciblée PME Suisse. 30 jours, mesurable.
                </p>
                <a href="<?php echo site_url('services/#clic-clients'); ?>" class="card-link">
                    Voir le pack adapté aux petits budgets
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <!-- Objection 3 -->
            <div class="card">
                <h3 class="card-title">« Je n'ai pas le temps »</h3>
                <p class="card-description">
                    C'est normal. Vous gérez votre entreprise, pas des tableaux de bord publicitaires.
                </p>
                <p class="card-description">
                    <strong>On s'occupe de tout :</strong> création, lancement, suivi, optimisation. Vous recevez un rapport clair une fois par mois (5 minutes de lecture) et les demandes clients arrivent directement dans votre boîte ou CRM.
                </p>
                <p class="card-description">
                    <strong>Ce qu'on ne vous demandera jamais :</strong>
                </p>
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Réunions hebdomadaires interminables</li>
                    <li>Validation de 12 versions d'une pub</li>
                    <li>Apprendre à utiliser Meta Ads Manager</li>
                </ul>
                <p class="card-description">
                    <strong>Ce qu'on vous demande :</strong> 1 appel initial (30 min) pour comprendre votre offre, accès à vos outils (site, CRM si existant), 1 point mensuel (15 min) pour ajuster si besoin.
                </p>
                <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">
                    Planifier l'appel initial
                </a>
            </div>

            <!-- Objection 4 -->
            <div class="card">
                <h3 class="card-title">« Je veux des résultats mesurables »</h3>
                <p class="card-description">
                    <strong>Nous aussi.</strong>
                </p>
                <p class="card-description">
                    Les "likes", les "impressions", le "reach" : ça ne paie pas les factures.
                </p>
                <p class="card-description">
                    <strong>On mesure ce qui compte :</strong>
                </p>
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Nombre de demandes qualifiées reçues</li>
                    <li>Coût par demande</li>
                    <li>Taux de conversion (visiteur → demande)</li>
                    <li>(Si tracking ventes actif) : taux demande → client</li>
                </ul>
                <p class="card-description">
                    <strong>Notre engagement :</strong> Reporting mensuel clair. Si un canal ne performe pas après 60 jours, on l'arrête ou on change de stratégie. Pas de campagnes zombies qui tournent pour rien.
                </p>
                <a href="<?php echo site_url('resultats/'); ?>" class="card-link">
                    Voir notre méthode de reporting
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Section: Nos Solutions -->
<section class="section">
    <div class="container">
        <div class="text-center mb-2xl">
            <h2>Notre approche : marketing orienté ventes</h2>
            <p class="text-lg text-muted">Pas de vanité metrics. Juste ce qui génère des demandes et des clients.</p>
        </div>

        <div class="grid grid-3">
            <div class="card card-service">
                <div class="card-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                    </svg>
                </div>
                <h3 class="card-title">Acquisition ciblée</h3>
                <p class="card-description">Google Ads, Meta, landing pages optimisées pour votre secteur et région. Pas de trafic inutile, que des prospects qualifiés.</p>
                <a href="<?php echo site_url('services/'); ?>" class="card-link">
                    Voir nos packs acquisition
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <div class="card card-service">
                <div class="card-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
                <h3 class="card-title">Pages qui convertissent</h3>
                <p class="card-description">Copywriting orienté vente, design sobre, formulaires simples. Chaque page est conçue pour transformer le visiteur en prospect.</p>
                <a href="<?php echo site_url('services/#clic-clients'); ?>" class="card-link">
                    Pack Landing Page
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>

            <div class="card card-service">
                <div class="card-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 class="card-title">Relances automatisées</h3>
                <p class="card-description">Emails, SMS, CRM : aucun prospect ne passe entre les mailles. Setup CRM simple + tunnels de conversion qui fonctionnent.</p>
                <a href="<?php echo site_url('services/#crm'); ?>" class="card-link">
                    Pack CRM & Relances
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>

        <div class="text-center mt-xl">
            <a href="<?php echo site_url('services/'); ?>" class="btn btn-primary btn-lg">
                Découvrir tous nos packs
            </a>
        </div>
    </div>
</section>

<!-- Section: FAQ -->
<section class="section section-alt">
    <div class="container">
        <div class="text-center mb-2xl">
            <h2>Questions fréquentes</h2>
        </div>

        <div class="faq-list">
            <?php
            $faqs = [
                [
                    'question' => 'Combien de temps avant de voir des résultats ?',
                    'answer' => 'Premières demandes : 15-30 jours (selon canal). Performance optimale : 90 jours (temps d\'optimiser campagnes + pages).'
                ],
                [
                    'question' => 'Quel budget publicitaire minimum ?',
                    'answer' => 'Dépend du pack. Pack Clic & Clients : 300-500 CHF/mois Google Ads. Pack Acquisition Turbo : 1000-2000 CHF/mois (Google + Meta). Le budget pub est géré par vous, on optimise les campagnes.'
                ],
                [
                    'question' => 'Travaillez-vous avec toutes les industries ?',
                    'answer' => 'Priorité PME Suisse (services B2B, commerce local, e-commerce). On refuse les secteurs réglementés complexes (pharma, finance) ou illégaux.'
                ],
                [
                    'question' => 'Dois-je signer un contrat longue durée ?',
                    'answer' => 'Non. Packs one-time = paiement unique. Packs récurrents = sans engagement (préavis 30j).'
                ],
                [
                    'question' => 'Que se passe-t-il si je ne suis pas satisfait ?',
                    'answer' => 'On en discute. Si problème dans les 30 premiers jours, on ajuste ou on arrête (pas de remboursement automatique, mais bonne foi).'
                ],
                [
                    'question' => 'Puis-je combiner plusieurs packs ?',
                    'answer' => 'Oui, c\'est même recommandé. Exemple : Clic & Clients (setup) + Acquisition Turbo (gestion continue).'
                ],
                [
                    'question' => 'Où êtes-vous basés ?',
                    'answer' => CONTACT_ADDRESS_CITY !== 'À compléter' ? CONTACT_ADDRESS_CITY . ', ' . CONTACT_ADDRESS_REGION : 'Suisse romande (adresse exacte à confirmer)'
                ],
                [
                    'question' => 'Puis-je vous rencontrer ?',
                    'answer' => 'Oui, appel visio gratuit 30 min (Calendly). Rendez-vous physique possible si Suisse romande.'
                ]
            ];

            foreach ($faqs as $index => $faq) {
                echo faq_item($faq['question'], $faq['answer'], $index);
            }
            ?>
        </div>
    </div>
</section>

<!-- Section: CTA Final -->
<?php
echo section_cta([
    'title' => 'Prêt à générer plus de clients ?',
    'description' => 'Testez notre pack découverte (490 CHF) ou planifiez un appel gratuit de 30 minutes.',
    'cta_primary_text' => 'Tester le pack découverte',
    'cta_primary_url' => site_url('contact/'),
    'cta_secondary_text' => 'Planifier un appel gratuit',
    'cta_secondary_url' => CALENDLY_URL
]);
?>

<!-- Sticky CTA Mobile -->
<div class="sticky-cta">
    <button class="sticky-cta-close" aria-label="Fermer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </button>
    <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-primary" target="_blank" rel="noopener">
        Planifier un appel gratuit
    </a>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
