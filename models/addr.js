"use strict";
module.exports = (sequelize, DataTypes) => {
  const Addr = sequelize.define(
    "addr",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Addr.associate = function (models) {
    // associations can be defined here
  };
  return Addr;
};
