# 🚀 Guide de Déploiement en Production

Ce guide vous explique comment déployer MyTasks en production avec Vercel (frontend) et Render/Railway (backend).

## 📋 Vue d'ensemble

- **Frontend** : Déployé sur Vercel (gratuit, rapide, CDN global)
- **Backend** : Déployé sur Render ou Railway (gratuit avec limitations)
- **Base de données** : MongoDB Atlas (gratuit jusqu'à 512MB)

---

## 🗄️ Étape 1 : Configurer MongoDB Atlas

1. **Créer un compte** sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Créer un cluster gratuit** (M0)
   - Choisir un provider (AWS, Google Cloud, Azure)
   - Sélectionner une région proche de vous

3. **Configurer l'accès réseau**
   - Database Access → Add New Database User
   - Créer un utilisateur avec mot de passe
   - Network Access → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)

4. **Obtenir l'URI de connexion**
   - Clusters → Connect → Connect your application
   - Copier l'URI : `mongodb+srv://<username>:<password>@cluster.mongodb.net/`

---

## 🎨 Étape 2 : Déployer le Frontend sur Vercel

### Option A : Déploiement via Interface Web

1. **Aller sur [Vercel](https://vercel.com)** et se connecter avec GitHub

2. **Import Project**
   - Cliquer sur "Add New..." → "Project"
   - Sélectionner votre repo `To_do`
   - Choisir le dossier `frontend` comme Root Directory

3. **Configuration du Build**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Variables d'environnement** (Settings → Environment Variables)
   ```
   VITE_API_URL=https://votre-backend-url.onrender.com/api
   ```

5. **Déployer** → Cliquer sur "Deploy"

### Option B : Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis le dossier frontend
cd frontend
vercel

# Pour la production
vercel --prod
```

### Configuration après déploiement

1. Une fois déployé, notez l'URL de votre frontend
2. Mettez à jour l'URL de l'API dans le code

**Modifier `frontend/src/api/api.js` :**
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## ⚙️ Étape 3 : Déployer le Backend

### Option A : Render (Recommandé)

1. **Créer un compte sur [Render](https://render.com)**

2. **Créer un nouveau Web Service**
   - Dashboard → New → Web Service
   - Connecter votre repo GitHub `To_do`
   - Sélectionner la branche `main`

3. **Configuration**
   ```
   Name: mytasks-backend
   Region: Choisir le plus proche
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Variables d'environnement**
   ```
   PORT=5002
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/MyTask
   JWT_SECRET=votre_secret_jwt_super_securise_changez_moi
   NODE_ENV=production
   ```

5. **Créer le service** (gratuit avec 750h/mois)

6. **Configurer CORS** - L'URL de votre backend sera `https://mytasks-backend.onrender.com`

### Option B : Railway

1. **Créer un compte sur [Railway](https://railway.app)**

2. **New Project → Deploy from GitHub repo**

3. **Configuration**
   - Sélectionner `To_do` repo
   - Root Directory: `backend`
   - Start Command: `npm start`

4. **Variables d'environnement**
   ```
   PORT=5002
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=...
   NODE_ENV=production
   ```

5. **Générer un domaine**
   - Settings → Generate Domain

---

## 🔧 Étape 4 : Configuration CORS Backend

**Mettre à jour `backend/server.js` :**

```javascript
const cors = require('cors');

// Configuration CORS pour production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://votre-frontend.vercel.app'] 
    : ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Ou pour permettre toutes les origines (moins sécurisé mais plus simple) :
```javascript
app.use(cors());
```

---

## 🔗 Étape 5 : Connecter Frontend et Backend

1. **Dans Vercel**, ajouter la variable d'environnement :
   ```
   VITE_API_URL=https://mytasks-backend.onrender.com/api
   ```

2. **Redéployer le frontend** pour prendre en compte la nouvelle variable

3. **Tester** l'application sur l'URL Vercel

---

## ✅ Checklist de Déploiement

- [ ] MongoDB Atlas configuré et URI obtenu
- [ ] Backend déployé sur Render/Railway
- [ ] Variables d'environnement backend configurées
- [ ] CORS configuré avec l'URL du frontend
- [ ] URL backend notée
- [ ] Frontend déployé sur Vercel
- [ ] Variable VITE_API_URL configurée
- [ ] Test de connexion réussi
- [ ] Test de création de compte
- [ ] Test de création de tâche

---

## 🐛 Résolution des Problèmes Courants

### Erreur CORS
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution :** Vérifier la configuration CORS dans `server.js` et que l'URL du frontend est correcte.

### Erreur 500 sur l'API
**Solution :** Vérifier les logs du backend sur Render/Railway et vérifier que MongoDB est accessible.

### Variables d'environnement non prises en compte
**Solution :** 
- Vercel : Aller dans Settings → Environment Variables → Redéployer
- Render : Settings → Environment → Save Changes (redémarrage auto)

### MongoDB connection error
**Solution :** 
- Vérifier que l'IP `0.0.0.0/0` est autorisée dans MongoDB Atlas
- Vérifier que l'URI contient le bon username/password
- Vérifier que le cluster est actif

---

## 📊 Monitoring

### Vercel
- Analytics : Performance et usage
- Logs : Runtime logs en temps réel

### Render
- Logs : Disponibles dans le dashboard
- Metrics : CPU, Memory usage

### MongoDB Atlas
- Metrics : Connections, Operations
- Alertes : Configurer des alertes email

---

## 💰 Coûts

### Plan Gratuit (Hobby)
- **Vercel** : Gratuit (limité à 100GB bandwidth/mois)
- **Render** : Gratuit (750h/mois, dort après 15min d'inactivité)
- **MongoDB Atlas** : Gratuit (512MB storage)

### Pour éviter que Render ne dorme
Utilisez un service de ping comme [UptimeRobot](https://uptimerobot.com) pour garder l'API active.

---

## 🔐 Sécurité en Production

### À faire absolument :
1. **Changer JWT_SECRET** pour une valeur aléatoire et longue
2. **Limiter CORS** aux domaines autorisés uniquement
3. **HTTPS** uniquement (automatique avec Vercel et Render)
4. **Rate limiting** pour les endpoints sensibles
5. **Logs** : Monitorer les erreurs

### À ne pas faire :
- ❌ Commiter les fichiers .env
- ❌ Utiliser des secrets faibles
- ❌ Autoriser tous les CORS en production sans raison
- ❌ Logger les informations sensibles

---

## 🎯 Commandes Utiles

### Mettre à jour le déploiement
```bash
# Frontend (Vercel)
cd frontend
vercel --prod

# Backend (Git push suffit avec Render/Railway)
git add .
git commit -m "Update backend"
git push
```

### Voir les logs
```bash
# Vercel
vercel logs

# Render - Depuis le dashboard
# Railway - Depuis le dashboard
```

---

## 📱 Domaine Personnalisé (Optionnel)

### Vercel
- Settings → Domains → Add Domain
- Suivre les instructions DNS

### Render
- Settings → Custom Domain
- Ajouter CNAME vers votre domaine

---

Votre application est maintenant en production ! 🚀

**URLs d'exemple :**
- Frontend : https://mytasks.vercel.app
- Backend : https://mytasks-backend.onrender.com
- API Docs : https://mytasks-backend.onrender.com/api-docs
