const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // Si déjà connecté, ne rien faire
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI missing in env');
    throw new Error('MONGO_URI not configured');
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'MyTask',
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
