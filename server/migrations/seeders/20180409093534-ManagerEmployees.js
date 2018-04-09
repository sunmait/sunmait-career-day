'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ManagerEmployees',
      [
        {
          UnitManagerId: 4,
          EmployeeId: 1,
        },
        {
          UnitManagerId: 4,
          EmployeeId: 2,
        },
        {
          UnitManagerId: 4,
          EmployeeId: 3,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ManagerEmployees', null, {});
  },
};
