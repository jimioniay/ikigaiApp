const flutterwaveRedirect = ({ query: { txref } }, res) => {
  res.redirect(`${proces.env.REACT_APP_CLIENT_BASE_URL}/confirm/${txref}`);
};

module.exports = flutterwaveRedirect;
