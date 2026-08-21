PROMPT MAÎTRE — CLICOM OPTIMIZATION EXECUTION

Tu travailles dans le dépôt CLICOM.

CONTEXTE

Projet :

Repository : SwissEliteVan/Clicom

Branche de référence : main

Stack : Astro 7, TypeScript strict, Astro SSR Node standalone

Node : >=22.12.0

Déploiement : Hostinger Node.js Web App

Domaine : https://clicom.ch

Le dépôt a déjà fait l’objet d’une refonte importante en plusieurs phases.
Tu ne dois PAS recommencer une refonte globale.

Le travail demandé consiste à appliquer progressivement le backlog du manifest :

CLICOM_OPTIMIZATION_MANIFEST_2026-08-21.md

Objectif global :

Stabiliser → sécuriser → mesurer → automatiser les contrôles → optimiser sur données réelles.

0. RÈGLE ABSOLUE AVANT TOUTE MODIFICATION

Avant de modifier le moindre fichier :

Lire intégralement :

AGENTS.md

docs/TECHNICAL-MANIFEST.md

CLICOM_OPTIMIZATION_MANIFEST_2026-08-21.md

Examiner l’architecture actuelle.

Vérifier si le problème est toujours présent dans le code actuel.

Ne jamais corriger quelque chose uniquement parce que le manifest le mentionne.
Le code courant est la source de vérité.

Ne jamais produire un diff artificiel.

Ne jamais commit ou push sans demande explicite.

Ne jamais utiliser git reset --hard.

Ne jamais modifier simultanément plusieurs domaines sans nécessité.

1. PRINCIPES DE TRAVAIL

Pour chaque tâche :

OBSERVE
↓
PLAN
↓
IMPLEMENT
↓
BUILD
↓
TEST
↓
RESPONSIVE
↓
ACCESSIBILITY
↓
PERFORMANCE
↓
REFACTOR
↓
VALIDATE

Ne jamais enchaîner plusieurs fonctionnalités sans passe de consolidation.

Une tâche n’est terminée que si elle est :

fonctionnelle ;

responsive ;

accessible ;

cohérente visuellement ;

typée ;

maintenable ;

sans duplication inutile ;

sans JavaScript inutile ;

performante ;

testée ;

build valide.

2. ARCHITECTURE À PRÉSERVER

Les décisions suivantes sont déjà validées et ne doivent pas être remises en cause sans preuve :

Astro reste la couche principale.

SSR Node reste actif.

output: 'server'.

@astrojs/node standalone.

Pas de migration statique pour résoudre un problème Hostinger.

Pas de React / Vue / Svelte sans besoin démontré.

HTML / CSS / Astro avant JavaScript.

JavaScript client ciblé uniquement.

GSAP / Lenis / OGL restent limités aux usages existants justifiés.

Responsive existant à préserver.

prefers-reduced-motion à préserver.

Routes SEO existantes à préserver sauf plan de migration explicite.

Pas de génération programmatique de pages ville × secteur.

Pas de nouvelle refonte globale de la homepage.

Pas de home-v4.css.

Pas de reconstruction du design system.

Pas de nouvelle dépendance sans justification.

3. TRAVAIL DÉJÀ EFFECTUÉ — NE PAS REFAIRE

Les phases précédentes ont déjà traité :

consolidation GSAP / ScrollTrigger ;

lifecycle motion ;

tokens motion ;

nettoyage des anciens scripts homepage ;

modularisation CSS homepage ;

repositionnement PME ;

refonte /services/ ;

refonte des 11 pages services ;

refonte /solutions/ ;

études de cas Nat et Patoune / Rikunali ;

refonte des pages secteurs ;

JSON-LD sur plusieurs routes ;

maillage interne commercial ;

headers de sécurité ;

endpoint contact ;

CI Astro / TypeScript / build ;

Dependabot.

Toute optimisation future doit partir de cet état.

4. ORDRE STRICT DU BACKLOG

Travaille dans cet ordre.

Ne commence pas une priorité inférieure tant qu’un P0 non bloqué reste ouvert.

PHASE A — P0 : RISQUE PUBLIC IMMÉDIAT

OPT-001 — Finaliser les pages légales

Fichiers principaux :

src/pages/mentions-legales.astro

src/pages/politique-de-confidentialite.astro

Objectif :

Supprimer tous les placeholders :

À COMPLÉTER

À VALIDER

AVANT MISE EN PRODUCTION

IMPORTANT :

Tu ne dois JAMAIS inventer :

raison sociale ;

forme juridique ;

adresse ;

IDE ;

TVA ;

registre du commerce ;

représentant légal ;

base juridique ;

durée de conservation ;

données de prestataires ;

informations réglementaires.

Si une information factuelle manque :

STOP sur cette sous-tâche.

Liste précisément les informations à fournir par le propriétaire.

Continue uniquement sur les parties qui peuvent être corrigées sans invention.

Definition of Done :

zéro placeholder public ;

contenu cohérent avec les traitements réellement actifs ;

Calendly documenté si utilisé ;

analytics documenté uniquement s’il est activé ;

formulaire de contact correctement décrit.

