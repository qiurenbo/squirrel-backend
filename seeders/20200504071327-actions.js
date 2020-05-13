"use strict";
const uuidv4 = require("uuid").v4;
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
    */ return queryInterface.bulkInsert(
      "actions",
      [
        {
          id: "181d4a19-49a9-475e-bfdc-13f7e597eb4e",
          name: "重新启动",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e494ed3e-b65d-4c5d-9f74-8e34ecb61dae",
          name: "重新安装",
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
    */
    return queryInterface.bulkDelete("actions", null, {});
  },
};
