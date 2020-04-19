import axios from 'axios';
import 'dotenv/config';

const baseURL =
  process.env.MODE === 'TEST'
    ? process.env.RAVEPAY_BASE_URL_TEST
    : process.env.RAVEPAY_BASE_URL;

module.exports = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});
