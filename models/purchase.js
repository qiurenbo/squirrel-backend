'use strict';
module.exports = (sequelize, DataTypes) => {
  const purchase = sequelize.define('purchase', {
    date: DataTypes.STRING
  }, {});
  purchase.associate = function(models) {
    // associations can be defined here
  };
  return purchase;
};