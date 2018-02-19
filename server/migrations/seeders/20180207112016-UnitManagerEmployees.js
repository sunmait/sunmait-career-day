'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'UnitManagerEmployees',
      [
        {
          UnitManagerExternalId: 4,
          EmployeeExternalId: 1,
        },
        {
          UnitManagerExternalId: 4,
          EmployeeExternalId: 2,
        },
        {
          UnitManagerExternalId: 4,
          EmployeeExternalId: 3,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UnitManagerEmployees', null, {});
  },
};
