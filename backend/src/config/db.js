const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // The time the driver will wait for a server selection before timing out
      serverSelectionTimeoutMS: 30000, 
      // The time the driver will wait for a connection to be established
      connectTimeoutMS: 30000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;