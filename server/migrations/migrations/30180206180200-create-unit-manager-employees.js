'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UnitManagerEmployees', {
      UnitManagerExternalId: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: { model: 'TestUsers', key: 'id' },
      },
      EmployeeExternalId: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: { model: 'TestUsers', key: 'id' },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UnitManagerEmployees');
  },
};
