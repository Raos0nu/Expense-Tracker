const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../config/database');
const expenseRoutes = require('../routes/expenses');
const fundRoutes = require('../routes/fund');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/fund', fundRoutes);

// Budget routes
const budgetRoutes = require('../routes/budget');
app.use('/api/budget', budgetRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Expense Tracker API' });
});

// Export for Vercel
module.exports = app;

