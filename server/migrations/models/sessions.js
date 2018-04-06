'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sessions = sequelize.define(
    'Sessions',
    {
      id: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      AccessToken: DataTypes.STRING(700),
      RefreshToken: DataTypes.STRING,
      LastRefresh: DataTypes.DATE,
      ExpiresIn: DataTypes.DATE,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Sessions;
};
