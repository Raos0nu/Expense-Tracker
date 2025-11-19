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

## 🌐 Vercel Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Import"

### Step 3: Configure Build Settings
- **Framework Preset**: Other
- **Root Directory**: Leave empty
- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist/expense-tracker-client`
- **Install Command**: `npm install && cd client && npm install`

### Step 4: Add Environment Variable
1. Go to Settings → Environment Variables
2. Add variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production, Preview, Development (select all)
3. Click "Save"

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at: `https://your-project.vercel.app`

### Step 6: Verify Deployment
- Frontend: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/expenses`

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
