'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('webhooks', {
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
      event_type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      requestBody: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('webhooks');
  },
};
