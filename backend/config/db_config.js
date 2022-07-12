const mongoose = require('mongoose');
const dotenv = require('../config/env_config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dotenv.MONGODB_URL_SERVER, {
      family: 4,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
