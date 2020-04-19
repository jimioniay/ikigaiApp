import crypto from 'crypto-js/hmac-sha256';
const generateSignature = message => {
  return crypto(message, process.env.OFFICERND_SEC_KEY).toString();
};

module.exports = generateSignature;
