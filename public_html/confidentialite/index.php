<?php
/**
 * Politique de Confidentialité — Clic COM
 * Conforme RGPD (UE) + nLPD (Suisse 2023)
 */

define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

$meta = [
    'title' => 'Politique de Confidentialité — ' . SITE_NAME,
    'description' => 'Comment nous collectons, utilisons et protégeons vos données personnelles. Conforme RGPD et loi suisse sur la protection des données.',
    'canonical' => site_url('confidentialite/'),
    'robots' => 'noindex, follow',
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Confidentialité', 'url' => site_url('confidentialite/')]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Politique de Confidentialité']
]);
?>

<section class="section">
    <div class="container" style="max-width: 800px;">

        <h1>Politique de Confidentialité</h1>

        <p class="text-muted" style="margin-bottom: var(--space-2xl);">
            Conforme au RGPD (UE) et à la nouvelle loi fédérale sur la protection des données (nLPD) suisse, en vigueur depuis le 1er septembre 2023.
        </p>

        <!-- À COMPLÉTER -->
        <div class="card" style="background: rgba(255, 193, 7, 0.1); border: 2px solid #FFC107; padding: var(--space-xl); margin-bottom: var(--space-2xl);">
            <h2 class="h5" style="margin-bottom: var(--space-base);">⚠️ Sections à compléter</h2>
            <p style="margin: 0;">
                Les sections ci-dessous contiennent des placeholders. <strong>Vous DEVEZ les adapter à vos pratiques réelles</strong> (notamment les outils tiers que vous utilisez : CRM, analytics, etc.).
            </p>
        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>1. Responsable du Traitement des Données</h2>

        <p>
            <strong>Raison sociale :</strong> [À compléter : Nom de votre entreprise]<br>
            <strong>Adresse :</strong> [Rue], [Code postal] [Ville], Suisse<br>
            <strong>Email :</strong> <a href="mailto:<?php echo esc_attr(CONTACT_EMAIL); ?>"><?php echo esc_html(CONTACT_EMAIL); ?></a><br>
            <strong>Téléphone :</strong> [À compléter]
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>2. Données Personnelles Collectées</h2>

        <h3 class="h4" style="margin-top: var(--space-xl); margin-bottom: var(--space-base);">2.1 Formulaire de Contact</h3>

        <p>Lorsque vous remplissez notre formulaire de contact, nous collectons :</p>

        <ul style="margin: var(--space-base) 0 var(--space-lg) var(--space-xl); line-height: var(--line-height-relaxed);">
            <li style="margin-bottom: var(--space-sm);"><strong>Nom et prénom</strong> (obligatoire)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Adresse email</strong> (obligatoire)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Numéro de téléphone</strong> (facultatif)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Message</strong> (obligatoire)</li>
            <li><strong>Données techniques</strong> : adresse IP, horodatage (pour sécurité anti-spam)</li>
        </ul>

        <p><strong>Base légale :</strong> Consentement (art. 6 § 1 a RGPD) + Intérêt légitime pour traiter votre demande.</p>
        <p><strong>Durée de conservation :</strong> 2 ans maximum, ou jusqu'à votre demande de suppression.</p>

        <h3 class="h4" style="margin-top: var(--space-xl); margin-bottom: var(--space-base);">2.2 Cookies et Traceurs</h3>

        <p>Ce site utilise uniquement des cookies essentiels et analytiques :</p>

        <table style="width: 100%; margin: var(--space-lg) 0; border-collapse: collapse; font-size: var(--font-size-sm);">
            <thead style="background: var(--color-bg-secondary);">
                <tr>
                    <th style="padding: var(--space-sm); border: var(--border); text-align: left;">Cookie</th>
                    <th style="padding: var(--space-sm); border: var(--border); text-align: left;">Finalité</th>
                    <th style="padding: var(--space-sm); border: var(--border); text-align: left;">Durée</th>
                    <th style="padding: var(--space-sm); border: var(--border); text-align: left;">Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: var(--space-sm); border: var(--border);"><code>session_id</code></td>
                    <td style="padding: var(--space-sm); border: var(--border);">Maintien de session PHP</td>
                    <td style="padding: var(--space-sm); border: var(--border);">Session</td>
                    <td style="padding: var(--space-sm); border: var(--border);">Essentiel</td>
                </tr>
                <tr>
                    <td style="padding: var(--space-sm); border: var(--border);"><code>_ga</code></td>
                    <td style="padding: var(--space-sm); border: var(--border);">Google Analytics (statistiques anonymisées)</td>
                    <td style="padding: var(--space-sm); border: var(--border);">24 mois</td>
                    <td style="padding: var(--space-sm); border: var(--border);">Analytique</td>
                </tr>
            </tbody>
        </table>

        <p class="text-muted" style="font-size: var(--font-size-sm);">
            <strong>Note :</strong> Google Analytics est configuré en mode anonymisation IP (cookieless si possible) pour respecter la vie privée.
        </p>

        <p><strong>Vous pouvez refuser les cookies analytiques</strong> via les paramètres de votre navigateur.</p>

        <h3 class="h4" style="margin-top: var(--space-xl); margin-bottom: var(--space-base);">2.3 Calendly (Prise de Rendez-vous)</h3>

        <p>
            Si vous planifiez un appel via notre widget Calendly, vos données (nom, email, horaire choisi) sont collectées et traitées par <strong>Calendly LLC</strong> (États-Unis), avec qui nous avons un accord de traitement des données conforme RGPD.
        </p>

        <p>
            <strong>Consultez la politique de Calendly :</strong> <a href="https://calendly.com/privacy" target="_blank" rel="noopener">calendly.com/privacy</a>
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>3. Finalités du Traitement</h2>

        <p>Nous utilisons vos données personnelles uniquement pour :</p>

        <ul style="margin: var(--space-base) 0 var(--space-lg) var(--space-xl); line-height: var(--line-height-relaxed);">
            <li style="margin-bottom: var(--space-sm);"><strong>Répondre à vos demandes</strong> via formulaire ou email</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Planifier des rendez-vous</strong> (si vous utilisez Calendly)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Analyser le trafic</strong> du site (statistiques anonymisées via Google Analytics)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Prévenir le spam</strong> (vérifications anti-bot, rate limiting)</li>
            <li><strong>Respecter nos obligations légales</strong> (comptabilité, fiscalité)</li>
        </ul>

        <p><strong>Nous ne vendons JAMAIS vos données</strong> à des tiers à des fins commerciales.</p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>4. Destinataires des Données</h2>

        <p>Vos données peuvent être partagées avec :</p>

        <ul style="margin: var(--space-base) 0 var(--space-lg) var(--space-xl); line-height: var(--line-height-relaxed);">
            <li style="margin-bottom: var(--space-sm);"><strong>Hostinger</strong> (hébergement du site, serveurs UE/Suisse)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Google Analytics</strong> (statistiques anonymisées)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Calendly</strong> (si vous planifiez un rendez-vous)</li>
            <li><strong>[À compléter si vous utilisez d'autres outils]</strong> : CRM (ex: HubSpot, Pipedrive), Email marketing (ex: Mailchimp), etc.</li>
        </ul>

        <p>
            <strong>Transferts hors UE/Suisse :</strong> Certains sous-traitants (Google, Calendly) peuvent transférer vos données aux États-Unis. Ces transferts sont encadrés par les Clauses Contractuelles Types (CCT) approuvées par la Commission Européenne.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>5. Durée de Conservation</h2>

        <table style="width: 100%; margin: var(--space-lg) 0; border-collapse: collapse; font-size: var(--font-size-sm);">
            <thead style="background: var(--color-bg-secondary);">
                <tr>
                    <th style="padding: var(--space-sm); border: var(--border); text-align: left;">Type de donnée</th>
                    <th style="padding: var(--space-sm); border: var(--border); text-align: left;">Durée de conservation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: var(--space-sm); border: var(--border);">Demandes de contact (non-clients)</td>
                    <td style="padding: var(--space-sm); border: var(--border);">2 ans maximum</td>
                </tr>
                <tr>
                    <td style="padding: var(--space-sm); border: var(--border);">Données clients (si contrat signé)</td>
                    <td style="padding: var(--space-sm); border: var(--border);">10 ans (obligation comptable Suisse)</td>
                </tr>
                <tr>
                    <td style="padding: var(--space-sm); border: var(--border);">Logs serveur / anti-spam</td>
                    <td style="padding: var(--space-sm); border: var(--border);">30 jours</td>
                </tr>
                <tr>
                    <td style="padding: var(--space-sm); border: var(--border);">Cookies Google Analytics</td>
                    <td style="padding: var(--space-sm); border: var(--border);">24 mois</td>
                </tr>
            </tbody>
        </table>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>6. Vos Droits (RGPD + nLPD Suisse)</h2>

        <p>Conformément au RGPD et à la loi suisse sur la protection des données, vous disposez des droits suivants :</p>

        <div class="grid grid-2" style="gap: var(--space-lg); margin: var(--space-xl) 0;">

            <div class="card" style="background: rgba(0, 102, 204, 0.05);">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Droit d'Accès</h3>
                <p class="text-muted" style="margin: 0; font-size: var(--font-size-sm);">
                    Obtenir une copie de toutes les données personnelles que nous détenons sur vous.
                </p>
            </div>

            <div class="card" style="background: rgba(0, 102, 204, 0.05);">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Droit de Rectification</h3>
                <p class="text-muted" style="margin: 0; font-size: var(--font-size-sm);">
                    Corriger des données inexactes ou incomplètes.
                </p>
            </div>

            <div class="card" style="background: rgba(0, 102, 204, 0.05);">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Droit à l'Effacement</h3>
                <p class="text-muted" style="margin: 0; font-size: var(--font-size-sm);">
                    Demander la suppression de vos données (sauf obligations légales de conservation).
                </p>
            </div>

            <div class="card" style="background: rgba(0, 102, 204, 0.05);">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Droit d'Opposition</h3>
                <p class="text-muted" style="margin: 0; font-size: var(--font-size-sm);">
                    Vous opposer à un traitement (marketing direct, profilage, etc.).
                </p>
            </div>

            <div class="card" style="background: rgba(0, 102, 204, 0.05);">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Droit à la Portabilité</h3>
                <p class="text-muted" style="margin: 0; font-size: var(--font-size-sm);">
                    Récupérer vos données dans un format structuré et réutilisable.
                </p>
            </div>

            <div class="card" style="background: rgba(0, 102, 204, 0.05);">
                <h3 class="h5" style="margin-bottom: var(--space-sm);">Droit de Limitation</h3>
                <p class="text-muted" style="margin: 0; font-size: var(--font-size-sm);">
                    Demander la limitation du traitement (ex: pendant vérification de l'exactitude des données).
                </p>
            </div>

        </div>

        <p style="margin-top: var(--space-xl);">
            <strong>Pour exercer vos droits :</strong> Envoyez un email à <a href="mailto:<?php echo esc_attr(CONTACT_EMAIL); ?>"><?php echo esc_html(CONTACT_EMAIL); ?></a> avec l'objet « Exercice de mes droits RGPD ».
        </p>

        <p>
            Nous nous engageons à répondre dans un délai de <strong>30 jours maximum</strong>.
        </p>

        <p class="text-muted" style="font-size: var(--font-size-sm); padding: var(--space-base); background: rgba(0, 168, 120, 0.05); border-radius: var(--radius-sm);">
            <strong>Droit de recours :</strong> Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une plainte auprès du <strong>Préposé fédéral à la protection des données et à la transparence (PFPDT)</strong> en Suisse : <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">www.edoeb.admin.ch</a>
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>7. Sécurité des Données</h2>

        <p>Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :</p>

        <ul style="margin: var(--space-base) 0 var(--space-lg) var(--space-xl); line-height: var(--line-height-relaxed);">
            <li style="margin-bottom: var(--space-sm);"><strong>Chiffrement SSL/TLS</strong> (HTTPS) pour toutes les communications</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Hébergement sécurisé</strong> avec sauvegardes régulières</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Accès restreint</strong> aux données (uniquement personnel autorisé)</li>
            <li style="margin-bottom: var(--space-sm);"><strong>Anti-spam</strong> : honeypot, rate limiting, time trap</li>
            <li><strong>Mises à jour régulières</strong> des systèmes et logiciels</li>
        </ul>

        <p>
            En cas de violation de données (data breach), nous nous engageons à notifier les autorités compétentes et les personnes concernées dans les <strong>72 heures</strong>, conformément à l'art. 33 RGPD.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>8. Modifications de cette Politique</h2>

        <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment, notamment pour nous conformer aux évolutions légales ou à nos pratiques.
        </p>

        <p>
            <strong>Date de dernière mise à jour :</strong> <?php echo date('d.m.Y'); ?>
        </p>

        <p>
            Les modifications importantes seront notifiées via un bandeau sur le site ou par email si vous êtes client.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>9. Contact</h2>

        <p>
            Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles :
        </p>

        <p>
            <strong>Email :</strong> <a href="mailto:<?php echo esc_attr(CONTACT_EMAIL); ?>"><?php echo esc_html(CONTACT_EMAIL); ?></a><br>
            <strong>Téléphone :</strong> [À compléter]<br>
            <strong>Adresse postale :</strong> [À compléter]
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <p class="text-muted" style="font-size: var(--font-size-sm); text-align: center; margin-top: var(--space-2xl);">
            <strong>Dernière mise à jour :</strong> <?php echo date('d.m.Y'); ?><br>
            Conforme au RGPD (UE 2016/679) et à la nLPD (Suisse, en vigueur depuis le 1er septembre 2023).
        </p>

    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
