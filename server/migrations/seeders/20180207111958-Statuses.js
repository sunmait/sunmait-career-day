'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Statuses',
      [
        {
          Status: 'In Progress',
        },
        {
          Status: 'Active',
        },
        {
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
