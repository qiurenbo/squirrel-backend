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
    */

    return queryInterface.bulkInsert(
      "operators",
      [
        {
          id: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          name: "郭云峰",
          tel: "17838431923",
          department: "技术部",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "7068ef94-3aef-45cf-b4bd-7e5306501f30",
          name: "陆志强",
          tel: "13838421923",
          department: "技术部",
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
    return queryInterface.bulkDelete("operators", null, {});
  },
};
