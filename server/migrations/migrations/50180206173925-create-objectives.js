'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Objectives', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Text: {
        type: Sequelize.STRING,
      },
      CareerDayId: {
        type: Sequelize.STRING,
        references: { model: 'CareerDays', key: 'id' },
      },
      StatusId: {
        type: Sequelize.STRING,
        references: { model: 'Statuses', key: 'id' },
      },
      Progress: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Objectives');
  },
};
