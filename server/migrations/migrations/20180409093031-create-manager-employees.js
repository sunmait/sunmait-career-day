'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ManagerEmployees', {
      UnitManagerId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      EmployeeId: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ManagerEmployees');
  },
};
