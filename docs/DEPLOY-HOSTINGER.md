# Déploiement Hostinger — CLICOM

## Objectif

Déployer CLICOM comme application Astro SSR Node sur Hostinger.

Le site ne doit pas être déployé comme un site statique classique dans `public_html`, car il contient des routes serveur, notamment `/api/contact`.

## Checklist avant déploiement

```bash
npm ci
npm run validate
```

Si `npm run validate` échoue, ne pas déployer.

## Configuration hPanel

Dans Hostinger :

1. Aller dans `Websites`.
2. Choisir `Add website` ou `Deploy Web App`.
3. Sélectionner `Node.js Web App`.
4. Connecter GitHub.
5. Choisir le repository `SwissEliteVan/clicom`.
6. Pour tester la refonte, choisir la branche `refonte-complete`.
7. Après validation, utiliser `main` pour la production.

## Paramètres de build

| Champ Hostinger | Valeur |
|---|---|
| Framework | Astro ou Other |
| Node.js | 22.x ou supérieur |
| Package manager | npm |
| Application root | `./` |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Entry file si demandé | `dist/server/entry.mjs` |
| Output directory si demandé | `dist` |

## Variables d'environnement

À ajouter dans hPanel :

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@clicom.ch
SMTP_PASSWORD=<secret>
EMAIL_FROM=CLICOM <hello@clicom.ch>
EMAIL_TO=hello@clicom.ch
PUBLIC_CALENDLY_URL=https://calendly.com/hello-clicom
PUBLIC_WHATSAPP_NUMBER=41788238950
PUBLIC_GTM_ID=
```

## Vérifications après déploiement

Tester dans cet ordre :

1. `/api/health`
2. `/`
3. `/sitemap-index.xml`
4. `/robots.txt`
5. formulaire de contact
6. version mobile
7. console navigateur
8. logs Hostinger

## Erreurs courantes

### `astro: not found`

Les dépendances ne sont pas installées ou le mauvais dossier est déployé.

Actions :

```bash
npm ci
npm run build
```

### Application inaccessible après build réussi

Vérifier :

- start command : `npm run start` ;
- présence de `HOST=0.0.0.0` ;
- variable `PORT` dans hPanel ;
- logs Runtime Hostinger.

### Formulaire en erreur `503`

Variables SMTP manquantes.

Vérifier :

- `SMTP_HOST` ;
- `SMTP_PORT` ;
- `SMTP_SECURE` ;
- `SMTP_USER` ;
- `SMTP_PASSWORD` ;
- `EMAIL_FROM` ;
- `EMAIL_TO`.

### Formulaire en erreur `502`

SMTP joignable mais envoi échoué.

Vérifier :

- mot de passe mailbox ;
- authentification SMTP ;
- quota e-mail ;
- logs Hostinger ;
- restriction anti-spam éventuelle.

## Rollback

Si la refonte pose problème :

1. Dans Hostinger, revenir à la dernière deployment stable si l'interface le permet.
2. Sinon, reconnecter ou redeployer la branche `main`.
3. Vérifier `/api/health` et le formulaire.
