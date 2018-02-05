'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'CareerDays',
      [
        {
          id: 'I9fSWMePe7',
          Archived: true,
          EmployeeExternalId: 'PgZS0RYwZm',
          UnitManagerExternalId: 'XQnGIMhxvR',
          InterviewDate: new Date('December 17, 2017 15:00:00'),
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 21, 2017 11:41:33'),
        },
        {
          id: 'y53yADauac',
          Archived: true,
          EmployeeExternalId: 'PgZS0RYwZm',
          UnitManagerExternalId: 'XQnGIMhxvR',
          InterviewDate: new Date('December 31, 2017 15:00:00'),
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 'W1UMFCm8dZ',
          Archived: true,
          EmployeeExternalId: 'PgZS0RYwZm',
          UnitManagerExternalId: 'XQnGIMhxvR',
          InterviewDate: new Date('January 30, 2018 15:00:00'),
          CreatedAt: new Date('January 1, 2018 16:41:56'),
          UpdatedAt: new Date('November 21, 2018 11:41:33'),
        },
        {
          id: 'N36TV1d5dT',
          Archived: false,
          EmployeeExternalId: 'PgZS0RYwZm',
          UnitManagerExternalId: 'XQnGIMhxvR',
          InterviewDate: new Date('February 28, 2018 15:00:00'),
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 21, 2018 11:41:33'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CareerDays', null, {});
  },
};
