'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TestUsers', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Roles: {
        type: Sequelize.STRING,
      },
      PhotoUrl: {
        type: Sequelize.STRING,
      },
      FirstName: {
        type: Sequelize.STRING,
      },
      LastName: {
        type: Sequelize.STRING,
      },
      AccessToken: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TestUsers');
  },
};