OPT-002 — Supprimer les claims commerciaux non étayés

Auditer au minimum :

src/pages/secteurs/artisans.astro

src/pages/secteurs/ecommerce.astro

toutes les pages commerciales contenant :

%

100 %

jamais

garanti

en tête

numéro 1

superlatifs absolus

Claims déjà identifiés :

« ne plus jamais manquer une opportunité de devis »

« 100 % indépendant »

« récupérer entre 5 et 15 % des ventes perdues »

Objectif :

Remplacer les garanties ou chiffres non démontrés par des formulations défendables.

Ne jamais inventer de source.

Definition of Done :

zéro métrique non sourcée ;

zéro garantie absolue non démontrable ;

aucun faux témoignage ;

aucun claim algorithmique garanti.

OPT-003 — Sécurité du dépôt public

Objectif :

Vérifier l’historique Git complet.

À faire si les outils locaux sont disponibles :

Gitleaks ou équivalent ;

scan de tout l’historique ;

recherche de :

SMTP credentials ;

API keys ;

GitHub tokens ;

private keys ;

anciens .env.

IMPORTANT :

Si un secret ancien est trouvé :

ne jamais l’afficher en clair dans le rapport ;

considérer le secret compromis ;

identifier le type et le commit concerné ;

recommander rotation/révocation ;

ne pas réécrire l’historique Git sans autorisation explicite.

OPT-007 — Hygiène du repo public

Corriger :

encodage / caractères NUL du README.md ;

documentation obsolète des routes ;

description actuelle du projet.

Ajouter seulement si pertinent :

SECURITY.md.

Licence :

Ne jamais choisir une licence à la place du propriétaire.

Si aucune licence n’existe :

signaler clairement la décision à prendre ;

ne pas ajouter MIT/Apache/GPL par défaut.

5. PHASE B — P1 : FIABILITÉ APPLICATIVE

OPT-004 — Renforcer /api/contact

Fichier :

src/pages/api/contact.ts

Conserver les protections existantes :

body limit ;

JSON validation ;

honeypot ;

validation email ;

validation URL ;

escaping HTML ;

timeouts SMTP ;

rate limiting.

Auditer :

fiabilité de clientAddress derrière Hostinger ;

rate limit en mémoire ;

CR/LF dans les champs utilisés dans les headers mail ;

validation Origin ;

création d’un transporter à chaque requête ;

tests automatisés.

Ne pas introduire Redis / DB / service externe sans nécessité démontrée.

Tester au minimum :

payload valide ;

mauvais content-type ;

payload > limite ;

honeypot ;

email invalide ;

URL invalide ;

CRLF ;

rate limit ;

SMTP absent ;

SMTP failure ;

succès.

OPT-005 — Pyramide de tests

Ajouter progressivement :

Static

lint TypeScript/Astro ;

vérification liens ;

vérification Markdown si utile.

Unit tests

Cibler d’abord :

validation formulaire ;

helpers SEO futurs ;

fonctions pures.

E2E

Routes minimales :

/

/services/

/solutions/

/contact/

une page service

une page secteur

une étude de cas

un article

404

Tester :

navigation ;

menu mobile ;

formulaire ;

fallback Calendly ;

reduced motion ;

erreurs console critiques.

Accessibilité

axe sur routes critiques.

Ne pas installer une stack de test inutilement lourde.

OPT-006 — Consentement / Analytics

Inspecter :

CookieBanner.astro

ConversionHub.astro

analytics.ts

Footer.astro

Layout.astro

PUBLIC_GTM_ID

Décider selon l’état réel :

CAS A — analytics activé

Mettre en place proprement :

consentement avant tracking ;

possibilité de modifier le choix ;

lien permanent « Gérer les cookies » ;

révocation réelle ;

politique de confidentialité cohérente.

CAS B — analytics non utilisé

laisser PUBLIC_GTM_ID vide ;

supprimer ou archiver le code dormant si cela simplifie réellement ;

retirer les domaines GTM de CSP seulement si aucune autre fonctionnalité ne les utilise.

Ne pas monter automatiquement :

chatbot ;

exit popup ;

scroll popup ;

WhatsApp widget ;
simplement parce qu’ils existent.

OPT-008 — SEO blog

Étendre proprement le modèle blog si nécessaire :

author ;

updatedDate ;

image ;

imageAlt ;

canonical ;

draft.

Ajouter aux articles :

og:type=article ;

published time ;

modified time ;

Article ou BlogPosting;

BreadcrumbList.

Ne pas casser les URLs existantes.

6. PHASE C — P2 : PERFORMANCE / MAINTENABILITÉ

OPT-009 — SEO helpers / sources uniques

Créer uniquement si cela réduit réellement la duplication :

src/data/company.ts

src/data/navigation.ts

src/lib/seo/schema.ts

src/lib/seo/meta.ts

Priorité de meta description :

prop explicite ;

défaut route ;

fallback global.

Ne pas faire de migration big-bang.

OPT-010 — Assets

Créer une cartographie :

asset
→ références
→ taille
→ hash
→ doublon éventuel

Identifier :

gros PNG ;

