import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import transaction from './routes/transaction';
import redirect from './routes/redirect';
import {
  ErrorHandler,
  SERVER_EXCEPTION,
  handleError,
  ErrorLogger,
} from './utils';

import { ERROR_ROUTE } from './utils/constants';
import { getBaseURL } from './utils';
import connection from './database';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/redirect', redirect);
app.use('/api/v1/transaction', transaction);
app.get('/error', () => {
  throw new ErrorHandler(400, ERROR_ROUTE, 'Invalid Route', ERROR_ROUTE);
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || process.env.DEV_SERVER_PORT;

app.use((error, req, res, next) => {
  handleError(error, res);
});

connection
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

try {
  app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
  console.log('Environmental Variables --> ', process.env);
} catch (error) {
  ErrorLogger(SERVER_EXCEPTION, error);
}
