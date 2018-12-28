'use strict';
module.exports = (sequelize, DataTypes) => {
  var ManagerEmployees = sequelize.define(
    'ManagerEmployees',
    {
      UnitManagerId: DataTypes.UUID,
      EmployeeId: DataTypes.UUID,
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
