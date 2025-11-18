# 🚀 Deployment Guide - Expense Tracker

## 📋 Overview

Your MEAN stack app has **two parts**:
1. **Frontend (Angular)** - Can deploy on Vercel
2. **Backend (Node.js/Express)** - Needs a Node.js hosting platform

---

## 🎯 Recommended: Deploy Backend on Railway (Free & Easy)

### Step 1: Deploy Backend on Railway

1. **Go to Railway**: https://railway.app
2. **Sign up** with GitHub
3. Click **"New Project"**
4. Click **"Deploy from GitHub repo"**
5. Select your **Expense-Tracker** repository
6. Railway will detect it's a Node.js app
7. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string (from .env file)
8. Click **"Deploy"**
9. Wait for deployment (2-3 minutes)
10. Railway will give you a URL like: `https://your-app.railway.app`

### Step 2: Update Frontend API URL

After backend is deployed, update the API URL in your frontend:

**File**: `client/src/app/services/expense.service.ts`

Change line 10 from:
```typescript
private apiUrl = 'http://localhost:3000/api/expenses';
```

To:
```typescript
private apiUrl = 'https://your-app.railway.app/api/expenses';
```
(Replace `your-app.railway.app` with your actual Railway URL)

### Step 3: Deploy Frontend on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up** with GitHub
3. Click **"New Project"**
4. Import your **Expense-Tracker** repository
5. **Root Directory**: Set to `client`
6. **Build Command**: `npm run build` or `ng build`
7. **Output Directory**: `dist/expense-tracker-client`
8. **Install Command**: `npm install`
9. Click **"Deploy"**

---

## 🔄 Alternative: Deploy Backend on Render (Free Tier)

### Step 1: Deploy Backend on Render

1. **Go to Render**: https://render.com
2. **Sign up** with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your **Expense-Tracker** repository
5. Fill in:
   - **Name**: `expense-tracker-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (root)
6. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
7. Click **"Create Web Service"**
8. Wait for deployment
9. Get your URL: `https://your-app.onrender.com`

### Step 2 & 3: Same as Railway above

---

## ⚙️ Alternative: Deploy Everything on Vercel (Serverless)

This requires converting your backend to serverless functions. More complex but doable.

### Step 1: Create Vercel Serverless Functions

Create `api/expenses.js`:

```javascript
const express = require('express');
const app = express();

// Your routes here
app.get('/api/expenses', (req, res) => {
  // Your expense logic
});

module.exports = app;
```

### Step 2: Update vercel.json

The `vercel.json` file is already created for you.

---

## 📝 Quick Deployment Checklist

### Backend Deployment:
- [ ] Deploy backend on Railway/Render
- [ ] Add `MONGODB_URI` environment variable
- [ ] Test backend API: `https://your-backend-url/api/expenses`
- [ ] Copy backend URL

### Frontend Deployment:
- [ ] Update `expense.service.ts` with backend URL
- [ ] Build Angular app: `cd client && npm run build`
- [ ] Deploy on Vercel
- [ ] Test frontend connects to backend

---

## 🔧 Environment Variables Needed

### Backend (Railway/Render):
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `PORT` - Usually auto-set by platform

### Frontend (Vercel):
- No environment variables needed (URL is hardcoded in service)

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Backend already has CORS enabled. Make sure backend URL is correct.

### Issue: API Not Found
**Solution**: Check that backend is deployed and running. Test the URL in browser.

### Issue: MongoDB Connection Failed
**Solution**: 
- Check `MONGODB_URI` is set correctly in Railway/Render
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Issue: Frontend Shows Blank Page
**Solution**: 
- Check browser console for errors
- Verify API URL in `expense.service.ts` is correct
- Make sure backend is accessible

---

## 📚 Useful Links

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Vercel**: https://vercel.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## ✅ Success Indicators

**Backend is working when:**
- You can access: `https://your-backend-url/` and see: `{"message":"Welcome to Expense Tracker API"}`
- You can access: `https://your-backend-url/api/expenses` and see expenses array

**Frontend is working when:**
- You can access your Vercel URL
- You see the Expense Tracker UI
- You can add/edit/delete expenses (connected to backend)

---

**Good luck with deployment! 🚀**


