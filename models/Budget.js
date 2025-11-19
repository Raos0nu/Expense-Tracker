const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    enum: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    default: 'monthly'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);

