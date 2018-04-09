'use strict';
module.exports = (sequelize, DataTypes) => {
  var ManagerEmployees = sequelize.define(
    'ManagerEmployees',
    {
      UnitManagerId: DataTypes.INTEGER,
      EmployeeId: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return ManagerEmployees;
};
