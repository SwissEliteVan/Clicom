<?php
/**
 * Page Services & Offres — Clic COM
 * 5 packs marketing pour PME Suisses
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

// Meta data
$meta = [
    'title' => 'Packs Marketing PME — Clic COM Suisse',
    'description' => '5 packs marketing adaptés aux PME suisses : landing pages (490 CHF), acquisition continue (990 CHF/mois), CRM, réseaux sociaux, CMO partagé. Prix clairs, sans engagement.',
    'canonical' => site_url('services/'),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Services & Offres', 'url' => site_url('services/')]
            ]
        ],
        [
            'type' => 'faq',
            'questions' => [
                [
                    'question' => 'Quel pack choisir pour débuter ?',
                    'answer' => 'Le pack "Clic & Clients" (490 CHF) est idéal pour démarrer : page de vente optimisée + première campagne Google Ads. Résultats mesurables en 30 jours.'
                ],
                [
                    'question' => 'Puis-je annuler un pack récurrent ?',
                    'answer' => 'Oui, les packs mensuels sont sans engagement. Préavis de 30 jours suffit.'
                ],
                [
                    'question' => 'Le budget publicitaire est-il inclus ?',
                    'answer' => 'Non, vous gérez votre budget pub directement (Google Ads, Meta). On optimise les campagnes. Budget recommandé : 300-2000 CHF/mois selon pack.'
                ]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

// Breadcrumb
echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Services & Offres']
]);
?>

<!-- Hero Section -->
<section class="section hero" style="padding-top: var(--space-2xl); padding-bottom: var(--space-xl); background: linear-gradient(135deg, rgba(0, 102, 204, 0.03) 0%, rgba(0, 168, 120, 0.03) 100%);">
    <div class="container" style="max-width: 900px; text-align: center;">
        <span class="hero-badge">5 packs adaptés aux PME Suisses</span>
        <h1 class="hero-title">Choisissez Votre Pack Marketing</h1>
        <p class="hero-subtitle">
            Prix clairs, sans engagement long terme, résultats mesurables.<br>
            De 490 CHF (one-time) à 990 CHF/mois selon vos besoins.
        </p>
    </div>
</section>

<!-- Pricing Cards -->
<section class="section" id="packs">
    <div class="container">

        <div class="grid grid-3" style="gap: var(--space-xl); margin-bottom: var(--space-3xl);">

            <!-- Pack 1 : Clic & Clients -->
            <div class="card card-pricing" id="clic-clients">
                <div class="card-badge" style="background: var(--color-accent-secondary);">⚡ Démarrage rapide</div>

                <div class="card-header">
                    <h3 class="card-title">Clic & Clients</h3>
                    <p class="card-tagline">Votre première page de vente qui convertit</p>
                </div>

                <div class="card-price">
                    <span class="price">490 CHF</span>
                    <span class="price-note">Paiement unique · TVA en sus</span>
                </div>

                <ul class="card-features">
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>1 landing page optimisée conversion</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Copywriting orienté vente</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Formulaire sécurisé anti-spam</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Google Analytics 4 configuré</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>1 campagne Google Ads (setup)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Support 30 jours</span>
                    </li>
                </ul>

                <div class="card-footer">
                    <a href="<?php echo site_url('contact/'); ?>" class="btn btn-primary btn-block">
                        Commander ce pack
                    </a>
                </div>

                <p class="text-sm text-muted text-center" style="margin-top: var(--space-base);">
                    Livraison : 7 jours · Budget pub non inclus (300-500 CHF/mois recommandé)
                </p>
            </div>

            <!-- Pack 2 : Acquisition Turbo (FEATURED) -->
            <div class="card card-pricing card-featured" id="acquisition-turbo">
                <div class="card-badge">🔥 Le plus populaire</div>

                <div class="card-header">
                    <h3 class="card-title">Acquisition Turbo</h3>
                    <p class="card-tagline">Génération de leads en continu</p>
                </div>

                <div class="card-price">
                    <span class="price">990 CHF</span>
                    <span class="price-note">Par mois · Sans engagement</span>
                </div>

                <ul class="card-features">
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span><strong>Gestion Google Ads + Meta Ads</strong></span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Optimisation landing pages (A/B tests)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Reporting mensuel détaillé</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Ajustements stratégiques continus</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Support prioritaire (< 24h)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Appels mensuels stratégie (30 min)</span>
                    </li>
                </ul>

                <div class="card-footer">
                    <a href="<?php echo site_url('contact/'); ?>" class="btn btn-primary btn-block">
                        Démarrer maintenant
                    </a>
                </div>

                <p class="text-sm text-muted text-center" style="margin-top: var(--space-base);">
                    Premiers résultats : 30 jours · Budget pub 1000-2000 CHF/mois recommandé
                </p>
            </div>

            <!-- Pack 3 : Prenez le lead ! (CRM) -->
            <div class="card card-pricing" id="crm">
                <div class="card-header">
                    <h3 class="card-title">Prenez le Lead !</h3>
                    <p class="card-tagline">CRM + tunnel de conversion automatisé</p>
                </div>

                <div class="card-price">
                    <span class="price">Sur devis</span>
                    <span class="price-note">1200-2500 CHF indicatif</span>
                </div>

                <ul class="card-features">
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Setup CRM (HubSpot ou équivalent)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Tunnel email automatisé (7 jours)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Scripts relance (téléphone + email)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Formation équipe (1h visio)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Support 60 jours</span>
                    </li>
                </ul>

                <div class="card-footer">
                    <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary btn-block" target="_blank" rel="noopener">
                        Discuter du projet
                    </a>
                </div>

                <p class="text-sm text-muted text-center" style="margin-top: var(--space-base);">
                    Setup : 14 jours · Idéal si vous recevez déjà des demandes
                </p>
            </div>

        </div>

        <!-- Packs 4 & 5 en 2 colonnes -->
        <div class="grid grid-2" style="gap: var(--space-xl); max-width: 900px; margin: 0 auto;">

            <!-- Pack 4 : Réseaux -->
            <div class="card card-pricing" id="reseaux">
                <div class="card-header">
                    <h3 class="card-title">Réseaux sans Prise de Tête</h3>
                    <p class="card-tagline">Présence pro LinkedIn/Facebook gérée</p>
                </div>

                <div class="card-price">
                    <span class="price">690 CHF</span>
                    <span class="price-note">Par mois · Sans engagement</span>
                </div>

                <ul class="card-features">
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>8 posts/mois (rédaction + visuels)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Programmation automatique</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Réponses commentaires/messages</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Reporting engagement mensuel</span>
                    </li>
                </ul>

                <div class="card-footer">
                    <a href="<?php echo site_url('contact/'); ?>" class="btn btn-secondary btn-block">
                        Démarrer LinkedIn
                    </a>
                </div>
            </div>

            <!-- Pack 5 : CMO -->
            <div class="card card-pricing" id="cmo">
                <div class="card-header">
                    <h3 class="card-title">CMO Partagé</h3>
                    <p class="card-tagline">Directeur marketing senior à temps partiel</p>
                </div>

                <div class="card-price">
                    <span class="price">Sur devis</span>
                    <span class="price-note">2500-5000 CHF/mois indicatif</span>
                </div>

                <ul class="card-features">
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Stratégie marketing trimestrielle</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Pilotage équipe marketing</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Reporting direction (KPI business)</span>
                    </li>
                    <li>
                        <svg class="icon icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Participation Codir (1-2x/mois)</span>
                    </li>
                </ul>

                <div class="card-footer">
                    <a href="<?php echo esc_url(CALENDLY_URL); ?>" class="btn btn-secondary btn-block" target="_blank" rel="noopener">
                        Planifier un appel
                    </a>
                </div>
            </div>

        </div>

    </div>
</section>

<!-- Comparateur -->
<section class="section section-alt">
    <div class="container">
        <div class="text-center mb-2xl">
            <h2>Comparez les Packs</h2>
            <p class="text-lg text-muted">Trouvez celui qui correspond à votre situation</p>
        </div>

        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: var(--radius-base); overflow: hidden; box-shadow: var(--shadow-base);">
                <thead style="background: var(--color-accent-primary); color: white;">
                    <tr>
                        <th style="padding: var(--space-lg); text-align: left; font-weight: var(--font-weight-semibold);">Critère</th>
                        <th style="padding: var(--space-lg); text-align: center;">Clic & Clients</th>
                        <th style="padding: var(--space-lg); text-align: center; background: rgba(255,255,255,0.1);">Acquisition Turbo</th>
                        <th style="padding: var(--space-lg); text-align: center;">CRM</th>
                        <th style="padding: var(--space-lg); text-align: center;">Réseaux</th>
                        <th style="padding: var(--space-lg); text-align: center;">CMO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: var(--border);">
                        <td style="padding: var(--space-base) var(--space-lg); font-weight: var(--font-weight-medium);">Prix</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">490 CHF</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; background: rgba(0,102,204,0.03);"><strong>990 CHF/mois</strong></td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">Devis</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">690 CHF/mois</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">Devis</td>
                    </tr>
                    <tr style="border-bottom: var(--border);">
                        <td style="padding: var(--space-base) var(--space-lg);">Idéal pour</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">Démarrage</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm); background: rgba(0,102,204,0.03);">Acquisition continue</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">Suivi leads</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">Visibilité B2B</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">PME 10-50 pers.</td>
                    </tr>
                    <tr style="border-bottom: var(--border);">
                        <td style="padding: var(--space-base) var(--space-lg);">Durée engagement</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">One-time</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; background: rgba(0,102,204,0.03);">Sans engagement</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">One-time</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">Sans engagement</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center;">6 mois min.</td>
                    </tr>
                    <tr>
                        <td style="padding: var(--space-base) var(--space-lg);">Résultats attendus</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">30 jours</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm); background: rgba(0,102,204,0.03);">30-90 jours</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">14 jours setup</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">6-12 mois</td>
                        <td style="padding: var(--space-base) var(--space-lg); text-align: center; font-size: var(--font-size-sm);">3-6 mois</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- FAQ Services -->
<section class="section">
    <div class="container">
        <div class="text-center mb-2xl">
            <h2>Questions Fréquentes sur les Packs</h2>
        </div>

        <div class="faq-list">
            <?php
            $faqs = [
                [
                    'question' => 'Quel pack choisir pour débuter ?',
                    'answer' => 'Le pack "Clic & Clients" (490 CHF) est idéal pour démarrer : page de vente optimisée + première campagne Google Ads. Vous obtenez une base solide et mesurable en 30 jours. Ensuite, si ça fonctionne, passez à "Acquisition Turbo" pour la gestion continue.'
                ],
                [
                    'question' => 'Puis-je annuler un pack récurrent ?',
                    'answer' => 'Oui, les packs mensuels (Acquisition Turbo, Réseaux) sont sans engagement longue durée. Un préavis de 30 jours suffit. Nous préférons des clients satisfaits qui restent par choix, pas par contrainte.'
                ],
                [
                    'question' => 'Le budget publicitaire est-il inclus dans le prix ?',
                    'answer' => 'Non, vous gérez votre budget pub directement sur votre compte Google Ads ou Meta. Nous optimisons les campagnes. Budget recommandé : 300-500 CHF/mois pour Clic & Clients, 1000-2000 CHF/mois pour Acquisition Turbo.'
                ],
                [
                    'question' => 'Combien de demandes vais-je recevoir ?',
                    'answer' => 'Impossible de garantir un chiffre exact (dépend de votre secteur, offre, budget pub, concurrence). Objectif réaliste avec Acquisition Turbo + 1500 CHF budget : 15-40 demandes qualifiées/mois après 90 jours d\'optimisation.'
                ],
                [
                    'question' => 'Puis-je combiner plusieurs packs ?',
                    'answer' => 'Oui, c\'est même recommandé ! Exemple courant : Clic & Clients (setup landing page) + Acquisition Turbo (gestion continue) + CRM (suivi leads). On adapte selon votre budget.'
                ],
                [
                    'question' => 'Proposez-vous un paiement échelonné ?',
                    'answer' => 'Pour les packs one-time (Clic & Clients, CRM) : possibilité 50% à la commande, 50% à la livraison. Pour les packs mensuels : paiement mensuel d\'avance. Contactez-nous pour discuter arrangements.'
                ],
                [
                    'question' => 'Travaillez-vous avec mon secteur d\'activité ?',
                    'answer' => 'Nous travaillons avec la plupart des PME B2B et B2C (services, e-commerce, commerce local). Secteurs refusés : pharma/santé réglementé, finance/assurance (licences requises), secteurs illégaux.'
                ],
                [
                    'question' => 'Que se passe-t-il après la commande ?',
                    'answer' => '1) Appel kick-off 30 min (comprendre votre offre, cible, objectifs). 2) On démarre le travail (délais selon pack). 3) Livraison + formation si applicable. 4) Support pendant durée mentionnée. 5) Point mensuel si pack récurrent.'
                ]
            ];

            foreach ($faqs as $index => $faq) {
                echo faq_item($faq['question'], $faq['answer'], 'services-' . $index);
            }
            ?>
        </div>
    </div>
</section>

<!-- CTA Final -->
<?php
echo section_cta([
    'title' => 'Prêt à démarrer ?',
    'description' => 'Commandez votre pack ou planifiez un appel gratuit pour discuter de votre projet.',
    'cta_primary_text' => 'Commander un pack',
    'cta_primary_url' => site_url('contact/'),
    'cta_secondary_text' => 'Planifier un appel (30 min)',
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

<?php include __DIR__ . '/../includes/footer.php'; ?>
