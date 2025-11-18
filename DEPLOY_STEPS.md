# 🚀 Simple Deployment Steps

## Problem:
Vercel is showing "Not Found" because it doesn't know how to handle your MEAN stack app.

## Solution:
Deploy backend and frontend separately.

---

## 📦 STEP 1: Deploy Backend on Railway (5 minutes)

### 1. Go to Railway
Visit: https://railway.app

### 2. Sign Up
- Click "Start a New Project"
- Sign up with GitHub (easiest)

### 3. Deploy from GitHub
- Click "Deploy from GitHub repo"
- Select your **Expense-Tracker** repository
- Railway will auto-detect it's Node.js

### 4. Add Environment Variable
- Click on your project
- Go to "Variables" tab
- Click "New Variable"
- **Name**: `MONGODB_URI`
- **Value**: `mongodb+srv://sonuyadav97297_db_user:Test1234@cluster0.0kisnzm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0`
- Click "Add"

### 5. Get Your Backend URL
- Go to "Settings" tab
- Scroll to "Domains"
- You'll see a URL like: `https://your-app.up.railway.app`
- **COPY THIS URL** - You'll need it!

### 6. Test Backend
- Open the URL in browser
- You should see: `{"message":"Welcome to Expense Tracker API"}`
- Try: `https://your-backend-url/api/expenses`

✅ **Backend Done!**

---

## 🎨 STEP 2: Update Frontend API URL

### 1. Open the file:
`client/src/app/services/expense.service.ts`

### 2. Find line 10:
```typescript
private apiUrl = 'http://localhost:3000/api/expenses';
```

### 3. Replace with your Railway URL:
```typescript
private apiUrl = 'https://your-app.up.railway.app/api/expenses';
```
(Replace `your-app.up.railway.app` with your actual Railway URL!)

### 4. Save the file

✅ **Frontend Updated!**

---

## 🌐 STEP 3: Deploy Frontend on Vercel (5 minutes)

### 1. Go to Vercel
Visit: https://vercel.com

### 2. Sign Up
- Sign up with GitHub

### 3. Import Project
- Click "Add New..." → "Project"
- Import your **Expense-Tracker** repository

### 4. Configure Project
**IMPORTANT SETTINGS:**
- **Root Directory**: Click "Edit" → Select `client`
- **Framework Preset**: Angular
- **Build Command**: `npm run build`
- **Output Directory**: `dist/expense-tracker-client`
- **Install Command**: `npm install`

### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes

### 6. Get Your Frontend URL
- Vercel will give you a URL like: `https://your-app.vercel.app`

✅ **Frontend Done!**

---

## ✅ STEP 4: Test Everything

1. Open your Vercel URL
2. You should see your Expense Tracker app
3. Try adding an expense
4. It should save to your MongoDB database!

---

## 🎉 Success!

Your app is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.up.railway.app`

---

## ⚠️ If Something Doesn't Work:

### Backend not responding?
- Check Railway logs (Railway dashboard → Deployments → View logs)
- Make sure `MONGODB_URI` environment variable is set correctly

### Frontend can't connect to backend?
- Check browser console (F12) for errors
- Make sure API URL in `expense.service.ts` matches your Railway URL
- Make sure Railway backend is running (green status)

### CORS errors?
- Backend already has CORS enabled, should work fine
- If not, check Railway allows your Vercel domain

---

**That's it! Your app should be working now! 🚀**


