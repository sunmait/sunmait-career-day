'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Statuses',
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
    return queryInterface.bulkDelete('Statuses', null, {});
  },
};
