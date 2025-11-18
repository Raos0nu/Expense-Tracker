# 🚀 Quick Deployment Guide

## Your Project is Ready for Vercel! ✅

All configuration files have been created and updated.

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Deploy Backend (Railway - 5 minutes)

1. Go to: https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub → Select **Expense-Tracker**
4. Add Environment Variable:
   - `MONGODB_URI` = `mongodb+srv://sonuyadav97297_db_user:Test1234@cluster0.0kisnzm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0`
5. **Copy your Railway URL** (e.g., `https://xxx.up.railway.app`)

### 2️⃣ Update Backend URL

Edit: `client/src/environments/environment.prod.ts`

Replace: `https://your-backend-url.railway.app/api/expenses`

With: `https://YOUR-ACTUAL-RAILWAY-URL/api/expenses`

### 3️⃣ Deploy Frontend (Vercel - 5 minutes)

1. Go to: https://vercel.com
2. Sign up with GitHub
3. New Project → Import **Expense-Tracker**
4. **IMPORTANT Settings:**
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/expense-tracker-client`
5. Click Deploy

**Done!** 🎉

---

## 📋 Detailed Instructions

See `VERCEL_DEPLOY.md` for complete step-by-step guide.

---

## 🔗 Your URLs After Deployment

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.up.railway.app`
- **GitHub**: https://github.com/Raos0nu/Expense-Tracker

---

**That's it! Your app will be live!** 🚀

