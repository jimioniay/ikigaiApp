import { getBaseURL } from '../utils';
const flutterwaveRedirect = ({ query: { txref } }, res) => {
  res.redirect(`${getBaseURL('client')}/confirm/${txref}`);
};

module.exports = flutterwaveRedirect;
