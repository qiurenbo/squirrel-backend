"use strict";
module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define(
    "action",
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
  action.associate = function (models) {
    // associations can be defined here
  };
  return action;
};
