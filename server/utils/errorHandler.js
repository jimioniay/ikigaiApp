import ErrorLogger from './errorLogger';

class ErrorHandler extends Error {
  constructor(statusCode = '', operation = '', message = '', exception = '') {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.operation = operation;
    this.exception = exception;
  }
}

const handleError = (error, res) => {
  const { statusCode, operation, message, exception } = error;
  ErrorLogger(operation, exception);
  res.status(statusCode).json({ status: false, operation, message });
};

module.exports = {
  ErrorHandler,
  handleError,
};
