'use strict';
module.exports = (sequelize, DataTypes) => {
  var UnitManagerEmployees = sequelize.define('UnitManagerEmployees', {
    UnitManagerExternalId: DataTypes.STRING,
    EmployeeExternalId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UnitManagerEmployees;
};