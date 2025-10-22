# 📋 Expense Tracker - Command Cheatsheet

## ⚡ Super Quick Start (Most Common)

### Using VS Code (Recommended):

1. **Open folder** in VS Code: `D:\Projects\Expenses tracker`
2. **Open 2 terminals** (Ctrl + `)
3. **Terminal 1**: `npm run dev`
4. **Terminal 2**: `cd client` then `npm start`  
5. **Browser**: http://localhost:4200

---

## 🎯 Essential Commands

### Start Application

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd client
npm start
```

### Stop Application
```
Ctrl + C (in each terminal)
```

---

## 🔧 Fix Common Problems

### Reinstall Dependencies
```bash
# Backend
npm install

# Frontend
cd client
npm install
```

### Kill Port 3000
```bash
netstat -ano | findstr :3000
taskkill /PID <NUMBER> /F
```

### Kill Port 4200
```bash
netstat -ano | findstr :4200
taskkill /PID <NUMBER> /F
```

### Complete Reset
```bash
# Backend
rmdir /s /q node_modules
npm install

# Frontend
cd client
rmdir /s /q node_modules
npm install
```

---

## 🌐 Important URLs

- **App**: http://localhost:4200
- **API**: http://localhost:3000
- **MongoDB**: https://cloud.mongodb.com/

---

## 📁 Important Files

- **Backend**: `D:\Projects\Expenses tracker\server.js`
- **Frontend**: `D:\Projects\Expenses tracker\client`
- **Config**: `D:\Projects\Expenses tracker\.env`

---

## 🔐 Database Info

- **User**: sonuyadav97297_db_user
- **Password**: Test1234
- **Database**: expense-tracker
- **Type**: MongoDB Atlas (Cloud)

---

## ✅ Success Messages

**Backend Working:**
```
Server is running on port 3000
MongoDB connected successfully
```

**Frontend Working:**
```
Compiled successfully
Angular Live Development Server is listening on localhost:4200
```

---

## 🆘 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| Port already in use | Kill the port (see above) |
| Module not found | Run `npm install` |
| MongoDB error | Check internet connection |
| Blank page | Clear browser cache, restart frontend |
| Any weird error | Stop everything, run `npm install`, restart |

---

**💡 Remember**: Always start Backend first, then Frontend!

**🎯 Project Location**: `D:\Projects\Expenses tracker`

---

**Print this page or save it for quick reference!** 📌


