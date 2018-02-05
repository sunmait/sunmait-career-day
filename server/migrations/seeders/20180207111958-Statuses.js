'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Statuses',
      [
        {
          id: 'SMfEX1aMX4',
          Status: 'In Progress',
        },
        {
          id: 'ogGrRJpbY8',
          Status: 'Active',
        },
        {
          id: 'S0m10t12aO',
          Status: 'Done',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  },
};
