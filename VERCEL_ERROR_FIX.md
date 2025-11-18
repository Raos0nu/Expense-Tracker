# 🔧 Fix Vercel Error - Step by Step

## Current Error:
"Error creating expense. Check console for details. Make sure backend is running!"

## Root Cause:
The API is not working on Vercel. Most likely the `MONGODB_URI` environment variable is not set.

---

## ✅ FIX IT NOW - Follow These Steps:

### Step 1: Add Environment Variable (CRITICAL!)

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Click your project**: Expense-Tracker
3. **Settings** → **Environment Variables**
4. **Check if `MONGODB_URI` exists:**
   - If it exists: Click "Edit" and verify the value
   - If it doesn't exist: Click "Add New"

5. **Set the value:**
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://sonuyadav97297_db_user:Test1234@cluster0.0kisnzm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0`
   - **Environment**: ✅ Select **ALL** (Production, Preview, Development)

6. **Click "Save"**

---

### Step 2: Test API Endpoint

After adding the environment variable, test if API is working:

1. Go to: `https://your-app.vercel.app/api/test`
   - Should show: `{"message":"API is working!","env":"MongoDB URI is set"}`

2. Go to: `https://your-app.vercel.app/api/expenses`
   - Should show: `[]` (empty array) or list of expenses

**If you see errors:**
- Check Vercel Function Logs (see Step 3)

---

### Step 3: Check Function Logs

1. **Vercel Dashboard** → Your Project
2. **Functions** tab
3. Click on `api/expenses/index`
4. Click **"Logs"** tab
5. Look for errors:
   - `MONGODB_URI is not defined` → Add environment variable
   - `MongoDB connection error` → Check MongoDB Atlas settings
   - Other errors → Share the error message

---

### Step 4: Redeploy

After adding/updating environment variable:

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Wait for deployment to finish
4. Test again

---

## 🐛 Common Issues & Solutions:

### Issue 1: "MONGODB_URI is not defined"

**Solution**: Add the environment variable in Vercel (Step 1)

### Issue 2: "MongoDB connection error"

**Solutions**:
1. Verify MongoDB Atlas Network Access allows `0.0.0.0/0`
2. Check if password is correct in connection string
3. Verify database name is correct

### Issue 3: "Function timeout"

**Solution**: Check function logs for specific errors

### Issue 4: "404 Not Found" on API routes

**Solution**: 
- Verify Root Directory is set to `client` in Vercel
- Check that `api/` folder is in the root (not in client folder)

---

## ✅ Verification Checklist:

- [ ] `MONGODB_URI` environment variable is set in Vercel
- [ ] Environment variable is set for ALL environments
- [ ] Root Directory is set to `client` in Vercel
- [ ] Deployment completed successfully
- [ ] `/api/test` endpoint works
- [ ] `/api/expenses` endpoint works
- [ ] Can add expenses successfully

---

## 🎯 Quick Test:

1. **Test API**: `https://your-app.vercel.app/api/test`
2. **Test Expenses**: `https://your-app.vercel.app/api/expenses`
3. **Test in App**: Try adding an expense

**If all three work, your app is fully functional!** ✅

---

**Follow these steps and your app will work!** 🚀

