'use strict';
module.exports = (sequelize, DataTypes) => {
  var Objectives = sequelize.define(
    'Objectives',
    {
      id: DataTypes.INTEGER,
      Title: DataTypes.STRING,
      Description: DataTypes.STRING,
      CareerDayId: DataTypes.INTEGER,
      StatusId: DataTypes.INTEGER,
      Progress: DataTypes.DOUBLE,
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
  return Objectives;
};
