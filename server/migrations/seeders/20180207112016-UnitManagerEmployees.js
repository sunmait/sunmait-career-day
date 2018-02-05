'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'UnitManagerEmployees',
      [
        {
          UnitManagerExternalId: 'XQnGIMhxvR',
          EmployeeExternalId: 'OX81b5kt2o',
        },
        {
          UnitManagerExternalId: 'XQnGIMhxvR',
          EmployeeExternalId: '15asd8zxc',
        },
        {
          UnitManagerExternalId: 'XQnGIMhxvR',
          EmployeeExternalId: 'PgZS0RYwZm',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UnitManagerEmployees', null, {});
  },
};
