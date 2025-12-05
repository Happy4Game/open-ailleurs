# Open ailleurs — Plateforme NIRD (Numérique Inclusif, Responsable et Durable)

Open ailleurs est une application Web pédagogique et ludique conçue pour aider les établissements scolaires (élèves, enseignants, familles, collectivités) à réduire leurs dépendances numériques et à entrer progressivement dans la démarche NIRD. L'objectif est de rendre l'École plus autonome, résiliente et créative face aux écosystèmes fermés et aux dépendances des grandes plateformes.

## Présentation du projet

Face à la fin du support de systèmes propriétaires et à la multiplication des verrous (licences coûteuses, stockage hors UE, matériel rendu obsolète, abonnements indispensables), la démarche NIRD propose une alternative pratique : un Numérique Inclusif, Responsable et Durable. Open ailleurs illustre et facilite cette démarche en proposant des parcours, outils et ressources pour accompagner les équipes éducatives.

L'application vise à :
- Expliquer concrètement comment réduire les dépendances numériques d'un établissement.
- Proposer des actions progressives, réalistes et mesurables.
- Valoriser des solutions libres, respectueuses des données et durables.
- Faire grandir une communauté contributive autour de la démarche NIRD.

## Ce que propose l'application

- Un parcours interactif et scénarisé (mécaniques de choix, petits défis, énigmes pédagogiques).
- Une interface ludique de type « faux poste de travail » pour simuler des usages et des alternatives.
- Des démonstrations récréatives (ex. mini-jeu) pour capter l'attention et rendre l'apprentissage attractif.
- Une bibliothèque de ressources et de liens vers des solutions libres et responsables.
- Des formats modulaires permettant aux établissements de s'engager progressivement.

## Fichiers et architecture (points d'entrée)

- Entrée de l'application : src/main.tsx
- Composant principal : src/App.tsx
- Parcours interactif : src/components/complicated-form/ComplicatedForm.tsx et les dossiers animations/ et mondes/
- Faux OS (interface simulée) : src/components/fake-os/
- Mini-jeu : src/components/snake/
- Composants généraux : src/components/Header.tsx et src/components/Footer.tsx

## Installation et développement local

1. Installer les dépendances :

	npm install

2. Lancer le serveur de développement :

	npm run dev

3. Construire pour la production :

	npm run build

Remarque : le fichier de configuration Vite peut définir un paramètre base si vous déployez sur un sous-chemin.

## Déploiement

Le site doit être mis en ligne pour l'évaluation finale. Vous pouvez utiliser un hébergeur de sites statiques (GitHub Pages, Netlify, Vercel, Surge, etc.). Vérifiez que toutes les ressources (images, polices) sont bien incluses et que les routes fonctionnent selon le paramètre `base` si nécessaire.

## Licence et ressources

Le projet est distribué sous licence libre (voir le fichier LICENSE). Toutes les ressources utilisées doivent être libres de droit.

## Contribution

- Pour ajouter ou modifier les étapes du parcours : modifier les fichiers du dossier src/components/complicated-form/mondes/
- Pour ajouter des liens ou ressources : mettre à jour src/components/complicated-form/appLinks.ts
- Pour ajouter des animations : créer un nouveau composant dans src/components/complicated-form/animations/ et l'importer dans le parcours

## Bonnes pratiques pour la Nuit de l'Info

- Assurez-vous que l'application est accessible en ligne avant la fin de la Nuit pour l'évaluation.
- Utilisez uniquement des ressources libres de droit.
- Documentez les contributions et indiquez clairement les auteurs dans le dépôt.

Bonne Nuit de l'Info 2025 — amusez-vous en renforçant la résilience numérique des établissements !
