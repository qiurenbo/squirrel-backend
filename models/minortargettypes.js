"use strict";
module.exports = (sequelize, DataTypes) => {
  const minorTargetTypes = sequelize.define(
    "minorTargetTypes",
    {
      name: DataTypes.STRING,
      majorTargetTypeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
    },
    {}
  );
  minorTargetTypes.associate = function (models) {
    // associations can be defined here
  };
  return minorTargetTypes;
};
