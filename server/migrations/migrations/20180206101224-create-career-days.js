'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CareerDays', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Archived: {
        type: Sequelize.BOOLEAN,
      },
      EmployeeExternalId: {
        type: Sequelize.STRING,
      },
      UnitManagerExternalId: {
        type: Sequelize.STRING,
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
