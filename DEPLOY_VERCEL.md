# 🚀 Déploiement Backend + Frontend sur Vercel

## ✅ Backend déjà configuré !
Le backend est maintenant compatible avec Vercel serverless.

## 📋 Étapes de Déploiement

### 1️⃣ Déployer le Backend

**Aller sur** → https://vercel.com/new

1. **Import Git Repository**
   - Sélectionner votre repo : `ASapAbro/To_do`
   - Cliquer sur **Import**

2. **Configuration du Backend**
   - **Project Name** : `mytasks-backend` (ou autre nom)
   - **Framework Preset** : Other
   - **Root Directory** : `backend` ⚠️ IMPORTANT
   - Cliquer sur **Edit** à côté de Root Directory et sélectionner `backend`

3. **Variables d'Environnement** 
   Cliquer sur **Environment Variables** et ajouter :
   
   ```
   MONGO_URI = votre_uri_mongodb_atlas
   JWT_SECRET = un_secret_tres_long_et_securise_minimum_32_caracteres
   CORS_ORIGIN = https://mytasks-frontend.vercel.app
   NODE_ENV = production
   ```
   
   ⚠️ Pour CORS_ORIGIN, mettez temporairement `*` puis vous le changerez après avoir déployé le frontend

4. **Deploy** 🚀
   - Cliquer sur **Deploy**
   - Attendre 1-2 minutes
   - ✅ Noter l'URL générée (ex: `https://mytasks-backend.vercel.app`)

### 2️⃣ Déployer le Frontend

**Retour sur** → https://vercel.com/new

1. **Import le même repo**
   - Sélectionner `ASapAbro/To_do` à nouveau
   - Cliquer sur **Import**

2. **Configuration du Frontend**
   - **Project Name** : `mytasks-frontend` (ou autre nom)
   - **Framework Preset** : Vite
   - **Root Directory** : `frontend` ⚠️ IMPORTANT
   - Cliquer sur **Edit** et sélectionner `frontend`

3. **Variable d'Environnement**
   ```
   VITE_API_URL = https://mytasks-backend.vercel.app/api
   ```
   ⚠️ Remplacer par l'URL réelle du backend (étape 1.4)

4. **Deploy** 🚀
   - Cliquer sur **Deploy**
   - Attendre 1-2 minutes
   - ✅ Noter l'URL générée (ex: `https://mytasks-frontend.vercel.app`)

### 3️⃣ Mettre à Jour le CORS

**Important** : Maintenant que vous avez l'URL du frontend, mettez à jour le backend !

1. Aller sur le **dashboard du backend** sur Vercel
2. **Settings** → **Environment Variables**
3. Modifier `CORS_ORIGIN` :
   ```
   CORS_ORIGIN = https://mytasks-frontend.vercel.app
   ```
   (Remplacer par votre vraie URL frontend)
4. Aller dans **Deployments** → **Plus récent** → **⋯** → **Redeploy**

### 4️⃣ Tester 🎉

1. Ouvrir l'URL du frontend
2. Créer un compte
3. Ajouter une tâche
4. ✅ **Tout fonctionne !**

## 🔗 URLs Importantes

- **Frontend** : https://mytasks-frontend.vercel.app
- **Backend API** : https://mytasks-backend.vercel.app/api
- **Swagger Docs** : https://mytasks-backend.vercel.app/api-docs

## ⚙️ MongoDB Atlas

Si vous n'avez pas encore MongoDB Atlas :

1. **Aller sur** → https://mongodb.com/cloud/atlas
2. **Sign Up** (gratuit)
3. **Créer un Cluster M0** (gratuit)
4. **Database Access** → Create User (username + password)
5. **Network Access** → Add IP : `0.0.0.0/0` (permettre tous)
6. **Databases** → Connect → Copier l'URI
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/MyTask?retryWrites=true&w=majority
   ```
7. Coller cette URI dans `MONGO_URI` sur Vercel

## 🆘 Dépannage

**CORS Error** ?
→ Vérifier que CORS_ORIGIN correspond exactement à l'URL frontend

**500 Internal Server Error** ?
→ Vérifier les logs du backend sur Vercel : Dashboard → Deployments → Logs

**Frontend ne charge pas** ?
→ Vérifier VITE_API_URL dans les variables d'environnement

**Cannot connect to MongoDB** ?
→ Vérifier MONGO_URI et Network Access (0.0.0.0/0)

## 🔄 Redéploiement

**Après avoir modifié le code :**

```bash
git add .
git commit -m "Update"
git push
```

Vercel redéploiera automatiquement les deux projets ! ⚡

## 📍 Résumé

✅ Backend configuré pour Vercel serverless (api/index.js)
✅ Frontend configuré avec vercel.json
✅ 2 projets séparés sur Vercel (backend + frontend)
✅ Variables d'environnement configurées
✅ CORS configuré
✅ Déploiement continu activé (auto-deploy on push)

**Bon déploiement !** 🚀
