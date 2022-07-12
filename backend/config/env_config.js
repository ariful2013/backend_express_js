const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL_LOCAL: process.env.MONGODB_URL_LOCAL,
  MONGODB_URL_SERVER: process.env.MONGODB_URL_SERVER,
  JWT_SECRET: process.env.JWT_SECRET,
};
