"use strict";
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define(
    "status",
    {
      id: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {}
  );
  status.associate = function (models) {
    // associations can be defined here
  };
  return status;
};
