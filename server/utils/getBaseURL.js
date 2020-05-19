const getBaseURL = type => {
  let url = '';
  if (process.env.NODE_ENV === 'production') {
    url = process.env.SERVER_BASE_URL;
  } else {
    url = type === 'client' ? 'http://localhost:3000' : 'http://localhost:4009';
  }
  return url;
};
module.exports = getBaseURL;
