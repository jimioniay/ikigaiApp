import Sequelize from 'sequelize';
import database from '../database';

const ReqRespSignatures = database.define('ReqRespSignatures', {
  id: {
    type: Sequelize.INTEGER(100),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  reference: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  transactionId: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  signature: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
});

module.exports = ReqRespSignatures;
