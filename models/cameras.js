'use strict';
module.exports = (sequelize, DataTypes) => {
  const cameras = sequelize.define('cameras', {
    name: DataTypes.STRING
  }, {});
  cameras.associate = function(models) {
    // associations can be defined here
  };
  return cameras;
};