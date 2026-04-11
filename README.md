# Projet Russell Marina - API de gestion

Bonjour ! Voici mon rendu pour le devoir 5 (API REST). Le projet consiste en une API pour gérer les catways et les réservations du port Russell Marina. 

J'ai fait en sorte de bien séparer le code (Models, Services, Controllers) pour que ce soit propre et facile à maintenir.

## Comment lancer le projet chez vous

### 1. Installation des paquets
Une fois que vous avez récupéré le dossier, ouvrez un terminal dedans et installez les dépendances :
```bash
npm install
```

### 2. Variables d'environnement
Il vous faudra un fichier `.env` à la racine pour que l'app se connecte à votre base de données. Vous pouvez vous baser sur le fichier `.env.example`.
En gros, il faut ça :
- `PORT` : Le port que vous voulez (par défaut 3000)
- `MONGODB_URI` : L'adresse de votre instance MongoDB (locale ou Atlas)
- `JWT_SECRET` : Une phrase secrète pour sécuriser les tokens de connexion

### 3. Préparer les données (Seed)
Pour tester l'app facilement, j'ai créé un script qui remplit la base de données avec quelques catways et un compte admin. Lancez-le avec :
```bash
node seed.js
```
Une fois que c'est fait, vous pourrez vous connecter avec :
- **Email** : admin@russell.com
- **Mot de passe** : admin123

### 4. Lancer le serveur
Pour démarrer l'API :
```bash
npm start
```
Si vous voulez bosser dessus, il y a aussi `npm run dev` pour avoir le rechargement automatique.

---

## Utilisation et documentation
Une fois que le serveur tourne (sur http://localhost:3000 par défaut), vous pouvez voir la liste des points d'entrée de l'API directement ici :
**http://localhost:3000/docs.html**

J'y ai listé comment utiliser l'authentification, gérer les utilisateurs, les catways et les réservations. Tout est accessible depuis l'interface HTML dans le dossier public aussi.

