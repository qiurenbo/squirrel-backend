"use strict";
module.exports = (sequelize, DataTypes) => {
  const street = sequelize.define(
    "street",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      areaId: { type: Sequelize.STRING, allowNull: false },

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
  street.associate = function (models) {
    // associations can be defined here
  };
  return street;
};
