# 🔍 Debug: Expense Not Adding Issue

## Quick Checks:

### 1. Are you running locally or on Vercel?

**If running locally (http://localhost:4200):**
- Make sure backend is running: `npm run dev` in Terminal 1
- Check if backend is accessible: Open http://localhost:3000 in browser
- Should see: `{"message":"Welcome to Expense Tracker API"}`

**If running on Vercel (deployed):**
- Need to update backend URL in `environment.prod.ts`
- Backend must be deployed on Railway/Render first

---

### 2. Check Browser Console for Errors

**Open Browser Console:**
1. Press **F12** (or Right-click → Inspect)
2. Click **"Console"** tab
3. Try adding an expense
4. Look for red error messages

**Common errors you might see:**
- `Failed to fetch` - Backend not running or wrong URL
- `CORS error` - Backend CORS not configured
- `404 Not Found` - Wrong API URL
- `Network Error` - Backend not accessible

---

### 3. Check Network Tab

1. Press **F12** → **"Network"** tab
2. Try adding an expense
3. Look for a request to `/api/expenses`
4. Check if it's:
   - **Red** = Failed
   - **Status 200** = Success
   - **Status 404** = Not found
   - **Status 500** = Server error

---

## 🔧 Quick Fixes:

### Fix 1: If Running Locally

**Make sure:**
1. Backend is running: `npm run dev` (Terminal 1)
2. Frontend is running: `npm start` (Terminal 2, in client folder)
3. Backend URL is: `http://localhost:3000/api/expenses`

**Test backend:**
- Open: http://localhost:3000/api/expenses
- Should see: `[]` (empty array) or list of expenses

---

### Fix 2: If Running on Vercel

**You need to:**
1. Deploy backend on Railway/Render first
2. Get your backend URL (e.g., `https://xxx.up.railway.app`)
3. Update `client/src/environments/environment.prod.ts`:
   ```typescript
   apiUrl: 'https://YOUR-ACTUAL-BACKEND-URL/api/expenses'
   ```
4. Commit and push
5. Redeploy on Vercel

---

## 🎯 Most Likely Issues:

1. **Backend not running** (if local)
2. **Wrong backend URL** (if deployed)
3. **CORS error** (backend not allowing frontend)
4. **Form validation failing** (check form fields)

---

## 📝 Tell Me:

1. **Where are you running the app?** (localhost:4200 or Vercel URL)
2. **What errors do you see in browser console?** (F12 → Console)
3. **Is backend running?** (if local)
4. **What's your backend URL?** (if deployed)

