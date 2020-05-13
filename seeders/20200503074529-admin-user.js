"use strict";
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      "accounts",
      [
        {
          id: "2e06be13-c524-4adf-bee7-e7e0c43896df",
          username: "qiurenbo",
          password: crypto
            .createHmac("sha256", process.env.CRYPRTO_KEY)
            .update("123456")
            .digest("base64"),
          email: "qiurenbo@mail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */ return queryInterface.bulkDelete(
      "accounts",
      null,
      {}
    );
  },
};
