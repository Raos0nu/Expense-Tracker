const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses with optional filters
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) {
        query.date.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        query.date.$lte = new Date(req.query.endDate);
      }
    }
    
    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Search filter
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    description: req.body.description
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (req.body.title) expense.title = req.body.title;
    if (req.body.amount) expense.amount = req.body.amount;
    if (req.body.category) expense.category = req.body.category;
    if (req.body.date) expense.date = req.body.date;
    if (req.body.description !== undefined) expense.description = req.body.description;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get total expenses
router.get('/stats/total', async (req, res) => {
  try {
    let query = {};
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) query.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.date.$lte = new Date(req.query.endDate);
    }
    
    const result = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    res.json({ total: result.length > 0 ? result[0].total : 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get expenses by category
router.get('/stats/category', async (req, res) => {
  try {
    let query = {};
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) query.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.date.$lte = new Date(req.query.endDate);
    }
    
    const result = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get monthly trends
router.get('/stats/trends', async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $limit: 12
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


