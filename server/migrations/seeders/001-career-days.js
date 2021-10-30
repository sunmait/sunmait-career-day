'use strict';

const TABLE_NAME = 'CareerDays';
const SCHEMA_NAME = process.env.DB_SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      { tableName: TABLE_NAME, schema: SCHEMA_NAME },
      [
        {
          Archived: true,
          EmployeeId: '02d1437c-4c60-4109-9c9a-473bb36e74bb',
          UnitManagerId: '05323518-63cb-4fcc-b5e2-aae56b89fec5',
          InterviewDate: new Date('December 17, 2017 15:00:00'),
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 21, 2017 11:41:33'),
        },
        {
          Archived: true,
          EmployeeId: '02d1437c-4c60-4109-9c9a-473bb36e74bb',
          UnitManagerId: '05323518-63cb-4fcc-b5e2-aae56b89fec5',
          InterviewDate: new Date('December 31, 2017 15:00:00'),
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          Archived: true,
          EmployeeId: '02d1437c-4c60-4109-9c9a-473bb36e74bb',
          UnitManagerId: '05323518-63cb-4fcc-b5e2-aae56b89fec5',
          InterviewDate: new Date('January 30, 2018 15:00:00'),
          CreatedAt: new Date('January 1, 2018 16:41:56'),
          UpdatedAt: new Date('November 21, 2018 11:41:33'),
        },
        {
          Archived: false,
          EmployeeId: '02d1437c-4c60-4109-9c9a-473bb36e74bb',
          UnitManagerId: '05323518-63cb-4fcc-b5e2-aae56b89fec5',
          InterviewDate: new Date('February 28, 2018 15:00:00'),
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 21, 2018 11:41:33'),
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
