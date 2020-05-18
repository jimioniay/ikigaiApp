import axios from './axios';

const initiatePayment = async ({
  amount,
  reference,
  signature,
  transactionId,
  redirectUrl,
}) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/transaction/initiate',
      params: {
        transactionId,
        reference,
        signature,
        amount,
        redirectUrl,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const generatePaymentURL = async (data, form) => {
  const apiData = {
    transactionId: data.transactionId,
    reference: data.reference,
    amount: data.amount,
    redirectUrl: data.redirectUrl,
    customer_email: form.email,
    redirect_url: `${process.env.SERVER_BASE_URL}/api/v1/redirect/flutterwave`,
    custom_title: 'Ikigai Payment',
    customer_firstname: form.firstName,
    customer_lastname: form.lastName,
    custom_description: 'Ikigai Membership Payment',
    ip: data.ip,
  };
  try {
    const response = await axios({
      method: 'POST',
      url: '/transaction/pay',
      data: apiData,
    });
    return response.data.data.link;
  } catch (error) {
    return {
      status: false,
      error: error.response.data,
    };
  }
};

const confirmPayment = async ref => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/transaction/verify',
      data: {
        txref: ref,
      },
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const officeRnDURL = async ref => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/redirect/officeRnD',
      data: {
        txref: ref,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default {
  initiatePayment,
  generatePaymentURL,
  confirmPayment,
  officeRnDURL,
};
