<?php
/**
 * Mentions Légales — Clic COM
 * Page obligatoire Suisse (art. 3 LCD)
 */

define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

$meta = [
    'title' => 'Mentions Légales — ' . SITE_NAME,
    'description' => 'Informations légales et mentions obligatoires de ' . SITE_NAME . ', agence marketing pour PME suisses.',
    'canonical' => site_url('mentions-legales/'),
    'robots' => 'noindex, follow',
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Mentions Légales', 'url' => site_url('mentions-legales/')]
            ]
        ]
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Mentions Légales']
]);
?>

<section class="section">
    <div class="container" style="max-width: 800px;">

        <h1>Mentions Légales</h1>

        <p class="text-muted" style="margin-bottom: var(--space-2xl);">
            Conformément à la loi suisse sur la concurrence déloyale (LCD, art. 3), voici les informations légales concernant ce site.
        </p>

        <!-- À COMPLÉTER -->
        <div class="card" style="background: rgba(255, 193, 7, 0.1); border: 2px solid #FFC107; padding: var(--space-xl); margin-bottom: var(--space-2xl);">
            <h2 class="h5" style="margin-bottom: var(--space-base);">⚠️ Sections à compléter</h2>
            <p style="margin: 0;">
                Les sections ci-dessous contiennent des placeholders. <strong>Vous DEVEZ les remplacer par vos informations réelles</strong> avant mise en ligne publique.
            </p>
        </div>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Éditeur du Site</h2>

        <p><strong>Raison sociale :</strong> [À compléter]</p>
        <p><strong>Forme juridique :</strong> [Exemple : Société à responsabilité limitée (Sàrl) / Raison individuelle / SA]</p>
        <p><strong>Numéro IDE (Identification des Entreprises) :</strong> CHE-XXX.XXX.XXX</p>
        <p><strong>Numéro de TVA :</strong> CHE-XXX.XXX.XXX TVA (si assujetti)</p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Adresse du Siège</h2>

        <p>
            [Nom de l'entreprise]<br>
            [Rue et numéro]<br>
            [Code postal] [Ville]<br>
            Suisse
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Contact</h2>

        <p><strong>Téléphone :</strong> <a href="tel:+41XXXXXXXXX">+41 XX XXX XX XX</a></p>
        <p><strong>Email :</strong> <a href="mailto:<?php echo esc_attr(CONTACT_EMAIL); ?>"><?php echo esc_html(CONTACT_EMAIL); ?></a></p>
        <p><strong>Site web :</strong> <a href="<?php echo esc_url(SITE_URL); ?>"><?php echo esc_html(SITE_URL); ?></a></p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Représentant Légal</h2>

        <p><strong>Gérant / Directeur :</strong> [Nom Prénom]</p>
        <p class="text-muted" style="font-size: var(--font-size-sm);">
            <em>Obligatoire pour Sàrl et SA. Pour raison individuelle, indiquer le nom du propriétaire.</em>
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Hébergement du Site</h2>

        <p>
            <strong>Hébergeur :</strong> Hostinger International Ltd<br>
            <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre<br>
            <strong>Site web :</strong> <a href="https://www.hostinger.com" target="_blank" rel="noopener">www.hostinger.com</a>
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Propriété Intellectuelle</h2>

        <p>
            L'ensemble du contenu de ce site (textes, images, logos, graphismes, vidéos, scripts) est protégé par le droit d'auteur suisse et international.
        </p>

        <p>
            Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans autorisation écrite préalable de <strong><?php echo esc_html(SITE_NAME); ?></strong>.
        </p>

        <p>
            Toute exploitation non autorisée du site ou de son contenu engagera la responsabilité civile et/ou pénale de l'utilisateur.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Limitation de Responsabilité</h2>

        <p>
            <strong><?php echo esc_html(SITE_NAME); ?></strong> s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, <strong><?php echo esc_html(SITE_NAME); ?></strong> ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
        </p>

        <p>
            En conséquence, <strong><?php echo esc_html(SITE_NAME); ?></strong> décline toute responsabilité :
        </p>

        <ul style="margin: var(--space-base) 0 var(--space-lg) var(--space-xl); line-height: var(--line-height-relaxed);">
            <li style="margin-bottom: var(--space-sm);">Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site</li>
            <li style="margin-bottom: var(--space-sm);">Pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site</li>
            <li style="margin-bottom: var(--space-sm);">Pour tous dommages directs ou indirects résultant de l'utilisation de ce site ou de sites qui lui sont liés</li>
            <li>Pour les interruptions, pannes techniques, virus ou dysfonctionnements du site</li>
        </ul>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Liens Externes</h2>

        <p>
            Ce site peut contenir des liens hypertextes renvoyant vers des sites externes. <strong><?php echo esc_html(SITE_NAME); ?></strong> n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur disponibilité, ou les conséquences de leur consultation.
        </p>

        <p>
            La présence d'un lien vers un site externe ne constitue pas une approbation ou une validation du contenu de ce site par <strong><?php echo esc_html(SITE_NAME); ?></strong>.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Droit Applicable et Juridiction</h2>

        <p>
            Les présentes mentions légales sont régies par le droit suisse.
        </p>

        <p>
            En cas de litige, et à défaut d'accord amiable, les tribunaux suisses du canton de [À compléter : canton du siège de votre entreprise] seront seuls compétents.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <h2>Protection des Données</h2>

        <p>
            Pour toute information concernant la collecte et le traitement de vos données personnelles, veuillez consulter notre <a href="<?php echo site_url('confidentialite/'); ?>">Politique de Confidentialité</a>.
        </p>

        <hr style="border: none; border-top: var(--border); margin: var(--space-2xl) 0;">

        <p class="text-muted" style="font-size: var(--font-size-sm); text-align: center; margin-top: var(--space-2xl);">
            <strong>Dernière mise à jour :</strong> <?php echo date('d.m.Y'); ?>
        </p>

    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
