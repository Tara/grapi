// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  goodreads_api_key: process.env.GOODREADS_API_KEY,
  goodreads_api_secret: process.env.GOODREADS_API_SECRET,
  port: process.env.PORT,
  secret_key: process.env.SECRET_KEY
};