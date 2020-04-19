import { generateToken } from '../utils';

const redirectToClient = (
  { query: { amount, reference, transactionId } },
  res,
) => {
  const token = generateToken({ amount, reference, transactionId });
  //   res.redirect(`http://localhost:3000/success/?token=${token}`);
  res.json({
    status: true,
    message: 'Successful',
    data: {
      url: `http://localhost:3000/success/?t=${token}`,
    },
  });
};

module.exports = redirectToClient;
