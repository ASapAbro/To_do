# 🚀 Guide Rapide de Déploiement Vercel

## Déployer en 5 minutes

### 1. Préparer MongoDB Atlas (2 min)
```
1. Aller sur mongodb.com/cloud/atlas
2. Créer un cluster gratuit M0
3. Créer un utilisateur + autoriser 0.0.0.0/0
4. Copier l'URI de connexion
```

### 2. Déployer le Backend sur Render (2 min)
```
1. Aller sur render.com
2. New → Web Service → Connecter GitHub
3. Sélectionner le repo "To_do"
4. Configuration :
   - Root Directory: backend
   - Build: npm install
   - Start: npm start
5. Variables d'environnement :
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=un_secret_tres_long_et_securise
   CORS_ORIGIN=https://votre-app.vercel.app
   NODE_ENV=production
```

### 3. Déployer le Frontend sur Vercel (1 min)

#### Option A : Interface Web (Plus Simple)
```
1. Aller sur vercel.com
2. New Project → Import Git Repository
3. Sélectionner "To_do"
4. Root Directory: frontend
5. Framework: Vite
6. Variable d'environnement :
   VITE_API_URL=https://votre-backend.onrender.com/api
7. Deploy
```

#### Option B : CLI (Plus Rapide)
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis le frontend
cd frontend
vercel

# Ajouter variable d'environnement
vercel env add VITE_API_URL production
# Entrer : https://votre-backend.onrender.com/api

# Déployer en production
vercel --prod
```

### 4. Mettre à jour le CORS
```
1. Retourner sur Render
2. Aller dans Environment
3. Mettre à jour CORS_ORIGIN avec l'URL Vercel
4. Sauvegarder (redémarrage automatique)
```

### 5. Tester 🎉
```
1. Ouvrir l'URL Vercel
2. Créer un compte
3. Créer une tâche
4. ✅ C'est en ligne !
```

## 📝 Commandes Utiles

### Redéployer après modifications
```bash
# Commit et push (Render se redéploie auto)
git add .
git commit -m "Update"
git push

# Redéployer Vercel
cd frontend
vercel --prod
```

### Voir les logs
```bash
# Vercel
vercel logs

# Render : depuis le dashboard
```

## ⚠️ Checklist

- [ ] MongoDB Atlas configuré
- [ ] Backend déployé sur Render
- [ ] Variables d'environnement backend OK
- [ ] Frontend déployé sur Vercel  
- [ ] Variable VITE_API_URL configurée
- [ ] CORS mis à jour avec URL Vercel
- [ ] Test de connexion réussi
- [ ] Test création tâche OK

## 🆘 Problèmes Courants

**CORS Error ?**
→ Vérifier CORS_ORIGIN dans Render = URL Vercel exacte

**500 Error ?**
→ Vérifier les logs Render + MONGO_URI

**Frontend ne charge pas ?**
→ Vérifier VITE_API_URL dans Vercel

## 🎯 URLs Finales

- **Frontend** : https://votre-app.vercel.app
- **Backend** : https://votre-backend.onrender.com
- **API Docs** : https://votre-backend.onrender.com/api-docs

---

**Plus de détails** → Voir [DEPLOYMENT.md](DEPLOYMENT.md)
