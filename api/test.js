module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({ 
    message: 'API is working!',
    method: req.method,
    env: process.env.MONGODB_URI ? 'MongoDB URI is set' : 'MongoDB URI is NOT set',
    timestamp: new Date().toISOString()
  });
};
