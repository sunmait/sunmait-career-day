'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
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
      Email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      PasswordHash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      EmailVerified: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Users');
  },
};
