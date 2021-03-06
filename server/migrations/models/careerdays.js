'use strict';
module.exports = (sequelize, DataTypes) => {
  var CareerDays = sequelize.define(
    'CareerDays',
    {
      id: DataTypes.INTEGER,
      Archived: DataTypes.BOOLEAN,
      EmployeeId: DataTypes.UUID,
      UnitManagerId: DataTypes.UUID,
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
