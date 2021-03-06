import jwt from 'jsonwebtoken';

const handleTokenResponse = ({ status, error, data }) => {
  switch (status) {
    case false:
      return {
        status: false,
        message: error,
        data: {},
      };
    default:
      return {
        status: true,
        message: '',
        data,
      };
  }
};

const generateToken = ({ amount, reference, transactionId }) => {
  return jwt.sign(
    {
      amount,
      reference,
      transactionId,
    },
    process.env.JWT_SEC_KEY,
    {
      expiresIn: process.env.JWT_TOKEN_VALIDITY,
    },
  );
};

const decodeToken = token => {
  let data;
  try {
    data = jwt.verify(token, process.env.JWT_SEC_KEY);
    return handleTokenResponse({
      status: true,
      error: '',
      data,
    });
  } catch (error) {
    return handleTokenResponse({
      status: false,
      error,
      data: {},
    });
  }
};

module.exports = { generateToken, decodeToken };
