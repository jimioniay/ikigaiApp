import { generateToken } from '../utils';

const generateAuth = (
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

module.exports = generateAuth;
