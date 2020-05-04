"use strict";
module.exports = (sequelize, DataTypes) => {
  const Operator = sequelize.define(
    "Operator",
    {
      id: DataTypes.STRING,
      name: DataTypes.STRING,
      department: DataTypes.STRING,
      tel: DataTypes.STRING,
    },
    {}
  );
  Operator.associate = function (models) {
    // associations can be defined here
  };
  return Operator;
};
