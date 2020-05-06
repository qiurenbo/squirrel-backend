"use strict";
module.exports = (sequelize, DataTypes) => {
  const malfunction = sequelize.define(
    "malfunction",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  malfunction.associate = function (models) {
    // associations can be defined here
  };
  return malfunction;
};
