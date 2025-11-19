# 💰 Expense Tracker - MEAN Stack Application

A full-stack expense tracking application built with MongoDB, Express.js, Angular, and Node.js (MEAN stack). Fully configured for Vercel deployment.

## ✨ Features

- ✨ Add, edit, and delete expenses
- 📊 View total expenses and transaction counts
- 🏷️ Categorize expenses (Food, Transportation, Entertainment, Bills, Shopping, Health, Other)
- 📈 Category-wise expense statistics
- 🎨 Modern and responsive UI
- 💾 MongoDB database for data persistence
- 🚀 Fully deployed on Vercel (Frontend + Backend)

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose** - MongoDB object modeling
- **Vercel Serverless Functions** - API endpoints

### Frontend
- **Angular** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming library

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier available)
- Angular CLI (v16 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raos0nu/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configure environment variables**
   - Create `.env` file in root directory
   - Add:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     ```

5. **Start backend server**
   ```bash
   npm run dev
   ```
   Backend runs on: `http://localhost:3000`

6. **Start frontend (new terminal)**
   ```bash
   cd client
   npm start
   ```
   Frontend runs on: `http://localhost:4200`

## 🌐 Vercel Deployment - Step by Step

### Step 1: Prepare Your Code
Make sure all code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Sign Up / Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" (or "Log In" if you have an account)
3. Sign up with GitHub (recommended for easy integration)

### Step 3: Import Your Project
1. Click "Add New..." button (top right)
2. Select "Project"
3. Click "Import Git Repository"
4. Find and select your repository: `Raos0nu/Expense-Tracker`
5. Click "Import"

### Step 4: Configure Project Settings
1. **Project Name**: Keep default or change it
2. **Framework Preset**: Select "Other" or leave as "Other"
3. **Root Directory**: Leave empty (use project root)
4. **Build and Output Settings**:
   - Click "Override" next to Build Command
   - **Build Command**: `cd client && npm install && npm run build -- --configuration production`
   - **Output Directory**: `client/dist/expense-tracker-client`
   - **Install Command**: `npm install && cd client && npm install`
   - **Node.js Version**: 18.x (or leave default)

### Step 5: Add Environment Variable
1. Before deploying, click "Environment Variables" section
2. Click "Add New"
3. Add your MongoDB connection:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string
     - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?retryWrites=true&w=majority`
     - Example: `mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/expense-tracker?retryWrites=true&w=majority`
     - **Important**: Replace `<username>`, `<password>`, `<cluster>`, and `<database-name>` with your actual values
   - **Environment**: Select all three:
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
4. Click "Save"

### Step 6: Deploy
1. Click "Deploy" button (bottom right)
2. Wait for deployment to complete (2-5 minutes)
3. Watch the build logs for any errors

### Step 7: Verify Deployment
Once deployment completes:
1. You'll see "Congratulations! Your project has been deployed"
2. Click on your deployment URL (e.g., `https://expense-tracker-xxx.vercel.app`)
3. Test the application:
   - Frontend should load: `https://your-app.vercel.app`
   - Test API: `https://your-app.vercel.app/api/expenses`
   - Should return JSON or empty array

### Step 8: Set Up MongoDB Atlas (If Not Done)
1. Go to https://cloud.mongodb.com
2. Sign in or create account
3. Create a free cluster (M0 Free tier)
4. **Database Access**:
   - Go to "Database Access" → "Add New Database User"
   - Authentication Method: Password
   - Username: Create a username (e.g., `expenseuser`)
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"
5. **Network Access**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"
6. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Select "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
7. **Format the Connection String**:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password (URL encode special characters)
   - Add database name: Change `/?retryWrites` to `/expense-tracker?retryWrites`
   - Final format: `mongodb+srv://expenseuser:yourpassword@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority`
8. Use this complete string as `MONGODB_URI` value in Vercel

### Troubleshooting

**Build Fails:**
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure Node.js version is compatible (18.x or higher)

**API Not Working:**
- Verify `MONGODB_URI` environment variable is set correctly
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Test API endpoint: `https://your-app.vercel.app/api/expenses`

**Frontend Not Loading:**
- Check Output Directory is correct: `client/dist/expense-tracker-client`
- Verify build completed successfully
- Check browser console for errors

**Database Connection Issues:**
- Verify MongoDB connection string format
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Ensure database user has read/write permissions

## 📡 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Statistics
- `GET /api/expenses/stats/total` - Get total expenses
- `GET /api/expenses/stats/category` - Get expenses by category

### Test
- `GET /api/test` - Test API connectivity

## 📁 Project Structure

```
expense-tracker/
├── api/                    # Vercel serverless functions
│   ├── db.js              # MongoDB connection
│   ├── test.js            # Test endpoint
│   └── expenses/          # Expense API routes
├── client/                 # Angular frontend
│   └── src/
│       ├── app/
│       │   ├── components/
│       │   ├── services/
│       │   └── models/
│       └── environments/
├── models/                 # Mongoose models
├── routes/                 # Express routes (local dev)
├── config/                 # Configuration
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## 🎯 Usage

### Adding an Expense
1. Click "Add New Expense"
2. Fill in: Title, Amount, Category, Date
3. Optionally add description
4. Click "Add Expense"

### Editing an Expense
1. Find the expense in the list
2. Click "Edit"
3. Modify details
4. Click "Update Expense"

### Deleting an Expense
1. Find the expense in the list
2. Click "Delete"
3. Confirm deletion

## 🔧 Configuration

### Environment Variables

**Local Development (.env file):**
```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

**Vercel:**
- Add `MONGODB_URI` in Vercel Settings → Environment Variables

## 🐛 Troubleshooting

### Backend not connecting
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Verify connection string is correct
- Check internet connection

### Vercel deployment issues
- Verify `MONGODB_URI` environment variable is set
- Check Root Directory is set to `client`
- Review build logs in Vercel dashboard

### API errors
- Check Vercel Function Logs
- Verify MongoDB connection string
- Test `/api/test` endpoint first

## 📝 License

ISC

## 👤 Author

Raos0nu

## 🙏 Acknowledgments

- MongoDB Atlas for free cloud database
- Vercel for free hosting
- Angular and Express.js communities

---

**For detailed Vercel deployment instructions, see `VERCEL_DEPLOYMENT_COMPLETE.md`**
