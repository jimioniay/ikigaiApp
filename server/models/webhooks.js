import Sequelize from 'sequelize';
import database from '../database';

const webhooks = database.define('webhooks', {
  id: {
    type: Sequelize.INTEGER(100),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  reference: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  flwref: { type: Sequelize.STRING(100), allowNull: true },
  status: { type: Sequelize.STRING(100), allowNull: true },
  event_type: { type: Sequelize.STRING(100), allowNull: true },
  requestBody: {
    type: Sequelize.BLOB(1000),
    allowNull: true,
  },
});

module.exports = webhooks;
