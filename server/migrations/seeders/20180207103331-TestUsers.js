'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TestUsers',
      [
        {
          id: 'OX81b5kt2o',
          Roles: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Vasya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
        {
          id: '15asd8zxc',
          Roles: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Petya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
        {
          id: 'PgZS0RYwZm',
          Roles: 'employee',
          LastName: 'Tsvirko',
          FirstName: 'Alexandra',
          PhotoUrl:
            'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
          AccessToken: 'token',
        },
        {
          id: 'XQnGIMhxvR',
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
