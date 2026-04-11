# Projet Russell Marina - Gestion du Port

Bonjour ! Voici mon rendu pour le projet Russell Marina. C'est un outil complet qui permet au personnel du port de gérer les catways (pontons), les réservations des clients et les comptes utilisateurs.

## Ce que fait l'application (Fonctionnalités)
- **Tableau de bord** : Vue globale sur l'état du port et les réservations en cours.
- **Gestion des Catways** : Ajout, modification de l'état (bon, mauvais, etc.) et suppression.
- **Gestion des Réservations** : Planning complet lié aux catways.
- **Gestion des Utilisateurs** : Création et gestion des comptes administrateurs.
- **Documentation intégrée** : Une page dédiée à l'utilisation technique de l'API.

## Technologies utilisées
Pour ce projet, j'ai utilisé :
- **Node.js** pour l'environnement d'exécution.
- **Express** pour le serveur web et les routes.
- **MongoDB Atlas** (avec Mongoose) pour la base de données.
- **EJS** comme moteur de templates pour l'interface dynamique.
- **JWT & Cookies** pour sécuriser l'accès au tableau de bord.

## Prérequis
Avant de commencer, vous aurez besoin de :
- **Node.js** (recommandé v16 ou plus) installé sur votre machine.
- Un terminal.
- Une connexion internet (pour la base de données MongoDB Atlas).

## Installation et Lancement

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Configuration (.env)** :
   Créez un fichier `.env` à la racine (vous pouvez vous aider du `.env.example`). Il doit contenir :
   - `MONGODB_URI` : Lien de connexion MongoDB.
   - `JWT_SECRET` : Une clé secrète de votre choix pour les tokens.
   - `PORT` : 3000 par défaut.

3. **Lancement** :
   ```bash
   npm start
   ```

4. **Premier accès** :
   L'application crée automatiquement un compte de test si vous partez d'une base vide :
   - URL : `http://localhost:3000`
   - Identifiants par défaut : `admin@russell.com` / `admin123`

## Routes et Documentation
L'interface est accessible directement via le navigateur. Si vous souhaitez utiliser l'API REST avec un client comme Postman, vous trouverez tous les endpoints détaillés ici :
👉 [Documentation de l'API](http://localhost:3000/docs)

Les routes principales sont :
- `/dashboard` : Vue d'ensemble.
- `/catways-page` : Interface des catways.
- `/reservations-page` : Interface des réservations.
- `/users-page` : Interface des utilisateurs.

Merci d'avoir pris le temps de regarder mon projet ! :)
