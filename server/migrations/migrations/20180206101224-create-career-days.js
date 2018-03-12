'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CareerDays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      Archived: {
        type: Sequelize.BOOLEAN,
      },
      EmployeeExternalId: {
        type: Sequelize.INTEGER,
      },
      UnitManagerExternalId: {
        type: Sequelize.INTEGER,
      },
      InterviewDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CareerDays');
  },
};
