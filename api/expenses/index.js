const connectDB = require('../db');
const Expense = require('../../models/Expense');

module.exports = async (req, res) => {
  // Vercel automatically parses JSON body, but ensure it exists
  if (!req.body && (req.method === 'POST' || req.method === 'PUT')) {
    req.body = {};
  }
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
    if (req.method === 'GET' && !req.query.id) {
      const expenses = await Expense.find().sort({ date: -1 });
      return res.status(200).json(expenses);
    }


    // POST create expense
    if (req.method === 'POST') {
      const expense = new Expense({
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description
      });
      const newExpense = await expense.save();
      return res.status(201).json(newExpense);
    }


    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: error.message });
  }
};

