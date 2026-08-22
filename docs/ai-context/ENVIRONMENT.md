# CLICOM — variables d'environnement

Les secrets ne doivent jamais être stockés dans ce dépôt.

## Hostinger
```text
HOST=0.0.0.0
PORT=3000

SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@clicom.ch
SMTP_PASSWORD=[SECRET HOSTINGER UNIQUEMENT]
EMAIL_FROM=CLICOM <hello@clicom.ch>
EMAIL_TO=hello@clicom.ch

PUBLIC_CALENDLY_URL=https://calendly.com/saber-moha/30min
PUBLIC_WHATSAPP_NUMBER=41788238950
```

`PUBLIC_GTM_ID` est optionnel.

## Règles
- `SMTP_PASSWORD` : jamais Git, jamais logs, jamais chat.
- Une variable `PUBLIC_` est exposable côté navigateur : jamais de secret avec ce préfixe.
- Si hPanel présente des champs séparés Nom/Valeur, ne pas saisir `=`.
- `.env.example` est un modèle ; le vrai `.env` n'est pas requis dans Git pour Hostinger.
