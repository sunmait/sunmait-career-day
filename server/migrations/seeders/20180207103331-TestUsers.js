'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          Roles: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Vasya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          Email: 'asdad@gmail.com',
          PasswordHash:
            '6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 2,
          Roles: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Petya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          Email: 'tok@n.jgen',
          PasswordHash:
            'D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 3,
          Roles: 'employee',
          LastName: 'Tsvirko',
          FirstName: 'Alexandra',
          PhotoUrl:
            'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
          Email: 'toke@n.jg',
          PasswordHash:
            '4E07408562BEDB8B60CE05C1DECFE3AD16B72230967DE01F640B7E4729B49FCE',
          EmailVerified: true,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 4,
          Roles: 'manager',
          LastName: 'Stasevich',
          FirstName: 'Kirill',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          Email: 'token@n.jg',
          PasswordHash:
            '4B227777D4DD1FC61C6F884F48641D02B4D121D3FD328CB08B5531FCACDABF8A',
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
