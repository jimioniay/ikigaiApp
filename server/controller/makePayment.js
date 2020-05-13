import { rave } from '../utils';

const makePayment = async (req, res, next) => {
  const { ravePay } = rave;
  try {
    const resp = await ravePay(req.body);
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
