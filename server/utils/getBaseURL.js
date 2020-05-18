const getBaseURL = type => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.SERVER_BASE_URL;
  } else {
    return type === 'client'
      ? 'http://localhost:3000'
      : 'http://localhost:4009';
  }
};
module.exports = getBaseURL;
