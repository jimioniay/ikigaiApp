import { decodeToken, ErrorHandler, generateSignature } from '../utils';
import { fetchATransaction } from '../dbfunctions';
import { OFFICE_REDIRECT } from '../utils/constants';
const officeRnDRedirect = async (
  { body: { txref }, headers: { authorization } },
  res,
  next,
) => {
  try {
    const response = await fetchATransaction(txref.split('@')[0]);
    if (response !== null) {
      const {
        officeRedirectUrl,
        transactionId,
        status,
        responseMessage,
      } = response.dataValues;
      const {
        message: { name, message },
        data: { redirectUrl, transactionId: tokenTransactionId },
      } = decodeToken(authorization);
      if (
        !response.dataValues ||
        officeRedirectUrl !== redirectUrl ||
        tokenTransactionId !== transactionId ||
        txref.split('@')[1] !== transactionId
      ) {
        let errorMessage =
          message === undefined
            ? ' Invalid req params or redirect URL'
            : `${name}||${message}`;
        throw new ErrorHandler(401, OFFICE_REDIRECT, errorMessage);
      } else {
        let adaptStatus = status.includes('success') ? 'success' : status;
        let message = `${adaptStatus}|${transactionId}`;
        const signature = generateSignature(message);
        const url =
          adaptStatus === 'success'
            ? `${officeRedirectUrl}?status=success&transactionId=${transactionId}&signature=${signature}`
            : `${officeRedirectUrl}?status=${status}&transactionId=${transactionId}&error=${responseMessage}&signature=${signature}`;
        res.json({
          status: true,
          message: 'Succesful',
          data: {
            url,
          },
        });
      }
    } else {
      throw new ErrorHandler(404, OFFICE_REDIRECT, 'No transaction found');
    }
  } catch (error) {
    res.status(error.statusCode).json({
      status: false,
      operation: error.operation,
      message: error.message,
    });
  }
};

module.exports = officeRnDRedirect;
