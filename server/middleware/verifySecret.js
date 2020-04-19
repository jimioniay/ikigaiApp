const verifySecret = ({ headers }, res, next) => {
  next();
};
module.exports = verifySecret;
