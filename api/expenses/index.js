const connectDB = require('../db');
const Expense = require('../../models/Expense');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    // GET all expenses
    if (req.method === 'GET') {
      const expenses = await Expense.find().sort({ date: -1 });
      return res.status(200).json(expenses);
    }

    // POST create expense
    if (req.method === 'POST') {
      const { title, amount, category, date, description } = req.body;
      
      // Validation
      if (!title || amount === undefined || !category || !date) {
        return res.status(400).json({ 
          message: 'Missing required fields: title, amount, category, and date are required' 
        });
      }

      const expense = new Expense({
        title: title.trim(),
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        description: description ? description.trim() : ''
      });
      
      const newExpense = await expense.save();
      return res.status(201).json(newExpense);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
