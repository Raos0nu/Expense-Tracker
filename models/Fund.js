const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  initialFund: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

// Ensure only one fund document exists
fundSchema.statics.getFund = async function() {
  let fund = await this.findOne();
  if (!fund) {
    fund = await this.create({ initialFund: 0 });
  }
  return fund;
};

module.exports = mongoose.model('Fund', fundSchema);

