<?php
/**
 * Page À Propos — Clic COM
 * Notre approche pragmatique du marketing pour PME
 */

define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

$meta = [
    'title' => 'À propos — Clic COM, agence marketing pragmatique Suisse',
    'description' => 'Marketing orienté résultats pour PME suisses : pas de jargon, budget transparent, KPI business. Découvrez notre approche pragmatique.',
    'canonical' => site_url('a-propos/'),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'À propos', 'url' => site_url('a-propos/')]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'À propos']
]);
?>

<section class="section hero" style="background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 120, 0.05) 100%);">
    <div class="container" style="max-width: 800px; text-align: center;">
        <h1>Marketing Pragmatique pour PME Suisses</h1>
        <p class="text-lg text-muted" style="margin-top: var(--space-lg);">
            Pas de jargon. Pas de vanité metrics. Juste ce qui génère des demandes et des clients.
        </p>
    </div>
</section>

<section class="section">
    <div class="container" style="max-width: 800px;">

        <h2>Notre Approche</h2>

        <p style="font-size: var(--font-size-lg); line-height: var(--line-height-relaxed); margin-bottom: var(--space-xl);">
            <strong>La plupart des agences marketing vendent des "impressions", du "reach", de l'engagement.</strong> Ça fait joli dans un rapport. Mais ça ne paie pas les factures.
        </p>

        <p>
            Nous, on fait différemment. On mesure ce qui compte vraiment :
        </p>

        <ul style="margin: var(--space-lg) 0 var(--space-xl) var(--space-xl); line-height: var(--line-height-relaxed);">
            <li style="margin-bottom: var(--space-base);"><strong>Combien de demandes qualifiées</strong> vous recevez chaque mois</li>
            <li style="margin-bottom: var(--space-base);"><strong>Combien ça coûte</strong> par demande (pas par clic, par DEMANDE)</li>
            <li style="margin-bottom: var(--space-base);"><strong>Combien de ces demandes</strong> deviennent des clients</li>
            <li><strong>Quel retour sur investissement</strong> réel vous obtenez</li>
        </ul>

        <p style="background: rgba(0, 168, 120, 0.1); padding: var(--space-lg); border-left: 4px solid var(--color-accent-secondary); border-radius: var(--radius-sm); margin-bottom: var(--space-xl);">
            <strong>Notre promesse :</strong> Si un canal ne performe pas après 60 jours, on l'arrête ou on change de stratégie. Pas de campagnes zombies qui tournent pour rien et vident votre budget.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-3xl) 0;">

        <h2>Pourquoi les PME Suisses ?</h2>

        <p>
            Parce que vous avez des contraintes spécifiques que les grandes agences ne comprennent pas :
        </p>

        <div class="grid grid-2" style="gap: var(--space-xl); margin: var(--space-xl) 0;">
            <div class="card">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Budget limité</h3>
                <p class="text-muted">Vous n'avez pas 50'000 CHF à tester pendant 6 mois. Chaque franc compte. On le sait, on s'adapte.</p>
            </div>

            <div class="card">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Pas de temps</h3>
                <p class="text-muted">Vous gérez votre business. Pas envie de réunions hebdomadaires de 2h pour valider la couleur d'un bouton.</p>
            </div>

            <div class="card">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Besoin de résultats rapides</h3>
                <p class="text-muted">Vous ne pouvez pas attendre 12 mois pour "construire votre marque". Il vous faut des clients maintenant.</p>
            </div>

            <div class="card">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Marché local</h3>
                <p class="text-muted">Suisse romande, concurrence locale, particularités du marché CH. On connaît le terrain.</p>
            </div>
        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-3xl) 0;">

        <h2>Nos Valeurs</h2>

        <div style="margin: var(--space-xl) 0;">

            <div style="margin-bottom: var(--space-2xl);">
                <h3 class="h4" style="color: var(--color-accent-primary); margin-bottom: var(--space-sm);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: text-bottom; margin-right: var(--space-xs);">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Transparence
                </h3>
                <p>
                    Prix clairs affichés. Reporting simple (1 page A4, pas 40 slides). Accès direct à vos campagnes (c'est VOTRE compte Google Ads, pas le nôtre). Si ça ne fonctionne pas, on vous le dit franchement.
                </p>
            </div>

            <div style="margin-bottom: var(--space-2xl);">
                <h3 class="h4" style="color: var(--color-accent-primary); margin-bottom: var(--space-sm);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: text-bottom; margin-right: var(--space-xs);">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Mesure
                </h3>
                <p>
                    On ne vend pas de rêves. On mesure tout : demandes, coût par demande, taux de conversion, ROI. Chaque mois. En clair. Sans bullshit.
                </p>
            </div>

            <div style="margin-bottom: var(--space-2xl);">
                <h3 class="h4" style="color: var(--color-accent-primary); margin-bottom: var(--space-sm);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: text-bottom; margin-right: var(--space-xs);">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Pragmatisme
                </h3>
                <p>
                    Pas de stratégies fumeuses. On fait ce qui marche, on arrête ce qui ne marche pas. Simple. Si votre budget est de 500 CHF/mois, on ne va pas vous proposer une campagne omnicanale sur 8 plateformes.
                </p>
            </div>

        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-3xl) 0;">

        <h2>Qui Sommes-Nous ?</h2>

        <div class="card" style="background: rgba(0, 102, 204, 0.03); border: 2px solid var(--color-accent-primary); padding: var(--space-xl);">
            <p style="font-size: var(--font-size-lg); margin-bottom: var(--space-base);">
                <strong>À compléter :</strong> Informations sur le fondateur/équipe
            </p>
            <p class="text-muted" style="margin-bottom: 0;">
                <strong>Exemple pour solo :</strong> "Je suis [Nom], consultant marketing spécialisé acquisition PME. 12 ans d'expérience (dont 5 ans en agence, 7 ans en indépendant). J'ai accompagné 30+ PME suisses à générer des leads mesurables sans gaspiller leur budget."
            </p>
            <hr style="border: none; border-top: 1px solid rgba(0, 102, 204, 0.2); margin: var(--space-base) 0;">
            <p class="text-muted" style="margin-bottom: 0;">
                <strong>Exemple pour équipe :</strong> "Nous sommes une équipe de 3 spécialistes marketing basés en Suisse romande : [Nom 1] (stratégie & acquisition), [Nom 2] (création & design), [Nom 3] (analytics & CRM). Ensemble, 25+ ans d'expérience cumulée."
            </p>
        </div>

    </div>
</section>

<?php
echo section_cta([
    'title' => 'Envie de travailler ensemble ?',
    'description' => 'Découvrez notre méthode ou planifiez un appel gratuit de 30 minutes.',
    'cta_primary_text' => 'Voir notre méthode',
    'cta_primary_url' => site_url('resultats/'),
    'cta_secondary_text' => 'Planifier un appel',
    'cta_secondary_url' => CALENDLY_URL
]);
?>

<?php include __DIR__ . '/../includes/footer.php'; ?>
