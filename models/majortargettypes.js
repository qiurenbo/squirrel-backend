'use strict';
module.exports = (sequelize, DataTypes) => {
  const majorTargetTypes = sequelize.define('majorTargetTypes', {
    name: DataTypes.STRING
  }, {});
  majorTargetTypes.associate = function(models) {
    // associations can be defined here
  };
  return majorTargetTypes;
};