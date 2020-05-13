import { generateToken } from '../utils';

const initiatePayment = (
  { query: { amount, reference, transactionId, redirectUrl } },
  res,
) => {
  const token = generateToken({
    amount,
    reference,
    transactionId,
    redirectUrl,
  });
  res.json({
    status: true,
    message: 'Successful',
    data: {
      token,
    },
  });
};

module.exports = initiatePayment;
