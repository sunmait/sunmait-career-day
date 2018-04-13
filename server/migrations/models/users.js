'use strict';
module.exports = (sequelize, DataTypes) => {
  var TestUsers = sequelize.define(
    'Users',
    {
      id: DataTypes.INTEGER,
      Role: DataTypes.STRING,
      LastName: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      PhotoUrl: DataTypes.STRING,
      Email: DataTypes.STRING,
      PasswordHash: DataTypes.STRING,
      EmailVerified: DataTypes.BOOLEAN,
      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return TestUsers;
};
