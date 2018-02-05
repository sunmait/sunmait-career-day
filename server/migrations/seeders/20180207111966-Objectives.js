'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Objectives',
      [
        {
          id: 'qopICrgj7h',
          Text: 'test',
          CareerDayId: 'I9fSWMePe7',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 1, 2017 16:41:56'),
        },
        {
          id: 'qgP9UxpjPn',
          Text: 'test',
          CareerDayId: 'I9fSWMePe7',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('November 1, 2017 16:41:56'),
          UpdatedAt: new Date('November 1, 2017 16:41:56'),
        },
        {
          id: '8JS140649M',
          Text: 'test',
          CareerDayId: 'y53yADauac',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },
        {
          id: 'jpWfMangEX',
          Text: 'test',
          CareerDayId: 'y53yADauac',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },
        {
          id: 'P87StAYXMW',
          Text: 'test',
          CareerDayId: 'W1UMFCm8dZ',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },
        {
          id: 'EphDDF2Mi4',
          Text: 'test',
          CareerDayId: 'W1UMFCm8dZ',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 18, 2017 16:41:56'),
        },

        {
          id: 'v2SfgXsSdQ',
          Text: 'objective 1',
          CareerDayId: 'N36TV1d5dT',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
        {
          id: 'DumQ3b0PMa',
          Text: 'objective 2',
          CareerDayId: 'N36TV1d5dT',
          StatusId: 'S0m10t12aO',
          Progress: 1,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
        {
          id: 'kbNusIeCT3',
          Text: 'objective 3',
          CareerDayId: 'N36TV1d5dT',
          StatusId: 'SMfEX1aMX4',
          Progress: 0.76,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
        {
          id: 'L3JXc98B7c',
          Text: 'objective 3',
          CareerDayId: 'N36TV1d5dT',
          StatusId: 'ogGrRJpbY8',
          Progress: 0,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 1, 2018 16:41:56'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Objectives', null, {});
  },
};
