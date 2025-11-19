const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get budget by category
router.get('/:category', async (req, res) => {
  try {
    const budget = await Budget.findOne({ category: req.params.category });
    if (!budget) {
      return res.json({ category: req.params.category, amount: 0 });
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update budget
router.post('/', async (req, res) => {
  try {
    let budget = await Budget.findOne({ category: req.body.category });
    if (!budget) {
      budget = new Budget({
        category: req.body.category,
        amount: req.body.amount,
        period: req.body.period || 'monthly'
      });
    } else {
      budget.amount = req.body.amount;
      budget.period = req.body.period || budget.period;
    }
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete budget
router.delete('/:category', async (req, res) => {
  try {
    const budget = await Budget.findOne({ category: req.params.category });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    await budget.deleteOne();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

