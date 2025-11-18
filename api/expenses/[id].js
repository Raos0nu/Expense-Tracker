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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Expense ID is required' });
  }

  try {
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

      if (req.body.title !== undefined) expense.title = req.body.title.trim();
      if (req.body.amount !== undefined) expense.amount = parseFloat(req.body.amount);
      if (req.body.category !== undefined) expense.category = req.body.category;
      if (req.body.date !== undefined) expense.date = new Date(req.body.date);
      if (req.body.description !== undefined) expense.description = req.body.description.trim();

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

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
