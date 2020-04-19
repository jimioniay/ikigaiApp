import { insertWebhook, updateWebhookTransaction } from '../dbfunctions';
import { ErrorLogger, ErrorHandler } from '../utils';

const raveWebhook = async ({ body }, res, next) => {
  try {
    insertWebhook(body);
    const response = await updateWebhookTransaction(body);
    if (response === null) {
      throw new ErrorHandler(
        400,
        'RAVE_WEBHOOK',
        'Invalid Request Message or Suspect Transaction',
      );
    } else {
      res.json({
        status: true,
        message: 'Successful',
      });
    }
  } catch (error) {
    ErrorLogger('RAVE_WEBHOOK', 'Exception caught in raveWebhook', `${error}`);
    next(error);
  }
};

export default raveWebhook;
