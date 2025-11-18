# 🔧 Fix for Vercel Build Error

## Problem:
```
sh: line 1: ng: command not found
Error: Command "npm run build" exited with 127
```

## Solution:

The issue is that Vercel needs to be configured to use the `client` folder as the root directory.

### Option 1: Configure in Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Go to **"General"** section
4. Find **"Root Directory"**
5. Click **"Edit"**
6. Enter: `client`
7. Click **"Save"**

### Option 2: Update vercel.json (Already Done)

I've updated `vercel.json` with the correct build commands. Now you need to:

1. **Commit and push the changes:**
```bash
git add vercel.json
git commit -m "Fix Vercel build configuration"
git push
```

2. **Redeploy on Vercel:**
   - Go to Vercel dashboard
   - Click "Redeploy" on your latest deployment
   - OR push again to trigger automatic deployment

### Option 3: Manual Vercel Settings

When importing/editing the project on Vercel:

**Project Settings:**
- **Root Directory**: `client` ⚠️ **MUST BE SET!**
- **Framework Preset**: Other (or leave blank)
- **Build Command**: `npm run build` (or leave blank, vercel.json handles it)
- **Output Directory**: `dist/expense-tracker-client` (or leave blank)
- **Install Command**: `npm install` (or leave blank)

---

## ✅ After Fixing:

1. Vercel will install dependencies in `client` folder
2. Angular CLI will be available
3. Build will succeed
4. Your app will deploy!

---

## 🎯 Quick Fix Steps:

1. **In Vercel Dashboard:**
   - Settings → General → Root Directory → Set to `client`
   - Save

2. **OR commit the updated vercel.json:**
   ```bash
   git add vercel.json
   git commit -m "Fix Vercel build"
   git push
   ```

3. **Redeploy** (automatic on push, or manual redeploy)

---

**The key is setting Root Directory to `client` in Vercel settings!** 🎯

