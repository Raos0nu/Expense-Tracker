const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../config/database');
const expenseRoutes = require('../routes/expenses');
const fundRoutes = require('../routes/fund');
const budgetRoutes = require('../routes/budget');

const app = express();

// Connect to database (only once, cached for serverless)
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
};

// Initialize connection
connectOnce();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/fund', fundRoutes);
app.use('/api/budget', budgetRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Expense Tracker API' });
});

// Vercel serverless function handler
module.exports = async (req, res) => {
  // Ensure database is connected
  await connectOnce();
  return app(req, res);
};

