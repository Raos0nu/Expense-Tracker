# 🔧 Fix: Backend Connection Error

## Problem:
"Error creating expense. Check console for details. Make sure backend is running!"

## Solutions:

### For Localhost:

**Step 1: Make sure backend is running**

Open a **NEW terminal** and run:

```bash
cd "D:\Projects\Expenses tracker"
npm run dev
```

**You should see:**
- `Server is running on port 3000`
- `MongoDB connected successfully`

**If you see errors:**
- Check if port 3000 is already in use
- Check your internet connection (MongoDB Atlas needs internet)
- Verify `.env` file has correct `MONGODB_URI`

**Step 2: Test backend directly**

Open browser and go to: http://localhost:3000/api/expenses

**You should see:** `[]` (empty array) or list of expenses

**If you see error:** Backend is not running properly

---

### For Vercel:

**Step 1: Check Environment Variable**

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. **VERIFY** `MONGODB_URI` exists with correct value
4. Make sure it's set for **ALL environments**

**Step 2: Check Function Logs**

1. Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on `api/expenses/index`
4. Check **"Logs"** tab for errors

**Common Vercel errors:**
- `MONGODB_URI is not defined` → Add environment variable
- `MongoDB connection error` → Check MongoDB Atlas network access
- `Function timeout` → Check function logs

**Step 3: Test API directly**

Go to: `https://your-app.vercel.app/api/expenses`

**You should see:** `[]` or list of expenses

---

## Quick Fix Commands:

### Kill existing Node processes (if stuck):
```bash
taskkill /F /IM node.exe
```

### Start fresh:
```bash
# Terminal 1 - Backend
cd "D:\Projects\Expenses tracker"
npm run dev

# Terminal 2 - Frontend  
cd "D:\Projects\Expenses tracker\client"
npm start
```

---

## Debug Steps:

1. **Check browser console (F12)**:
   - Look for the exact error message
   - Check Network tab → Find `/api/expenses` request
   - See what status code it returns

2. **Check backend terminal**:
   - Look for error messages
   - Check if MongoDB connected

3. **Test API directly**:
   - http://localhost:3000/api/expenses (for localhost)
   - https://your-app.vercel.app/api/expenses (for Vercel)

---

## Most Common Issues:

1. **Backend not running** → Start it with `npm run dev`
2. **Wrong API URL** → Check environment files
3. **MongoDB connection failed** → Check `.env` file and internet
4. **CORS error** → Already handled, but check if backend is running
5. **Port already in use** → Kill existing process or change port

---

**Follow these steps and your app will work!** 🚀

