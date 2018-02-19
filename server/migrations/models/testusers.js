'use strict';
module.exports = (sequelize, DataTypes) => {
  var TestUsers = sequelize.define(
    'TestUsers',
    {
      id: DataTypes.INTEGER,
      Roles: DataTypes.STRING,
      LastName: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      PhotoUrl: DataTypes.STRING,
      AccessToken: DataTypes.STRING,
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
