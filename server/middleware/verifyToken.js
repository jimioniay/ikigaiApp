import { decodeToken, ErrorHandler } from '../utils';
import { RAVE_VERIFY_TOKEN_FAIL } from '../utils/constants';
const verifyToken = (
  { body: { amount, transactionId }, headers: { authorization } },
  res,
  next,
) => {
  const {
    message: { name, message },
    data: { amount: tokenAmount, transactionId: tokenTransactionId },
  } = decodeToken(authorization);
  if (tokenAmount !== amount || tokenTransactionId !== transactionId) {
    let errorMessage =
      message === undefined ? ' Invalid Token' : `${name}||${message}`;
    throw new ErrorHandler(401, RAVE_VERIFY_TOKEN_FAIL, errorMessage);
  } else {
    next();
  }
};

module.exports = verifyToken;
