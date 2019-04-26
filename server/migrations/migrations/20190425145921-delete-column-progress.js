'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Objectives', 'Progress');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Objectives',
     'Progress',
      {
        type: Sequelize.FLOAT
      }
    );
  }
};
