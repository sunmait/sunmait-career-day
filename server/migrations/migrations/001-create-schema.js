'use strict';

const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema(SCHEMA_NAME);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema(SCHEMA_NAME);
  },
};
