'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ReqRespSignaturess', {
      id: {
        type: Sequelize.INTEGER(100),
        autoincrement: true,
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
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ReqRespSignaturess');
  },
};
