const flutterwaveRedirect = ({ query: { txref } }, res) => {
  console.log('txref---> ', txref);
  res.redirect(`http://localhost:3000/confirm/${txref}`);
};

module.exports = flutterwaveRedirect;
