'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      AccessToken: {
        type: Sequelize.STRING(700),
        allowNull: false,
      },
      RefreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LastRefresh: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ExpiresIn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sessions');
  },
};
