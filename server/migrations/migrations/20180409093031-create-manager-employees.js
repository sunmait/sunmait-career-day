'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ManagerEmployees', {
      UnitManagerId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      EmployeeId: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ManagerEmployees');
  },
};
