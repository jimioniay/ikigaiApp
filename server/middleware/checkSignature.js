import { generateSignature } from '../utils';
import { createSignature, updateSignature } from '../dbfunctions';
import { ErrorHandler } from '../utils';

const checkSignature = async (
  { query: { amount, reference, transactionId, signature } },
  res,
  next,
) => {
  const message = `${amount}|${reference}|${transactionId}`;
  const requestSignature = generateSignature(message);

  try {
    const log = await createSignature({
      amount,
      reference,
      transactionId,
      signature,
    });
    const {
      dataValues: { id },
    } = log;
    if (requestSignature !== signature) {
      updateSignature(id, transactionId, 'false');
      throw new ErrorHandler(
        400,
        'SIGN_VALIDATE',
        'Invalid request params or signature',
      );
    } else {
      updateSignature(id, transactionId, 'true');
      next();
    }
  } catch (error) {
    next(error);
    // throw new ErrorHandler(500, 'SIGN_VALIDATE', 'An error occured', error);
  }
};

module.exports = checkSignature;
