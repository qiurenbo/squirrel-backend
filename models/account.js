"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "account",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Account.associate = function (models) {
    // associations can be defined here
  };
  return Account;
};
