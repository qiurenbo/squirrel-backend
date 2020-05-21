"use strict";
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define(
    "area",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {}
  );
  area.associate = function (models) {
    // associations can be defined here
  };
  return area;
};
