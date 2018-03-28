'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Objectives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique : true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Title: {
        type: Sequelize.STRING,
      },
      Description: {
        type: Sequelize.STRING,
      },
      CareerDayId: {
        type: Sequelize.INTEGER,
        references: { model: 'CareerDays', key: 'id' },
        onDelete: 'CASCADE',
      },
      StatusId: {
        type: Sequelize.INTEGER,
        references: { model: 'Statuses', key: 'id' },
      },
      Progress: {
        type: Sequelize.FLOAT ,
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
    return queryInterface.dropTable('Objectives');
  },
};
