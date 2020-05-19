import jwt from 'jsonwebtoken';

const getQueryParams = async path => {
  let response = {
    transactionId: '',
    reference: '',
    amount: 0,
    redirectUrl: '',
  };
  try {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      match = [];
    let values = [];
    for (let i = 0; i < 5; i++) {
      match = regex.exec(path);
      values.push({ key: match[1], value: match[2] });
    }
    for (let i = 0; i < values.length; i++) {
      response = {
        ...response,
        [values[i].key]: values[i].value,
      };
    }
    return response;
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

const handleTokenResponse = ({ status, error, data }) => {
  switch (status) {
    case false:
      return {
        status: false,
        message: error,
        data: {},
      };
    default:
      return {
        status: true,
        message: '',
        data,
      };
  }
};

const decodeToken = token => {
  let data;
  try {
    data = jwt.verify(token, process.env.REACT_APP_JWT_SEC_KEY);
    return handleTokenResponse({
      status: true,
      error: '',
      data,
    });
  } catch (error) {
    return handleTokenResponse({
      status: false,
      error,
      data: {},
    });
  }
};

const getBaseURL = type => {
  let url = '';
  if (process.env.NODE_ENV === 'production') {
    url = process.env.REACT_APP_SERVER_BASE_URL;
  } else {
    url = type === 'client' ? 'http://localhost:3000' : 'http://localhost:4009';
  }
  console.log('url --> ', url);
  return url;
};

export default { getQueryParams, decodeToken, getBaseURL };
