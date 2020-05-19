import { rave, ErrorHandler, ErrorLogger } from '../utils';
import { RAVE_VERIFY_FAIL } from '../utils/constants';
import { fetchATransaction, updateATransaction } from '../dbfunctions';

const verifyPayment = async ({ body }, res, next) => {
  const { raveVerify } = rave;

  try {
    const verifyResponse = await raveVerify(body);
    const {
      data: {
        data: { chargedamount, currency, fraudstatus },
      },
    } = verifyResponse;

    if (fraudstatus !== 'ok') {
      // checking fraud status
      throw new ErrorHandler(400, RAVE_VERIFY_FAIL, 'Fraud Status Not Okay');
    }
    let { dataValues } = await fetchATransaction(
      verifyResponse.data.data.txref.split('@')[0],
    );
    if (dataValues) {
      // checking database response
      if (
        chargedamount < parseInt(dataValues.amount, 10) ||
        currency !== dataValues.currency
      ) {
        // checking for tampered transaction

        throw new ErrorHandler(400, RAVE_VERIFY_FAIL, 'Suspected Fraud', '');
      } else {
        const data = await updateATransaction(
          dataValues.id,
          verifyResponse.data.data,
        );
        data.embedToken && delete data.embedToken;
        res.json({
          status: true,
          message: 'Verified Successfully',
          data,
        });
      }
    } else {
      throw new ErrorHandler(400, RAVE_VERIFY_FAIL, 'An error occured');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyPayment;
