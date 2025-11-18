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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Expense ID is required' });
  }

  try {
    // Connect to database
    await connectDB();

    // GET single expense
    if (req.method === 'GET') {
      const expense = await Expense.findById(id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      return res.status(200).json(expense);
    }

    // PUT update expense
    if (req.method === 'PUT') {
      const expense = await Expense.findById(id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      const body = req.body || {};
      if (body.title !== undefined) expense.title = String(body.title).trim();
      if (body.amount !== undefined) expense.amount = parseFloat(body.amount);
      if (body.category !== undefined) expense.category = String(body.category);
      if (body.date !== undefined) expense.date = new Date(body.date);
      if (body.description !== undefined) expense.description = String(body.description).trim();

      const updatedExpense = await expense.save();
      return res.status(200).json(updatedExpense);
    }

    // DELETE expense
    if (req.method === 'DELETE') {
      const expense = await Expense.findById(id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      await expense.deleteOne();
      return res.status(200).json({ message: 'Expense deleted successfully' });
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
