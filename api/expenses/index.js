const connectDB = require('../db');
const Expense = require('../../models/Expense');

module.exports = async (req, res) => {
  // Enable CORS - Must be first
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Connect to database
    await connectDB();

    // GET all expenses
    if (req.method === 'GET') {
      const expenses = await Expense.find().sort({ date: -1 });
      return res.status(200).json(expenses);
    }

    // POST create expense
    if (req.method === 'POST') {
      const { title, amount, category, date, description } = req.body || {};
      
      // Validation
      if (!title || amount === undefined || amount === null || !category || !date) {
        return res.status(400).json({ 
          message: 'Missing required fields: title, amount, category, and date are required',
          received: { title, amount, category, date }
        });
      }

      const expense = new Expense({
        title: String(title).trim(),
        amount: parseFloat(amount),
        category: String(category),
        date: new Date(date),
        description: description ? String(description).trim() : ''
      });
      
      const newExpense = await expense.save();
      return res.status(201).json(newExpense);
    }

    // Method not allowed
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: error.message || 'Internal server error',
      error: error.name || 'Unknown error'
    });
  }
};
