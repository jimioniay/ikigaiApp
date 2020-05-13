import { ErrorLogger } from '../utils';
import {
  DB_LOG_FAIL,
  DB_UPDATE_SUCCESS,
  DB_UPDATE_FAIL,
  DB_LOG_PAYMENT_FAIL,
  DB_FETCH_VERIFY_FAIL,
  DB_UPDATE_VERIFY_FAIL,
} from '../utils/constants';
import { ReqRespSignatures, Transactions } from '../models';

const createSignature = async data => {
  try {
    return await ReqRespSignatures.create({
      ...data,
    });
  } catch (error) {
    ErrorLogger(DB_LOG_FAIL, error);
    return error.errorno;
  }
};

const updateSignature = async (id, transactionId, status) => {
  try {
    await ReqRespSignatures.update(
      {
        status,
      },
      { where: { id, transactionId }, returning: true },
    );
    ErrorLogger(DB_UPDATE_SUCCESS, 'Logged Successfully');
  } catch (error) {
    ErrorLogger(DB_UPDATE_FAIL, error);
  }
};

const createTransaction = async ({
  transactionId,
  reference,
  amount,
  customer_firstname,
  customer_lastname,
  customer_email,
  redirectUrl, // this officeRnD redirectUrl and its different from the redirect_url for Rave
  ip,
}) => {
  try {
    return await Transactions.create({
      transactionId,
      amount,
      currency: 'KES',
      invoiceNumber: reference,
      customerFirstName: customer_firstname,
      customerLastName: customer_lastname,
      customerEmail: customer_email,
      ip,
      officeRedirectUrl: redirectUrl,
      status: 'initiated',
    });
  } catch (error) {
    ErrorLogger(DB_LOG_PAYMENT_FAIL, error);
  }
};

const fetchATransaction = async id => {
  try {
    return await Transactions.findOne({ where: { id } });
  } catch (error) {
    ErrorLogger(DB_FETCH_VERIFY_FAIL, error);
  }
};

const updateATransaction = async (
  id,
  {
    status,
    flwref,
    chargecode,
    chargemessage,
    vbvcode,
    vbvmessage,
    chargedamount,
    authmodel,
    authurl,
    paymenttype,
    card = { card_tokens: [{ embedtoken: '' }] },
  },
) => {
  try {
    return await Transactions.update(
      {
        status,
        flwReference: flwref,
        chargedAmount: chargedamount,
        authModel: authmodel,
        authUrl: authurl,
        paymentType: paymenttype,
        embedToken: card.card_tokens[0].embedToken,
        responseCode: vbvcode === 'N/A' ? chargecode : vbvcode,
        responseMessage: vbvmessage === 'N/A' ? chargemessage : vbvmessage,
        source: 'verify',
      },
      { where: { id }, returning: true, plain: true },
    ).then(() => Transactions.findOne({ where: { id } }));
  } catch (error) {
    ErrorLogger(DB_UPDATE_VERIFY_FAIL, error);
  }
};

module.exports = {
  createSignature,
  updateSignature,
  createTransaction,
  fetchATransaction,
  updateATransaction,
};
