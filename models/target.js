"use strict";
module.exports = (sequelize, DataTypes) => {
  const target = sequelize.define(
    "target",
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
  target.associate = function (models) {
    // associations can be defined here
  };
  return target;
};
