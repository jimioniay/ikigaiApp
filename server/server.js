import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import transaction from './routes/transaction';
import {
  ErrorHandler,
  SERVER_EXCEPTION,
  handleError,
  ErrorLogger,
} from './utils';

import { ERROR_ROUTE } from './utils/constants';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/transaction', transaction);
app.get('/error', () => {
  throw new ErrorHandler(400, ERROR_ROUTE, 'Invalid Route', ERROR_ROUTE);
});

const PORT = process.env.PORT || process.env.DEV_SERVER_PORT;

app.use((error, req, res, next) => {
  handleError(error, res);
});

try {
  app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
} catch (error) {
  ErrorLogger(SERVER_EXCEPTION, error);
}
