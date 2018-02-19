'use strict';
module.exports = (sequelize, DataTypes) => {
  var UnitManagerEmployees = sequelize.define(
    'UnitManagerEmployees',
    {
      UnitManagerExternalId: DataTypes.INTEGER,
      EmployeeExternalId: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return UnitManagerEmployees;
};
