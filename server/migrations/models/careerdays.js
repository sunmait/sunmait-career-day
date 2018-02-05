'use strict';
module.exports = (sequelize, DataTypes) => {
  var CareerDays = sequelize.define(
    'CareerDays',
    {
      id: DataTypes.STRING,
      Archived: DataTypes.BOOLEAN,
      EmployeeExternalId: DataTypes.STRING,
      UnitManagerExternalId: DataTypes.STRING,
      InterviewDate: DataTypes.DATE,
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
  return CareerDays;
};
