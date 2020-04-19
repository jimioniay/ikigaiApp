import Sequelize from 'sequelize';
import database from '../database';

const transactions = database.define('transactions', {
  id: {
    type: Sequelize.INTEGER(100),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  transactionId: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  invoiceNumber: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  flwReference: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  amount: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  currency: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  chargedAmount: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  customerFirstName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  customerLastName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  customerEmail: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  authModel: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  authUrl: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  paymentType: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  embedToken: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['initiated', 'success', 'failed', 'success-pending-validation'],
  },
  source: {
    type: Sequelize.STRING(100),
    allowNull: true,
    values: ['webhook', 'verify'],
  },
  responseCode: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  responseMessage: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
});

module.exports = transactions;
