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
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
      isConnected = false;
      throw error;
    }
  }
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes - keep /api prefix since vercel.json rewrite preserves the path
app.use('/api/expenses', expenseRoutes);
app.use('/api/fund', fundRoutes);
app.use('/api/budget', budgetRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Expense Tracker API' });
});

// Vercel serverless function handler
module.exports = async (req, res) => {
  try {
    // Ensure database is connected
    await connectOnce();
    // Handle the request with Express
    app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error', 
        message: error.message 
      });
    }
  }
};

