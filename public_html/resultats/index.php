<?php
/**
 * Page Résultats — Clic COM
 * Notre méthode en 5 étapes + framework KPI
 */

define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

$meta = [
    'title' => 'Notre Méthode — Clic COM, marketing orienté résultats mesurables',
    'description' => 'Processus en 5 étapes pour générer des clients qualifiés. KPI business, pas de vanité metrics. Découvrez notre méthode pragmatique.',
    'canonical' => site_url('resultats/'),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Résultats', 'url' => site_url('resultats/')]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Notre Méthode']
]);
?>

<section class="section hero" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 120, 0.05) 100%);">
    <div class="container" style="max-width: 800px; text-align: center;">
        <h1>Notre Méthode en 5 Étapes</h1>
        <p class="text-lg text-muted" style="margin-top: var(--space-lg);">
            Un processus clair, transparent et mesurable. De l'analyse à l'optimisation continue.
        </p>
    </div>
</section>

<section class="section">
    <div class="container" style="max-width: 900px;">

        <p style="font-size: var(--font-size-lg); line-height: var(--line-height-relaxed); margin-bottom: var(--space-2xl); text-align: center;">
            Pas de blabla stratégique qui ne mène nulle part. Juste un processus éprouvé qui génère des clients mesurables.
        </p>

        <!-- Timeline: Process 5 Steps -->
        <div class="timeline" style="position: relative; padding-left: var(--space-2xl); margin-bottom: var(--space-3xl);">

            <!-- Step 1 -->
            <div class="timeline-item" style="position: relative; margin-bottom: var(--space-3xl); padding-bottom: var(--space-2xl); border-left: 3px solid var(--color-border);">
                <div style="position: absolute; left: -13px; top: 0; width: 24px; height: 24px; background: var(--color-accent-primary); border-radius: 50%; border: 3px solid #fff;"></div>

                <div style="padding-left: var(--space-xl);">
                    <div style="display: inline-block; background: var(--color-accent-primary); color: #fff; padding: 4px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--space-sm);">
                        Étape 1 · Semaine 1
                    </div>

                    <h2 class="h3" style="margin-bottom: var(--space-base);">Diagnostic Marketing Gratuit</h2>

                    <p style="margin-bottom: var(--space-base);">
                        On analyse votre situation actuelle : concurrence, positionnement, canaux existants, budget, objectifs business.
                    </p>

                    <p style="background: rgba(0, 102, 204, 0.05); padding: var(--space-base); border-radius: var(--radius-sm); margin-bottom: var(--space-base);">
                        <strong>Livrable :</strong> Appel de 45 min + document PDF avec recommandations concrètes (quel canal prioriser, budget recommandé, ROI estimé).
                    </p>

                    <p class="text-muted" style="font-size: var(--font-size-sm);">
                        <strong>Vous recevez ce diagnostic même si vous ne signez pas.</strong> Pas de tunnel de vente, pas de pression.
                    </p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="timeline-item" style="position: relative; margin-bottom: var(--space-3xl); padding-bottom: var(--space-2xl); border-left: 3px solid var(--color-border);">
                <div style="position: absolute; left: -13px; top: 0; width: 24px; height: 24px; background: var(--color-accent-primary); border-radius: 50%; border: 3px solid #fff;"></div>

                <div style="padding-left: var(--space-xl);">
                    <div style="display: inline-block; background: var(--color-accent-primary); color: #fff; padding: 4px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--space-sm);">
                        Étape 2 · Semaine 2
                    </div>

                    <h2 class="h3" style="margin-bottom: var(--space-base);">Offre Sur-Mesure</h2>

                    <p style="margin-bottom: var(--space-base);">
                        Selon vos objectifs et budget, on vous propose un plan d'action concret. Pas de package standardisé : on adapte.
                    </p>

                    <ul style="margin: var(--space-base) 0 var(--space-base) var(--space-xl);">
                        <li style="margin-bottom: var(--space-xs);"><strong>Canal(aux) prioritaire(s)</strong> (Google Ads, SEO, LinkedIn…)</li>
                        <li style="margin-bottom: var(--space-xs);"><strong>Timeline réaliste</strong> (quand attendre les premiers résultats)</li>
                        <li style="margin-bottom: var(--space-xs);"><strong>Budget mensuel</strong> recommandé (pub + gestion)</li>
                        <li><strong>KPI de suivi</strong> (ce qu'on mesure chaque mois)</li>
                    </ul>

                    <p style="background: rgba(0, 102, 204, 0.05); padding: var(--space-base); border-radius: var(--radius-sm);">
                        <strong>Livrable :</strong> Proposition commerciale détaillée (PDF) avec tarifs transparents et calendrier.
                    </p>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="timeline-item" style="position: relative; margin-bottom: var(--space-3xl); padding-bottom: var(--space-2xl); border-left: 3px solid var(--color-border);">
                <div style="position: absolute; left: -13px; top: 0; width: 24px; height: 24px; background: var(--color-accent-primary); border-radius: 50%; border: 3px solid #fff;"></div>

                <div style="padding-left: var(--space-xl);">
                    <div style="display: inline-block; background: var(--color-accent-primary); color: #fff; padding: 4px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--space-sm);">
                        Étape 3 · Semaines 3-4
                    </div>

                    <h2 class="h3" style="margin-bottom: var(--space-base);">Mise en Place Technique</h2>

                    <p style="margin-bottom: var(--space-base);">
                        On configure tout ce qui est nécessaire pour démarrer proprement. Rien n'est lancé avant que vous ayez validé.
                    </p>

                    <div class="grid grid-2" style="gap: var(--space-lg); margin: var(--space-lg) 0;">
                        <div class="card" style="background: rgba(0, 168, 120, 0.05);">
                            <h3 class="h5" style="margin-bottom: var(--space-sm);">Outils & Tracking</h3>
                            <ul style="margin: 0; padding-left: var(--space-lg); font-size: var(--font-size-sm);">
                                <li>Google Analytics 4 + Tag Manager</li>
                                <li>Pixels de conversion (formulaires, appels)</li>
                                <li>Dashboard de suivi temps réel</li>
                                <li>Comptes publicitaires (Google, Meta…)</li>
                            </ul>
                        </div>

                        <div class="card" style="background: rgba(0, 168, 120, 0.05);">
                            <h3 class="h5" style="margin-bottom: var(--space-sm);">Campagnes & Contenu</h3>
                            <ul style="margin: 0; padding-left: var(--space-lg); font-size: var(--font-size-sm);">
                                <li>Structure campagnes initiale</li>
                                <li>Mots-clés, audiences, ciblages</li>
                                <li>Création annonces / visuels</li>
                                <li>Landing page si nécessaire</li>
                            </ul>
                        </div>
                    </div>

                    <p style="background: rgba(0, 102, 204, 0.05); padding: var(--space-base); border-radius: var(--radius-sm); margin-top: var(--space-base);">
                        <strong>Livrable :</strong> Accès à vos comptes (vous êtes propriétaire), documentation setup, preview campagnes.
                    </p>
                </div>
            </div>

            <!-- Step 4 -->
            <div class="timeline-item" style="position: relative; margin-bottom: var(--space-3xl); padding-bottom: var(--space-2xl); border-left: 3px solid var(--color-border);">
                <div style="position: absolute; left: -13px; top: 0; width: 24px; height: 24px; background: var(--color-accent-primary); border-radius: 50%; border: 3px solid #fff;"></div>

                <div style="padding-left: var(--space-xl);">
                    <div style="display: inline-block; background: var(--color-accent-primary); color: #fff; padding: 4px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--space-sm);">
                        Étape 4 · Mois 1-2
                    </div>

                    <h2 class="h3" style="margin-bottom: var(--space-base);">Lancement & Optimisation Intensive</h2>

                    <p style="margin-bottom: var(--space-base);">
                        Les 60 premiers jours, on surveille tout de près. Tests, ajustements quotidiens, itérations rapides.
                    </p>

                    <p style="margin-bottom: var(--space-base);">
                        <strong>Pourquoi 60 jours ?</strong> C'est le temps nécessaire pour accumuler assez de données et identifier ce qui fonctionne vraiment. Trop court = décisions basées sur la chance. Trop long = budget gaspillé.
                    </p>

                    <div class="card" style="background: rgba(255, 193, 7, 0.1); border-left: 4px solid #FFC107; padding: var(--space-lg);">
                        <h3 class="h5" style="margin-bottom: var(--space-sm);">Ce qu'on optimise chaque semaine :</h3>
                        <ul style="margin: var(--space-sm) 0 0 var(--space-lg);">
                            <li style="margin-bottom: var(--space-xs);">Coût par demande qualifiée (objectif : le réduire)</li>
                            <li style="margin-bottom: var(--space-xs);">Taux de conversion landing page (objectif : l'augmenter)</li>
                            <li style="margin-bottom: var(--space-xs);">Qualité des leads (objectif : filtrer les non-qualifiés)</li>
                            <li>Budget allocation (couper ce qui ne marche pas, renforcer ce qui marche)</li>
                        </ul>
                    </div>

                    <p style="background: rgba(0, 102, 204, 0.05); padding: var(--space-base); border-radius: var(--radius-sm); margin-top: var(--space-base);">
                        <strong>Livrable :</strong> Point hebdomadaire (email ou appel 15 min). Accès temps réel à vos données.
                    </p>
                </div>
            </div>

            <!-- Step 5 -->
            <div class="timeline-item" style="position: relative;">
                <div style="position: absolute; left: -13px; top: 0; width: 24px; height: 24px; background: var(--color-accent-secondary); border-radius: 50%; border: 3px solid #fff;"></div>

                <div style="padding-left: var(--space-xl);">
                    <div style="display: inline-block; background: var(--color-accent-secondary); color: #fff; padding: 4px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--space-sm);">
                        Étape 5 · Mois 3+
                    </div>

                    <h2 class="h3" style="margin-bottom: var(--space-base);">Reporting Mensuel & Scale</h2>

                    <p style="margin-bottom: var(--space-base);">
                        Une fois le canal validé, on passe en mode croissance contrôlée. Reporting mensuel transparent, optimisations continues.
                    </p>

                    <p style="background: rgba(0, 168, 120, 0.1); padding: var(--space-lg); border-left: 4px solid var(--color-accent-secondary); border-radius: var(--radius-sm); margin-bottom: var(--space-base);">
                        <strong>Reporting mensuel (1 page A4, pas 40 slides) :</strong>
                        <br><br>
                        ✓ Nombre de demandes reçues<br>
                        ✓ Coût par demande<br>
                        ✓ Taux de conversion (demandes → clients)<br>
                        ✓ ROI estimé (selon vos données de closing)<br>
                        ✓ Actions du mois prochain
                    </p>

                    <p class="text-muted" style="font-size: var(--font-size-sm); margin-bottom: var(--space-base);">
                        <strong>Sans engagement.</strong> Si vous voulez arrêter, vous arrêtez. Si un canal ne performe pas, on le coupe et on teste autre chose.
                    </p>

                    <div class="card" style="background: rgba(0, 102, 204, 0.03); border: 2px solid var(--color-accent-primary); padding: var(--space-lg);">
                        <h3 class="h5" style="margin-bottom: var(--space-sm);">Options de croissance (mois 3+) :</h3>
                        <ul style="margin: var(--space-sm) 0 0 var(--space-lg); line-height: var(--line-height-relaxed);">
                            <li style="margin-bottom: var(--space-xs);"><strong>Scaling budget</strong> — Augmenter budget pub si ROI positif</li>
                            <li style="margin-bottom: var(--space-xs);"><strong>Nouveau canal</strong> — Tester une 2e source (ex: SEO + Ads)</li>
                            <li style="margin-bottom: var(--space-xs);"><strong>Automation CRM</strong> — Nurturing automatisé des leads</li>
                            <li><strong>Retargeting</strong> — Remarketing visiteurs non-convertis</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-3xl) 0;">

        <h2 style="text-align: center; margin-bottom: var(--space-xl);">Les KPI Qu'On Mesure (Vraiment)</h2>

        <p style="text-align: center; margin-bottom: var(--space-2xl); color: var(--color-text-muted);">
            Pas de "reach", pas d'impressions, pas de likes. Juste ce qui compte pour votre chiffre d'affaires.
        </p>

        <div class="grid grid-2" style="gap: var(--space-xl); margin-bottom: var(--space-3xl);">

            <div class="card" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 102, 204, 0.01) 100%); border-left: 4px solid var(--color-accent-primary);">
                <h3 class="h4" style="color: var(--color-accent-primary); margin-bottom: var(--space-base);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block; margin-bottom: var(--space-sm);">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    Demandes Qualifiées / Mois
                </h3>
                <p style="margin-bottom: var(--space-sm);">
                    Nombre de prospects qui remplissent votre formulaire ou vous appellent. <strong>Qualifiés = correspondent à votre client idéal.</strong>
                </p>
                <p class="text-muted" style="font-size: var(--font-size-sm); margin: 0;">
                    <strong>Objectif :</strong> Minimum 5-10 demandes/mois avec budget starter. 20-40+ avec budget acquisition.
                </p>
            </div>

            <div class="card" style="background: linear-gradient(135deg, rgba(0, 168, 120, 0.05) 0%, rgba(0, 168, 120, 0.01) 100%); border-left: 4px solid var(--color-accent-secondary);">
                <h3 class="h4" style="color: var(--color-accent-secondary); margin-bottom: var(--space-base);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block; margin-bottom: var(--space-sm);">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Coût Par Demande (CPL)
                </h3>
                <p style="margin-bottom: var(--space-sm);">
                    Combien ça vous coûte pour obtenir UNE demande qualifiée. Pub + gestion / nombre de demandes.
                </p>
                <p class="text-muted" style="font-size: var(--font-size-sm); margin: 0;">
                    <strong>Benchmark Suisse :</strong> Google Ads B2B services = 80-250 CHF/demande selon secteur. SEO = coût amorti sur 12+ mois.
                </p>
            </div>

            <div class="card" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 102, 204, 0.01) 100%); border-left: 4px solid var(--color-accent-primary);">
                <h3 class="h4" style="color: var(--color-accent-primary); margin-bottom: var(--space-base);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block; margin-bottom: var(--space-sm);">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Taux de Conversion Lead → Client
                </h3>
                <p style="margin-bottom: var(--space-sm);">
                    Parmi les demandes reçues, combien deviennent clients payants. <strong>C'est VOUS qui closez, pas nous.</strong> Mais on peut optimiser la qualité des leads.
                </p>
                <p class="text-muted" style="font-size: var(--font-size-sm); margin: 0;">
                    <strong>Suivi :</strong> Vous nous indiquez chaque mois combien de demandes ont converti. On ajuste le ciblage en conséquence.
                </p>
            </div>

            <div class="card" style="background: linear-gradient(135deg, rgba(0, 168, 120, 0.05) 0%, rgba(0, 168, 120, 0.01) 100%); border-left: 4px solid var(--color-accent-secondary);">
                <h3 class="h4" style="color: var(--color-accent-secondary); margin-bottom: var(--space-base);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block; margin-bottom: var(--space-sm);">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    ROI Marketing
                </h3>
                <p style="margin-bottom: var(--space-sm);">
                    Combien vous rapporte chaque franc investi en marketing. Calculé sur base de votre panier moyen et taux de closing.
                </p>
                <p class="text-muted" style="font-size: var(--font-size-sm); margin: 0;">
                    <strong>Exemple :</strong> Si votre panier moyen = 5'000 CHF, taux closing = 20%, CPL = 150 CHF → ROI ≈ 6.7x (pour 1 CHF dépensé, 6.70 CHF de CA).
                </p>
            </div>

        </div>

        <div class="card" style="background: rgba(255, 193, 7, 0.1); border: 2px solid #FFC107; padding: var(--space-xl); text-align: center;">
            <h3 class="h4" style="margin-bottom: var(--space-base);">Notre Règle d'Or</h3>
            <p style="font-size: var(--font-size-lg); margin: 0;">
                <strong>Si un canal ne génère pas de demandes qualifiées après 60 jours, on le coupe ou on change radicalement de stratégie.</strong> Pas de campagnes zombies qui tournent pour rien.
            </p>
        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-3xl) 0;">

        <h2 style="text-align: center; margin-bottom: var(--space-xl);">Exemples de Résultats Clients</h2>

        <div class="card" style="background: rgba(0, 102, 204, 0.03); border: 2px solid var(--color-accent-primary); padding: var(--space-xl); margin-bottom: var(--space-2xl);">
            <p style="font-size: var(--font-size-lg); margin-bottom: var(--space-base); text-align: center;">
                <strong>⚠️ Section à compléter avec VOS cas clients réels</strong>
            </p>
            <p class="text-muted" style="margin-bottom: var(--space-base); text-align: center;">
                Utilisez la structure ci-dessous. <strong>N'INVENTEZ JAMAIS de chiffres.</strong> Si vous n'avez pas encore de clients, retirez cette section ou remplacez par des projections réalistes basées sur des benchmarks de votre secteur.
            </p>

            <hr style="border: none; border-top: 1px solid rgba(0, 102, 204, 0.2); margin: var(--space-lg) 0;">

            <div style="margin-top: var(--space-lg);">
                <h3 class="h5" style="margin-bottom: var(--space-base);">Template Cas Client (Exemple) :</h3>

                <div class="grid grid-2" style="gap: var(--space-lg);">
                    <div>
                        <p style="margin-bottom: var(--space-sm);"><strong>Secteur :</strong> Services B2B (Comptabilité PME)</p>
                        <p style="margin-bottom: var(--space-sm);"><strong>Objectif :</strong> Générer 15 demandes/mois minimum</p>
                        <p style="margin-bottom: var(--space-sm);"><strong>Budget :</strong> 1'200 CHF/mois (pub) + 990 CHF (gestion)</p>
                        <p><strong>Durée :</strong> 6 mois</p>
                    </div>

                    <div>
                        <p style="margin-bottom: var(--space-sm);"><strong>Résultats mois 3-6 :</strong></p>
                        <ul style="margin: 0; padding-left: var(--space-lg);">
                            <li>22 demandes qualifiées/mois (moyenne)</li>
                            <li>CPL moyen : 54 CHF</li>
                            <li>Taux closing client : 18%</li>
                            <li>≈ 4 nouveaux clients/mois acquis</li>
                        </ul>
                    </div>
                </div>

                <p style="margin-top: var(--space-base); padding: var(--space-base); background: rgba(0, 168, 120, 0.1); border-radius: var(--radius-sm); font-size: var(--font-size-sm);">
                    <strong>Témoignage :</strong> « [Insérer citation réelle client si autorisé. Sinon, supprimer cette partie.] »<br>
                    — [Prénom], [Entreprise], [Ville]
                </p>
            </div>
        </div>

        <p class="text-muted" style="text-align: center; font-size: var(--font-size-sm); margin-bottom: var(--space-2xl);">
            <strong>Note importante :</strong> Les résultats varient selon secteur, concurrence locale, budget, qualité du closing commercial. Nous ne garantissons jamais de résultats spécifiques, mais nous nous engageons sur la transparence et l'optimisation continue.
        </p>

    </div>
</section>

<?php
echo section_cta([
    'title' => 'Prêt à démarrer ?',
    'description' => 'Commencez par un diagnostic gratuit ou planifiez un appel de 30 min.',
    'cta_primary_text' => 'Demander un diagnostic',
    'cta_primary_url' => site_url('contact/'),
    'cta_secondary_text' => 'Planifier un appel',
    'cta_secondary_url' => CALENDLY_URL
]);
?>

<?php include __DIR__ . '/../includes/footer.php'; ?>
