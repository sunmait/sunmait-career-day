'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'CareerDays',
      [
        {
          id: 1,
          Archived: true,
          EmployeeExternalId: 1,
          UnitManagerExternalId: 4,
          InterviewDate: new Date('December 17, 2017 15:00:00'),
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 21, 2017 11:41:33'),
        },
        {
          id: 2,
          Archived: true,
          EmployeeExternalId: 1,
          UnitManagerExternalId: 4,
          InterviewDate: new Date('December 31, 2017 15:00:00'),
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 3,
          Archived: true,
          EmployeeExternalId: 1,
          UnitManagerExternalId: 4,
          InterviewDate: new Date('January 30, 2018 15:00:00'),
          CreatedAt: new Date('January 1, 2018 16:41:56'),
          UpdatedAt: new Date('November 21, 2018 11:41:33'),
        },
        {
          id: 4,
          Archived: false,
          EmployeeExternalId: 1,
          UnitManagerExternalId: 4,
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