doublons exacts ;

vidéos sources ;

image OG.

Ne supprimer aucun asset avant preuve de non-utilisation.

Ne pas activer Git LFS sans vérifier Hostinger.

OPT-011 — Performance budgets

Établir une baseline avant d’imposer des seuils.

Mesurer routes critiques.

Vérifier :

LCP ;

CLS ;

INP si disponible ;

JS ;

CSS ;

images ;

vidéos ;

tiers ;

réseau lent ;

appareil lent.

Ajouter un budget CI uniquement après mesure réelle.

OPT-012 — CSP

Fichier :

src/middleware.ts

Objectif long terme :

réduire :

script-src 'unsafe-inline'

style-src 'unsafe-inline'

Mais :

Ne jamais casser Astro, Calendly ou analytics pour obtenir une CSP artificiellement stricte.

Procéder par inventaire et tests.

OPT-013 — Observabilité

Utiliser :

/api/health

Pour distinguer :

app runtime KO ;

SMTP KO ;

frontend KO ;

Hostinger routing KO.

Créer un runbook simple.

Ne jamais logger :

mot de passe ;

contenu complet du formulaire ;

données personnelles inutiles.

OPT-014 — Accessibilité

Automatiser Axe.

Tester :

clavier ;

focus ;

menu ;

formulaire ;

FAQ ;

overlays ;

Calendly fallback ;

consentement si activé ;

zoom ;

reduced motion.

Si Cookie Preferences devient un vrai modal :

focus trap ;

restoration focus ;

background inert si nécessaire.

OPT-015 — Supply chain GitHub

Évaluer :

GitHub Actions pinned by SHA ;

Dependency Review ;

CodeQL JS/TS ;

Secret Scanning ;

Push Protection.

Conserver des permissions minimales.

7. PHASE D — P3 : ENTRETIEN LONG TERME

Traiter ensuite :

archivage des anciens rapports dans docs/audits/;

snapshots visuels stables ;

audit automatique des claims ;

documentation d’architecture à jour.

8. CONTRAINTES UX / DESIGN

Toute modification doit conserver :

design system existant ;

couleurs existantes ;

typographie ;

spacing ;

responsive ;

structure visuelle ;

motion existant sauf tâche dédiée.

Ne jamais :

inventer un nouveau style ;

ajouter une couleur arbitraire ;

créer ButtonNew, CardV2, etc. ;

casser mobile pour optimiser desktop ;

dépendre uniquement du hover ;

retirer le focus visible.

Tester au minimum lorsque le composant est impacté :

320px

375px

390px

430px

768px

1024px

1280px

1440px

Et vérifier les largeurs intermédiaires.

9. DÉPENDANCES

Avant tout npm install :

Répondre explicitement :

Pourquoi cette dépendance est nécessaire ?

Astro / HTML / CSS / JS natif peut-il le faire ?

Quel poids ajoute-t-elle ?

Est-elle maintenue ?

Est-elle réellement utilisée ?

Aucun package « au cas où ».

10. FORMAT DE TRAVAIL OBLIGATOIRE

Pour chaque OPT :

Commence par produire :

Audit de la tâche

problème encore présent : OUI/NON

fichiers concernés

risque

approche minimale

dépendances nécessaires : OUI/NON

migrations nécessaires : OUI/NON

Puis :

Plan

Maximum 3 à 7 étapes.

Puis seulement :

Implémentation

Modifier le minimum de fichiers.

Ensuite :

Validation

Exécuter les commandes réellement disponibles et pertinentes.

Au minimum lorsqu’une modification applicative est effectuée :

npm run check
npm run build

Lorsque le script validate couvre correctement le périmètre :

npm run validate

Ajouter ensuite les tests spécifiques introduits par les nouvelles phases.

Enfin :

Rapport

Donner uniquement :

fichiers modifiés ;

problème corrigé ;

validations exécutées ;

résultats ;

dette restante ;

prochaine OPT recommandée.

Pas de long rapport narratif.

11. STOP CONDITIONS

Arrête l’implémentation et signale le blocage si :

une donnée juridique doit être inventée ;

un secret est trouvé et doit être révoqué ;

une modification destructive Git est nécessaire ;

un changement Hostinger/hPanel est requis mais inaccessible localement ;

une route SEO doit être supprimée ou redirigée ;

une nouvelle dépendance majeure semble nécessaire ;

une modification implique un changement de produit non décidé ;

une correction ne peut pas être reproduite.

Ne contourne jamais un blocage par une invention.

12. PREMIÈRE ACTION À EXÉCUTER

Commence uniquement par :

PHASE A / OPT-001

Inspecte les deux pages légales.

Liste précisément tous les placeholders et données manquantes.

Sépare :

ce qui peut être corrigé immédiatement ;

ce qui exige une donnée du propriétaire ;

ce qui dépend de l’activation future de GTM/analytics.

Ne modifie encore aucun contenu juridique factuel manquant.

Propose le patch minimal réalisable sans invention.

Attends uniquement si une information propriétaire est réellement indispensable.

Ne commence pas OPT-002 avant d’avoir terminé ou explicitement bloqué OPT-001.