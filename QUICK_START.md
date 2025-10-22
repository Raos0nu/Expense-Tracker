# Quick Start Guide - Expense Tracker

## 🚀 How to Run Your App Anytime

### Option 1: Using VS Code (Recommended)

#### Step 1: Open Project in VS Code
1. Open **VS Code**
2. Click **File → Open Folder**
3. Navigate to: `D:\Projects\Expenses tracker`
4. Click **Select Folder**

#### Step 2: Open Two Terminals
1. Press **Ctrl + `** (backtick) to open terminal
2. Click the **"+"** icon to open a second terminal
3. You should see **Terminal 1** and **Terminal 2** tabs

#### Step 3: Start Backend (Terminal 1)
```bash
npm run dev
```
✅ Wait for: `Server is running on port 3000` and `MongoDB connected successfully`

#### Step 4: Start Frontend (Terminal 2)
```bash
cd client
npm start
```
✅ Wait for: `Compiled successfully` and `Angular Live Development Server is listening on localhost:4200`

#### Step 5: Open in Browser
Go to: **http://localhost:4200**

---

### Option 2: Using Two Separate Command Prompts/PowerShell

#### Command Prompt/PowerShell 1 (Backend):
```bash
cd "D:\Projects\Expenses tracker"
npm run dev
```

#### Command Prompt/PowerShell 2 (Frontend):
```bash
cd "D:\Projects\Expenses tracker\client"
npm start
```

Then open browser: **http://localhost:4200**

---

## 🛑 How to Stop the Application

### In VS Code or Terminal:
- **Backend**: Click on Terminal 1, press **Ctrl + C**
- **Frontend**: Click on Terminal 2, press **Ctrl + C**

---

## ⚠️ Troubleshooting - Common Issues

### Issue 1: "Port 3000 already in use"

**Solution A - Kill the process (Windows):**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```
Replace `<PID_NUMBER>` with the actual PID shown.

**Solution B - Use a different port:**
1. Open `.env` file
2. Change `PORT=3000` to `PORT=3001`
3. Restart backend

---

### Issue 2: "Port 4200 already in use"

**Kill the Angular process:**
```bash
netstat -ano | findstr :4200
taskkill /PID <PID_NUMBER> /F
```

---

### Issue 3: "MongoDB connection error"

**Check your internet connection** (you're using MongoDB Atlas cloud database)

If still not working:
1. Go to https://cloud.mongodb.com/
2. Click **Network Access** (left sidebar)
3. Make sure `0.0.0.0/0` is in the IP Access List
4. Wait 2 minutes and try again

---

### Issue 4: "Module not found" or "Cannot find package"

**Reinstall dependencies:**

**Backend:**
```bash
cd "D:\Projects\Expenses tracker"
npm install
```

**Frontend:**
```bash
cd "D:\Projects\Expenses tracker\client"
npm install
```

---

### Issue 5: Frontend shows blank page or errors

**Clear cache and rebuild:**
```bash
cd "D:\Projects\Expenses tracker\client"
rmdir /s /q node_modules
rmdir /s /q dist
npm install
npm start
```

---

### Issue 6: "nodemon not found"

**Install nodemon:**
```bash
cd "D:\Projects\Expenses tracker"
npm install
```

Or run without nodemon:
```bash
node server.js
```

---

## 🔄 Complete Fresh Start (If Everything Fails)

### Step 1: Stop Everything
Press **Ctrl + C** in all terminals

### Step 2: Reinstall All Dependencies

**Backend:**
```bash
cd "D:\Projects\Expenses tracker"
rmdir /s /q node_modules
npm install
```

**Frontend:**
```bash
cd "D:\Projects\Expenses tracker\client"
rmdir /s /q node_modules
npm install
```

### Step 3: Start Again
Follow "Option 1: Using VS Code" steps above

---

## 📝 Important Files Location

- **Project Root**: `D:\Projects\Expenses tracker`
- **Backend Files**: `D:\Projects\Expenses tracker` (server.js, routes, models)
- **Frontend Files**: `D:\Projects\Expenses tracker\client`
- **Environment Config**: `D:\Projects\Expenses tracker\.env`

---

## 🌐 URLs to Remember

- **Frontend (Your App)**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **MongoDB Atlas**: https://cloud.mongodb.com/

---

## ✅ Quick Checklist Before Running

- [ ] Internet connection is active (for MongoDB Atlas)
- [ ] VS Code is installed
- [ ] Node.js is installed
- [ ] Project folder exists at `D:\Projects\Expenses tracker`
- [ ] `.env` file exists in project root

---

## 🎯 One-Line Quick Start (If Everything is Already Set Up)

### Using VS Code:
1. Open project folder in VS Code
2. **Terminal 1**: `npm run dev`
3. **Terminal 2**: `cd client && npm start`
4. Open: http://localhost:4200

---

## 💡 Pro Tips

1. **Always start Backend first**, then Frontend
2. **Keep both terminals running** while using the app
3. **Don't close the terminals** - minimize them if needed
4. **Save your work** - expenses are automatically saved to MongoDB
5. **No MongoDB installation needed** - you're using cloud (Atlas)

---

## 🔐 Your MongoDB Atlas Credentials

**Connection String**: Already configured in `.env` file
**Username**: `sonuyadav97297_db_user`
**Password**: `Test1234`
**Database Name**: `expense-tracker`

**⚠️ IMPORTANT**: Keep your `.env` file safe and never share it publicly!

---

## 📚 What Each Command Does

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Starts backend server with auto-reload |
| `npm start` | Starts backend in production mode |
| `cd client` | Navigate to frontend folder |
| `npm start` (in client) | Starts Angular development server |
| `Ctrl + C` | Stops the running server |
| `npm install` | Installs all dependencies |

---

## 🆘 Need Help?

If something doesn't work:
1. Check the error message carefully
2. Look for the issue in "Troubleshooting" section above
3. Make sure you're in the correct directory
4. Try the "Complete Fresh Start" steps

---

## 🎉 Success Indicators

**Backend is working when you see:**
```
Server is running on port 3000
MongoDB connected successfully
```

**Frontend is working when you see:**
```
✔ Compiled successfully.
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:4200
```

**App is working when:**
- You can open http://localhost:4200
- You see the purple gradient design
- You can add, edit, and delete expenses

---

Happy Expense Tracking! 💰✨

**Created**: October 2025
**Last Updated**: October 2025
