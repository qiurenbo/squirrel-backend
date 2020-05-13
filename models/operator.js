"use strict";
module.exports = (sequelize, DataTypes) => {
  const Operator = sequelize.define(
    "operator",
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
      department: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
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
  Operator.associate = function (models) {
    // associations can be defined here
  };
  return Operator;
};
