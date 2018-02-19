'use strict';
module.exports = (sequelize, DataTypes) => {
  var Statuses = sequelize.define(
    'Statuses',
    {
      id: DataTypes.INTEGER,
      Status: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Statuses;
};
