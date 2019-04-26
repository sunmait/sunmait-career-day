'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ProgressObjectives',
      [
        {
          ObjectiveId: 10,
          Progress: 0.2,
          Description: "new migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        }, 
        {
          ObjectiveId: 10,
          Progress: 0.7,
          Description: "MY!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        },
        {
          ObjectiveId: 10,
          Progress: 0.1,
          Description: "migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        }, 
        {
          ObjectiveId: 10,
          Progress: 0.1,
          Description: "test for migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        },
        {
          ObjectiveId: 10,
          Progress: 0.2,
          Description: "career day!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        }, 
        {
          ObjectiveId: 4,
          Progress: 0.7,
          Description: "MY new migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        },
        {
          ObjectiveId: 8,
          Progress: 0.6,
          Description: "new migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        }, 
        {
          ObjectiveId: 10,
          Progress: 0.07,
          Description: "MY new migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        },
        {
          ObjectiveId: 4,
          Progress: 0.2,
          Description: "MY new migration!",
          createdAt: new Date('April 10, 2019 16:41:56'),
          updatedAt: new Date('April 10, 2019 16:41:56'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProgressObjectives', null, {});
  }
};
