const mongoose = require('mongoose');

// Ensure MONGODB_URL is defined in your environment variables
const MONGODB_URL = process.env.MONGODB_URI; 

const connectDb = async () => { 
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected successfully"); // No need for symbols like 👌👌
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDb;
