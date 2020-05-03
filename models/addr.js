'use strict';
module.exports = (sequelize, DataTypes) => {
  const Addr = sequelize.define('Addr', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Addr.associate = function(models) {
    // associations can be defined here
  };
  return Addr;
};