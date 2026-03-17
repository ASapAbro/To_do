# MyTasks - Application de Gestion de Tâches

Une application web full-stack moderne pour gérer vos tâches quotidiennes avec une interface élégante et intuitive.

![Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Présentation

MyTasks est une application de gestion de tâches complète permettant aux utilisateurs de :
- ✅ Créer, modifier et supprimer des tâches
- 📊 Suivre la progression avec des statistiques en temps réel
- ✓ Marquer les tâches comme complétées
- 🔐 Authentification sécurisée avec JWT
- 📱 Interface responsive adaptée à tous les appareils

## 🚀 Stack Technique

### Frontend
- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router v6** - Navigation et routing
- **Axios** - Client HTTP pour les requêtes API
- **Vite** - Build tool ultra-rapide
- **CSS3** - Stylisation avec variables CSS personnalisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT (jsonwebtoken)** - Authentification par token
- **bcryptjs** - Hachage des mots de passe
- **express-validator** - Validation des données
- **CORS** - Gestion des requêtes cross-origin
- **Swagger** - Documentation API automatique

## 📁 Structure du Projet

```
MyTasks/
├── backend/
│   ├── config/
│   │   └── db.js              # Configuration MongoDB
│   ├── middleware/
│   │   └── auth.js            # Middleware d'authentification JWT
│   ├── models/
│   │   ├── User.js            # Modèle utilisateur
│   │   └── Task.js            # Modèle tâche
│   ├── routes/
│   │   ├── auth.js            # Routes d'authentification
│   │   └── tasks.js           # Routes des tâches
│   ├── server.js              # Point d'entrée du serveur
│   ├── swagger.js             # Configuration Swagger
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── api.js         # Configuration Axios
    │   ├── components/
    │   │   ├── Toast.jsx      # Composant de notification
    │   │   └── Toast.css
    │   ├── hooks/
    │   │   └── useToast.js    # Hook personnalisé pour toasts
    │   ├── pages/
    │   │   ├── Login.jsx      # Page de connexion
    │   │   ├── Register.jsx   # Page d'inscription
    │   │   ├── Tasks.jsx      # Page principale des tâches
    │   │   └── Tasks.css
    │   ├── App.jsx            # Composant principal
    │   ├── App.css            # Styles globaux
    │   ├── main.jsx           # Point d'entrée React
    │   └── index.css          # Styles de base
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

## 🛠️ Installation

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou Atlas)
- npm ou yarn

### Configuration Backend

1. **Cloner le dépôt**
```bash
git clone https://github.com/ASapAbro/To_do.git
cd To_do
```

2. **Installer les dépendances backend**
```bash
cd backend
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` dans le dossier `backend` :
```env
PORT=5002
MONGO_URI=mongodb+srv://votre-uri-mongodb
JWT_SECRET=votre_secret_jwt_très_sécurisé
```

4. **Démarrer le serveur backend**
```bash
npm start
```
Le serveur démarre sur `http://localhost:5002`

### Configuration Frontend

1. **Installer les dépendances frontend**
```bash
cd ../frontend
npm install
```

2. **Démarrer le serveur de développement**
```bash
npm run dev
```
L'application démarre sur `http://localhost:5173`

## 🎨 Design & UX

### Palette de Couleurs
- **Thème** : Noir et blanc minimaliste
- **Typographie** : Police Inter de Google Fonts
- **Interface** : Design épuré et moderne

### Fonctionnalités UI/UX
- ✨ Animations fluides et transitions douces
- 🎯 Design centré sur l'essentiel
- 📊 Statistiques visuelles (total, actives, complétées, progression)
- 🔔 Notifications toast élégantes
- ⚡ États de chargement avec spinners
- ✓ Validation des formulaires en temps réel
- 📱 100% responsive

## 🔐 Sécurité

- Mots de passe hachés avec bcrypt (10 rounds de salt)
- Authentification JWT avec expiration (7 jours)
- Validation des entrées avec express-validator
- Protection CORS configurée
- Tokens stockés en localStorage

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Tâches (protégées par JWT)
- `GET /api/tasks` - Récupérer toutes les tâches
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Modifier une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

### Documentation API
Documentation Swagger disponible sur : `http://localhost:5002/api-docs`

## 🚀 Déploiement

**📘 [Guide de déploiement complet → DEPLOYMENT.md](DEPLOYMENT.md)**

### Quick Start Production

#### Backend sur Render
1. Créer un compte sur [Render.com](https://render.com)
2. Nouveau Web Service depuis le repo GitHub
3. Configurer les variables d'environnement (MONGO_URI, JWT_SECRET, CORS_ORIGIN)
4. Déployer automatiquement

#### Frontend sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd frontend
vercel --prod
```

**Variables d'environnement Vercel :**
- `VITE_API_URL` : URL de votre backend (ex: `https://mytasks-api.onrender.com/api`)

### Services Recommandés
- **Frontend** : Vercel (gratuit, CDN global, déploiement instantané)
- **Backend** : Render ou Railway (gratuit avec limitations)
- **Base de données** : MongoDB Atlas (gratuit jusqu'à 512MB)

### URLs de démo
- Frontend : `https://votre-app.vercel.app`
- Backend API : `https://votre-api.onrender.com`
- Documentation API : `https://votre-api.onrender.com/api-docs`

## 📦 Scripts Disponibles

### Backend
```bash
npm start          # Démarrer le serveur
npm run dev        # Mode développement avec nodemon
```

### Frontend
```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run preview    # Prévisualiser le build
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Abraham ADODOH**
- GitHub: [@ASapAbro](https://github.com/ASapAbro)
- Portfolio: [mon-port-folio-eosin.vercel.app](https://mon-port-folio-eosin.vercel.app/)

## 🙏 Remerciements

- Design inspiré par les meilleures pratiques modernes
- Icônes et émojis pour une touche visuelle
- Communauté React et Node.js

---

⭐ N'oubliez pas de mettre une étoile si ce projet vous a aidé !
