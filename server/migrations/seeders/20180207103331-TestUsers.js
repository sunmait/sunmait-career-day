'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TestUsers',
      [
        {
          id: 1,
          Roles: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Vasya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
        {
          id: 2,
          Roles: 3,
          LastName: 'Pupkin',
          FirstName: 'Petya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
        {
          id: 3,
          Roles: 'employee',
          LastName: 'Tsvirko',
          FirstName: 'Alexandra',
          PhotoUrl:
            'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
          AccessToken: 'token',
        },
        {
          id: 4,
          Roles: 'manager',
          LastName: 'Stasivich',
          FirstName: 'Kirill',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TestUsers', null, {});
  },
};
