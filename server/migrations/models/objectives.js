'use strict';
module.exports = (sequelize, DataTypes) => {
  var Objectives = sequelize.define(
    'Objectives',
    {
      id: DataTypes.STRING,
      Text: DataTypes.STRING,
      CareerDayId: DataTypes.STRING,
      StatusId: DataTypes.STRING,
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
