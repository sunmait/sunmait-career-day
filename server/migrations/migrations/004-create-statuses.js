'use strict';

const TABLE_NAME = 'Statuses';
const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
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
        Status: {
          type: Sequelize.STRING,
        },
      },
    );

    return queryInterface.bulkInsert(
      { tableName: TABLE_NAME, schema: SCHEMA_NAME },
      [
        {
          id: 1,
          Status: 'In Progress',
        },
        {
          id: 2,
          Status: 'Active',
        },
        {
          id: 3,
          Status: 'Done',
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      tableName: TABLE_NAME,
      schema: SCHEMA_NAME,
    });
  },
};
