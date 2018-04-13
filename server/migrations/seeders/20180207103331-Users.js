'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          Role: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Vasya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          Email: 'pupkin@mail.com',
          PasswordHash: 'sha1$80e57d04$1$8b7d4c62c2723c3725cb1be59ff9d62e0a88ccc9',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 2,
          Role: 'employee',
          LastName: 'Pipkin',
          FirstName: 'Petya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          Email: 'pipkin@mail.com',
          PasswordHash: 'sha1$80e57d04$1$8b7d4c62c2723c3725cb1be59ff9d62e0a88ccc9',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 3,
          Role: 'employee',
          LastName: 'Tsvirko',
          FirstName: 'Alexandra',
          PhotoUrl: 'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
          Email: 'tsvirko1997@mail.ru',
          PasswordHash: 'sha1$80e57d04$1$8b7d4c62c2723c3725cb1be59ff9d62e0a88ccc9',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 4,
          Role: 'manager',
          LastName: 'Stasevich',
          FirstName: 'Kirill',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          Email: 'stasevich@mail.com',
          PasswordHash: 'sha1$80e57d04$1$8b7d4c62c2723c3725cb1be59ff9d62e0a88ccc9',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
