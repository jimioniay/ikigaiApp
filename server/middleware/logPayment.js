import { ErrorHandler, ErrorLogger } from '../utils';
import {
  DB_LOG_PAYMENT_SUCCESS,
  DB_LOG_PAYMENT_FAIL,
} from '../utils/constants';
import { createTransaction } from '../dbfunctions';

const logPayment = async ({ body }, res, next) => {
  try {
    const { id } = await createTransaction(body);
    body.txref = `${id}@${body.transactionId}`;
    ErrorLogger(DB_LOG_PAYMENT_SUCCESS, 'Log Tranx to DB is Success: ');
    next();
  } catch (error) {
    throw new ErrorHandler(500, DB_LOG_PAYMENT_FAIL, 'An error occured', error);
  }
};

module.exports = logPayment;
