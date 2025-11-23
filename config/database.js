const mongoose = require('mongoose');
require('dotenv').config();

let cachedConnection = null;

const connectDB = async () => {
  // Return cached connection if exists and connected
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    cachedConnection = connection;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit in serverless environment
    if (process.env.VERCEL) {
      throw error;
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;


