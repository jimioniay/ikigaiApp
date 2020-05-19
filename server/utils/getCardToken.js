const getCardToken = (card = {}) => {
  let token = '';
  if (card) {
    token = card.card_tokens.length > 0 ? card.card_tokens[0].embedToken : '';
  }
  return token;
};
module.exports = getCardToken;
