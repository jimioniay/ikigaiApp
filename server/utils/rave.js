import ravebase from './ravebase';
import { ErrorHandler } from './errorHandler';
import { RAVE_PAY_FAIL, RAVE_VERIFY_FAIL } from './constants';

const ravePay = async data => {
  try {
    return await ravebase({
      url: '/flwv3-pug/getpaidx/api/v2/hosted/pay',
      method: 'POST',
      data: {
        PBFPubKey: process.env.RAVE_PUBLIC_KEY,
        currency: 'KES',
        ...data,
      },
    });
  } catch (error) {
    throw new ErrorHandler(
      400,
      RAVE_PAY_FAIL,
      error.response.data.message || error,
      error.response.data || error,
    );
  }
};

const raveVerify = async data => {
  try {
    return await ravebase({
      url: '/flwv3-pug/getpaidx/api/v2/verify',
      method: 'POST',
      data: {
        SECKEY: process.env.RAVE_SECRET_KEY,
        ...data,
      },
    });
  } catch (error) {
    throw new ErrorHandler(
      400,
      RAVE_VERIFY_FAIL,
      error.response.data.message || error.response.statusText,
      error.response.data || error,
    );
  }
};

module.exports = { ravePay, raveVerify };
