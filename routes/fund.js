const express = require('express');
const router = express.Router();
const Fund = require('../models/Fund');

// Get initial fund
router.get('/', async (req, res) => {
  try {
    const fund = await Fund.getFund();
    res.json({ initialFund: fund.initialFund });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update initial fund
router.put('/', async (req, res) => {
  try {
    let fund = await Fund.findOne();
    if (!fund) {
      fund = new Fund({ initialFund: req.body.initialFund || 0 });
    } else {
      fund.initialFund = req.body.initialFund || 0;
    }
    const updatedFund = await fund.save();
    res.json({ initialFund: updatedFund.initialFund });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

