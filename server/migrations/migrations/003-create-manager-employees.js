'use strict';

const TABLE_NAME = 'ManagerEmployees';
const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      {
        tableName: TABLE_NAME,
        schema: SCHEMA_NAME,
      },
      {
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
      },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      tableName: TABLE_NAME,
      schema: SCHEMA_NAME,
    });
  },
};
