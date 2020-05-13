import { ErrorHandler, ErrorLogger } from '../utils';
import { DB_LOG_WEBHOOK_FAIL, WEBHOOK_UPDATE } from '../utils/constants';
import { Webhook, Transactions } from '../models';

const insertWebhook = async body => {
  try {
    return await Webhook.create({
      reference: body.txref || body.txRef,
      flwref: body.flwRef,
      event_type: body['event.type'],
      requestBody: JSON.stringify(body),
      status: body.status,
      text: 'help',
    });
  } catch (error) {
    ErrorLogger(DB_LOG_WEBHOOK_FAIL, error);
  }
};

//Bank Transfers not catered for...
const updateWebhookTransaction = async body => {
  const getpaymentType = data => {
    switch (data) {
      case 'BANK_TRANSFER_TRANSACTION':
        return 'bank_transfer';
      case 'CARD_TRANSACTION':
        return 'card';
      case 'MPESA_TRANSACTION':
        return 'mpesa';
      default:
        return data;
    }
  };
  try {
    const response = await Transactions.findOne({
      where: { id: body.txRef.split('@')[0] },
    });
    if (
      response === null ||
      body.chargedAmount < response.dataValues.amount ||
      body.currency !== response.dataValues.currency ||
      body.customer.email !== response.customerEmail
    ) {
      return null;
    } else if (response.status !== body.status) {
      return Transactions.update(
        {
          status: body.status,
          flwReference: body.flwRef,
          paymentType: getpaymentType(body['event.type']),
          source: 'webhook',
          chargedAmount: body.charged_amount,
        },
        { where: { id: body.txRef.split('@')[0] } },
      );
    } else {
      console.log(
        'hook came, but already updated',
        response.id,
        '==> ',
        response.status,
        '||',
        body.status,
      );
    }
  } catch (error) {
    throw new ErrorHandler(500, WEBHOOK_UPDATE, 'An error occured', error);
  }
};

module.exports = { insertWebhook, updateWebhookTransaction };
