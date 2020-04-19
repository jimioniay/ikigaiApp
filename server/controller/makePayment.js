import { rave, ErrorLogger, ErrorHandler } from '../utils';
import { RAVE_PAY_FAIL } from '../utils/constants';

const makePayment = async ({ body }, res, next) => {
  const { ravePay } = rave;
  try {
    const resp = await ravePay(body);
    res.json({
      status: true,
      message: 'Successful',
      data: resp.data.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = makePayment;
