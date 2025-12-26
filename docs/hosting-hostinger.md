# Guide d'installation sur Hostinger

Ce guide vous accompagne pas a pas pour deployer l'application CRM sur un hebergement Hostinger mutualisé.

## Prerequis

- Un compte Hostinger avec un plan d'hebergement web
- Acces au panneau hPanel
- Un nom de domaine configure (ou utiliser le sous-domaine temporaire)

## Etape 1 : Creer la base de donnees MySQL

1. Connectez-vous a votre **hPanel Hostinger**
2. Allez dans **Bases de donnees** > **Gestion MySQL**
3. Cliquez sur **Creer une nouvelle base de donnees**
4. Remplissez les champs :
   - **Nom de la base** : `crm_database` (ou votre choix)
   - **Nom d'utilisateur** : `crm_user` (ou votre choix)
   - **Mot de passe** : Generez un mot de passe securise
5. Cliquez sur **Creer**
6. **Notez ces informations** - vous en aurez besoin pour la configuration

## Etape 2 : Importer le schema SQL

### Option A : Via phpMyAdmin

1. Dans hPanel, allez dans **Bases de donnees** > **phpMyAdmin**
2. Selectionnez votre base de donnees dans la liste de gauche
3. Cliquez sur l'onglet **Importer**
4. Cliquez sur **Choisir un fichier** et selectionnez `sql/schema.sql`
5. Cliquez sur **Executer**
6. Repetez avec `sql/seed.sql` pour les donnees de demonstration

### Option B : Via la ligne de commande (SSH)

Si vous avez acces SSH :

```bash
mysql -u crm_user -p crm_database < sql/schema.sql
mysql -u crm_user -p crm_database < sql/seed.sql
```

## Etape 3 : Uploader les fichiers

### Option A : Via le Gestionnaire de fichiers

1. Dans hPanel, allez dans **Fichiers** > **Gestionnaire de fichiers**
2. Naviguez vers le dossier `public_html` (ou votre dossier racine)
3. Uploadez tous les fichiers et dossiers du projet
4. Assurez-vous que la structure est correcte :

```
public_html/
├── index.php
├── .htaccess
├── assets/
├── config/
├── api/
├── views/
├── sql/
└── docs/
```

### Option B : Via FTP

1. Utilisez un client FTP (FileZilla, Cyberduck, etc.)
2. Connectez-vous avec les identifiants FTP de Hostinger
3. Uploadez les fichiers dans `public_html`

## Etape 4 : Configurer l'application

1. Dans le Gestionnaire de fichiers, naviguez vers `config/`
2. **Renommez** `config.example.php` en `config.php`
3. **Editez** `config.php` et modifiez les valeurs :

```php
'database' => [
    'host' => 'localhost',          // Garder localhost
    'port' => 3306,
    'name' => 'u123456789_crm',     // Votre nom de base
    'user' => 'u123456789_user',    // Votre utilisateur
    'password' => 'VotreMotDePasse', // Votre mot de passe
    'charset' => 'utf8mb4',
],

'app' => [
    'url' => 'https://votre-domaine.com',
    'debug' => false,  // Important: false en production!
],

'session' => [
    'secure' => true,  // true si vous utilisez HTTPS
],
```

4. **Sauvegardez** le fichier

## Etape 5 : Verifier les permissions

Les permissions recommandees :
- Dossiers : `755`
- Fichiers PHP : `644`
- config/config.php : `600` (lecture seule par le proprietaire)

Pour modifier les permissions dans le Gestionnaire de fichiers :
1. Clic droit sur le fichier/dossier
2. Selectionnez **Permissions**
3. Modifiez la valeur

## Etape 6 : Activer HTTPS (recommande)

1. Dans hPanel, allez dans **Securite** > **SSL**
2. Installez le certificat SSL gratuit Let's Encrypt
3. Activez **Forcer HTTPS**

Une fois HTTPS active, decommmentez ces lignes dans `.htaccess` :

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Etape 7 : Tester l'application

1. Ouvrez votre navigateur et allez sur votre domaine
2. Vous devriez voir la page de connexion
3. Connectez-vous avec les identifiants par defaut :
   - **Email** : admin@example.com
   - **Mot de passe** : password (ou Admin123! selon le hash)

**IMPORTANT** : Changez immediatement le mot de passe apres la premiere connexion !

## Depannage

### Erreur 500

1. Verifiez les logs d'erreur dans hPanel > **Fichiers** > **Logs**
2. Assurez-vous que le fichier `config.php` est correctement configure
3. Verifiez que les permissions sont correctes

### Page blanche

1. Activez le mode debug temporairement dans `config.php` :
   ```php
   'debug' => true,
   ```
2. Verifiez les erreurs affichees
3. **Desactivez le debug** une fois le probleme resolu

### Erreur de connexion a la base de donnees

1. Verifiez le nom d'hote (generalement `localhost`)
2. Verifiez le nom de base, utilisateur et mot de passe
3. Assurez-vous que l'utilisateur a les droits sur la base

### Les styles/JS ne se chargent pas

1. Verifiez que les fichiers sont bien uploades dans `assets/`
2. Verifiez les chemins dans le code (ils doivent etre absolus : `/assets/...`)
3. Videz le cache du navigateur

## Maintenance

### Sauvegardes

1. Utilisez l'outil de sauvegarde automatique de Hostinger
2. Ou exportez regulierement via phpMyAdmin
3. Sauvegardez egalement les fichiers (surtout `config.php`)

### Mises a jour

1. Sauvegardez la base de donnees et les fichiers
2. Uploadez les nouveaux fichiers (sauf `config.php`)
3. Executez les migrations SQL si necessaire
4. Testez l'application

## Support

Pour toute question technique sur Hostinger :
- Documentation Hostinger : https://support.hostinger.fr/
- Chat en direct disponible 24/7

Pour des questions sur l'application CRM :
- Consultez le README.md
- Verifiez les logs d'erreur
