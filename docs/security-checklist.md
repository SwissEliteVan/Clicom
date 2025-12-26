# Checklist de Securite - Production

Cette checklist vous aide a securiser votre application CRM avant et apres le deploiement en production.

## Avant le deploiement

### Configuration

- [ ] **Mode debug desactive**
  ```php
  'debug' => false,
  ```

- [ ] **HTTPS active**
  ```php
  'session' => [
      'secure' => true,
  ],
  ```

- [ ] **URL de production configuree**
  ```php
  'app' => [
      'url' => 'https://votre-domaine.com',
  ],
  ```

- [ ] **Mots de passe forts pour la base de donnees**
  - Minimum 16 caracteres
  - Melange de majuscules, minuscules, chiffres, symboles

### Fichiers

- [ ] **Supprimer les fichiers de developpement**
  - `sql/seed.sql` (ou modifier les mots de passe)
  - Fichiers de test
  - `.git/` (si present)

- [ ] **Verifier les permissions**
  ```
  config/config.php : 600
  Autres fichiers PHP : 644
  Dossiers : 755
  ```

- [ ] **Proteger le dossier config/**
  Deja configure dans `.htaccess`, verifier que ca fonctionne

### Base de donnees

- [ ] **Changer les mots de passe par defaut**
  - admin@example.com
  - user@example.com
  - Ou supprimer les comptes de demo

- [ ] **Creer un compte admin personnel**
  Avec une adresse email valide

- [ ] **Utilisateur MySQL avec droits limites**
  Seulement SELECT, INSERT, UPDATE, DELETE (pas de DROP, CREATE)

## Apres le deploiement

### Tests de securite

- [ ] **Tester l'acces aux fichiers proteges**
  - `/config/config.php` doit retourner 403
  - `/api/bootstrap.php` ne doit pas etre accessible directement

- [ ] **Verifier les en-tetes de securite**
  Utilisez https://securityheaders.com pour analyser votre site

- [ ] **Tester la protection CSRF**
  Les formulaires doivent echouer sans token valide

- [ ] **Tester le verrouillage de compte**
  Apres 5 tentatives echouees, le compte doit etre bloque

### Monitoring

- [ ] **Activer les logs d'erreur**
  ```php
  ini_set('log_errors', '1');
  ini_set('error_log', '/path/to/error.log');
  ```

- [ ] **Surveiller les connexions echouees**
  Table `activities` avec type 'login_failed'

- [ ] **Configurer des alertes**
  Pour les erreurs critiques et tentatives de connexion suspectes

## Bonnes pratiques continues

### Mots de passe

- [ ] Politique de mots de passe forts (minimum 8 caracteres)
- [ ] Rotation des mots de passe admin tous les 90 jours
- [ ] Ne jamais reutiliser les mots de passe

### Mises a jour

- [ ] Mettre a jour PHP regulierement
- [ ] Mettre a jour MySQL/MariaDB
- [ ] Appliquer les correctifs de securite

### Sauvegardes

- [ ] Sauvegardes automatiques quotidiennes
- [ ] Test de restauration mensuel
- [ ] Stockage hors site des sauvegardes

### Acces

- [ ] Desactiver les comptes inutilises
- [ ] Revoir les droits admin regulierement
- [ ] Journaliser les acces sensibles

## En-tetes de securite (configures dans .htaccess)

```apache
# Protection contre le sniffing MIME
Header set X-Content-Type-Options "nosniff"

# Protection XSS
Header set X-XSS-Protection "1; mode=block"

# Protection clickjacking
Header set X-Frame-Options "SAMEORIGIN"

# Politique de referrer
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Politique de contenu
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
```

## Vulnerabilites OWASP Top 10 - Mitigations

| Vulnerabilite | Mitigation |
|--------------|------------|
| Injection SQL | Requetes preparees (PDO) |
| Authentification cassee | Sessions securisees, verrouillage |
| Exposition de donnees | HTTPS, mots de passe haches |
| XXE | Non applicable (pas de XML) |
| Controle d'acces | Verification des roles |
| Mauvaise configuration | Checklist de production |
| XSS | Echappement HTML, CSP |
| Deserialisation | Non applicable |
| Composants vulnerables | Pas de dependances externes |
| Logging insuffisant | Journalisation des activites |

## Contacts de securite

Mettez a jour le fichier `security.txt` avec vos coordonnees :

```
Contact: mailto:security@votre-domaine.com
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: fr, en
```

## Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PHP Security Best Practices](https://www.php.net/manual/en/security.php)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
