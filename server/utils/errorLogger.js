import {
  SERVER_EXCEPTION,
  DB_LOG_SUCCESS,
  DB_LOG_FAIL,
  DB_UPDATE_SUCCESS,
  DB_UPDATE_FAIL,
  RAVE_VERIFY_FAIL,
  RAVE_PAY_FAIL,
  RAVE_VERIFY_TOKEN_FAIL,
  DB_LOG_PAYMENT_SUCCESS,
  DB_LOG_PAYMENT_FAIL,
  DB_FETCH_VERIFY_FAIL,
  WEBHOOK_UPDATE,
  ERROR_ROUTE,
} from './constants';

const errorLogger = (SERVER_EXCEPTION, error) => {
  console.log(`Exception caught in ${SERVER_EXCEPTION} || ??? : `, error);
};

const dbLogger = (operation, message) => {
  console.log(`${operation}: `, message);
};

const apiLogger = (operation, message) => {
  console.log(`${operation}: ==> `, message);
  // return apiFailedResponse(operation, res);
};

const ErrorLogger = (errorCategory, error) => {
  switch (errorCategory) {
    case SERVER_EXCEPTION:
      return errorLogger(SERVER_EXCEPTION, error);
    case DB_LOG_SUCCESS:
      return dbLogger(DB_LOG_SUCCESS, error);
    case DB_LOG_FAIL:
      return dbLogger(DB_LOG_FAIL, error);
    case DB_UPDATE_SUCCESS:
      return dbLogger(DB_UPDATE_SUCCESS, error);
    case DB_UPDATE_FAIL:
      return dbLogger(DB_UPDATE_FAIL, error);
    case RAVE_VERIFY_FAIL:
      return apiLogger(RAVE_VERIFY_FAIL, error);
    case RAVE_VERIFY_TOKEN_FAIL:
      return apiLogger(RAVE_VERIFY_TOKEN_FAIL, error);
    case RAVE_PAY_FAIL:
      return apiLogger(RAVE_PAY_FAIL, error);
    case WEBHOOK_UPDATE:
      return dbLogger(WEBHOOK_UPDATE, error);
    case DB_LOG_PAYMENT_SUCCESS:
      return dbLogger(DB_LOG_PAYMENT_SUCCESS, error);
    case DB_LOG_PAYMENT_FAIL:
      return apiLogger(DB_LOG_PAYMENT_FAIL, error);
    case DB_FETCH_VERIFY_FAIL:
      return apiLogger(DB_FETCH_VERIFY_FAIL, error);
    default:
      return errorLogger(errorCategory, error);
  }
};

module.exports = ErrorLogger;
