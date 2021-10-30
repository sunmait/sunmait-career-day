'use strict';

const TABLE_NAME = 'CareerDays';
const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      {
        tableName: TABLE_NAME,
        schema: SCHEMA_NAME,
      },
      {
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
        EmployeeId: {
          type: Sequelize.UUID,
        },
        UnitManagerId: {
          type: Sequelize.UUID,
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
