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
      // Log the request for debugging
      console.log('POST request received');
      console.log('Request body:', JSON.stringify(req.body));
      console.log('Request headers:', JSON.stringify(req.headers));
      
      // Get body - Vercel automatically parses JSON
      const body = req.body || {};
      const { title, amount, category, date, description } = body;
      
      // Validation
      if (!title || amount === undefined || amount === null || !category || !date) {
        console.log('Validation failed:', { title, amount, category, date });
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
      
      console.log('Saving expense:', expense);
      const newExpense = await expense.save();
      console.log('Expense saved successfully:', newExpense._id);
      
      return res.status(201).json(newExpense);
    }

    // Method not allowed
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: error.message || 'Internal server error',
      error: error.name || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
