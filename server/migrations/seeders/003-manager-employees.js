'use strict';

const TABLE_NAME = 'ManagerEmployees';
const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      { tableName: TABLE_NAME, schema: SCHEMA_NAME },
      [
        {
          UnitManagerId: '05323518-63cb-4fcc-b5e2-aae56b89fec5',
          EmployeeId: '02d1437c-4c60-4109-9c9a-473bb36e74bb',
        },
        {
          UnitManagerId: '05323518-63cb-4fcc-b5e2-aae56b89fec5',
          EmployeeId: 'c64e0924-d531-421d-a415-f717ac91fbfa',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      { tableName: TABLE_NAME, schema: SCHEMA_NAME },
      null,
      {}
    );
  },
};
