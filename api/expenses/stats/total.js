const connectDB = require('../../db');
const Expense = require('../../../models/Expense');

module.exports = async (req, res) => {
  // Enable CORS - Must be first
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDB();
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    res.status(200).json({ total: result.length > 0 ? result[0].total : 0 });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: error.message || 'Internal server error',
      error: error.name || 'Unknown error'
    });
  }
};
