const flutterwaveRedirect = ({ query: { txref } }, res) => {
  res.redirect(`http://localhost:3000/confirm/${txref}`);
};

module.exports = flutterwaveRedirect;
