'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Statuses', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Status: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Statuses');
  },
};
