'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProgressObjective = sequelize.define('ProgressObjectives', {
    id: DataTypes.INTEGER,
    ObjectiveId: DataTypes.NUMBER,
    Progress: DataTypes.NUMBER,
    Description: DataTypes.STRING
  }, {});
  ProgressObjective.associate = function(models) {
    // associations can be defined here
  };
  return ProgressObjective;
};