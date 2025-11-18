# 🚀 Deploy Expense Tracker on Vercel - Step by Step

## ✅ Your Project is Now Ready for Vercel!

I've configured your project for Vercel deployment. Here's what was changed:

### Changes Made:
1. ✅ Updated `vercel.json` - Proper Angular build configuration
2. ✅ Created environment files - For API URL configuration
3. ✅ Updated expense service - Now uses environment variables
4. ✅ Configured Angular build - Production environment setup

---

## 📋 Deployment Steps

### Step 1: Deploy Backend First (Railway or Render)

**You MUST deploy the backend first!** The frontend needs the backend URL.

#### Option A: Railway (Recommended - Free)

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select: **Raos0nu/Expense-Tracker**
5. Add Environment Variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://sonuyadav97297_db_user:Test1234@cluster0.0kisnzm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0`
6. Wait for deployment (2-3 minutes)
7. **Copy your Railway URL** (e.g., `https://your-app.up.railway.app`)

#### Option B: Render (Free Tier)

1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect: **Raos0nu/Expense-Tracker**
5. Settings:
   - **Name**: `expense-tracker-api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://sonuyadav97297_db_user:Test1234@cluster0.0kisnzm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0`
7. Click "Create Web Service"
8. **Copy your Render URL** (e.g., `https://your-app.onrender.com`)

---

### Step 2: Update Environment File with Backend URL

**After you get your backend URL, update this file:**

**File**: `client/src/environments/environment.prod.ts`

Replace `https://your-backend-url.railway.app` with your actual backend URL:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-ACTUAL-BACKEND-URL/api/expenses'
};
```

**Example:**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://expense-tracker-production.up.railway.app/api/expenses'
};
```

---

### Step 3: Commit and Push Changes to GitHub

**Run these commands:**

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

---

### Step 4: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. Click **"Add New..."** → **"Project"**
4. **Import Git Repository**: Select **Raos0nu/Expense-Tracker**
5. **Configure Project**:
   - **Framework Preset**: Other (or leave blank)
   - **Root Directory**: `client` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/expense-tracker-client`
   - **Install Command**: `npm install`
6. **Environment Variables** (Optional - if you want to use Vercel env vars):
   - **Key**: `NG_APP_API_URL`
   - **Value**: `https://your-backend-url/api/expenses`
7. Click **"Deploy"**

---

### Step 5: Wait for Deployment

- Vercel will build your Angular app (takes 2-3 minutes)
- You'll see build logs in real-time
- When done, you'll get a URL like: `https://expense-tracker.vercel.app`

---

### Step 6: Test Your App

1. Open your Vercel URL
2. You should see your Expense Tracker app
3. Try adding an expense
4. It should connect to your backend and save to MongoDB!

---

## ⚙️ Vercel Configuration Summary

**What Vercel will do:**
- ✅ Build Angular app from `client` folder
- ✅ Run `npm install` in client folder
- ✅ Run `npm run build` to create production build
- ✅ Serve files from `dist/expense-tracker-client`
- ✅ Handle routing with rewrites to `index.html`

---

## 🔧 Troubleshooting

### Issue: Build Fails on Vercel

**Check:**
- Root Directory is set to `client`
- Build Command: `npm run build`
- Output Directory: `dist/expense-tracker-client`

### Issue: App Shows but Can't Connect to Backend

**Check:**
- Backend is deployed and running
- Backend URL in `environment.prod.ts` is correct
- Backend URL doesn't have `/api/expenses` at the end (service adds it)
- CORS is enabled on backend (already done)

### Issue: Blank Page

**Check:**
- Browser console (F12) for errors
- Network tab to see if API calls are failing
- Backend URL is accessible

---

## 📝 Important Notes

1. **Backend MUST be deployed first** - Frontend needs backend URL
2. **Update environment.prod.ts** with your actual backend URL
3. **Root Directory must be `client`** in Vercel settings
4. **Backend and Frontend are separate** - They run on different URLs

---

## 🎯 Quick Checklist

- [ ] Backend deployed on Railway/Render
- [ ] Backend URL copied
- [ ] `environment.prod.ts` updated with backend URL
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel project created
- [ ] Root Directory set to `client`
- [ ] Build settings configured
- [ ] Deployment successful
- [ ] App tested and working

---

## 🎉 Success!

Once deployed, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app` (or Render)
- **Database**: MongoDB Atlas (cloud)

**Your Expense Tracker is now live on the internet!** 🚀

---

## 📚 Files Changed for Vercel

- ✅ `vercel.json` - Vercel configuration
- ✅ `client/src/environments/environment.ts` - Development config
- ✅ `client/src/environments/environment.prod.ts` - Production config
- ✅ `client/src/app/services/expense.service.ts` - Uses environment
- ✅ `client/angular.json` - Production build config

---

**Need help? Check the build logs on Vercel dashboard!**

