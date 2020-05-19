const axios = require('axios');

const test = async () => {
  try {
    const url =
      '?transactionId=6f47c19b-eb9d-4ee5-a144-19f7b9263183&reference=INV-001&amount=12.34&signature=617b0b7d29e57db460208904f0e64c11092872d86faf581598c3ba9b8b0e00ae&test=100';
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match = [];
    let values = [];
    for (let i = 0; i < 5; i++) {
      match = regex.exec(url);
      values.push({ key: match[1], value: match[2] });
    }
    let test = {};
    for (let i = 0; i < values.length; i++) {
      test = {
        ...test,
        [values[i].key]: values[i].value,
      };
    }
  } catch (error) {}

  // try {
  //   const response = await axios({
  //     url: 'https://sage.educare.school/api/v1/invoice/rv-notify',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'verif-hash': 'RAVE_CHECK',
  //       host: 'eportal.stgregoryscollege.ng',
  //     },
  //     data: {
  //       id: 259670444,
  //       txRef: '1587084491436-RND_556',
  //       flwRef: '000004200424131255200052438985',
  //       orderRef: 'URF_1587084491829_926135',
  //       paymentPlan: null,
  //       paymentPage: null,
  //       createdAt: '2020-04-24T12:20:42.000Z',
  //       amount: 180000,
  //       charged_amount: 180000,
  //       status: 'successful',
  //       IP: '::ffff:127.0.0.1',
  //       currency: 'NGN',
  //       appfee: 2000,
  //       merchantfee: 0,
  //       merchantbearsfee: 1,
  //       customer: {
  //         id: 195827405,
  //         phone: null,
  //         fullName: 'Anonymous customer',
  //         customertoken: null,
  //         email: 'BENADINE.NWANKWO@UBAGROUP.COM',
  //         createdAt: '2020-04-17T00:48:11.000Z',
  //         updatedAt: '2020-04-17T00:48:11.000Z',
  //         deletedAt: null,
  //         AccountId: 70597,
  //       },
  //       entity: {
  //         id: 'NO-ENTITY',
  //       },
  //       'event.type': 'BANK_TRANSFER_TRANSACTION',
  //     },
  //   });
  //   console.log(response.data);
  //   return response.response;
  // } catch (error) {
  //   console.log('got here', error);
  //   return error;
  // }
};

console.log('response returned ===> ', test());

// https://ikigai-demo-app.herokuapp.com/api/v1/transaction/initiate?transactionId=&reference=&signature=45f99b3c877d3b87c8dceea46300cc9b03ac9971b8de2c8b3b825def45f04320&amount=10000&redirectUrl=https:%2F%2Fikigai-integration-testing-account.officernd.com%2Fgateway%2F5ec1b24c0a113800a5d2049e%2Fpay%2F5ec1fe47ad328e00940bb952%2Freturn
