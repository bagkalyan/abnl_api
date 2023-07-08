const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  BASE_URL: process.env.BASE_URL,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  API_V1: process.env.API_V1
};