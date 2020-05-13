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
      "addrs",
      [
        {
          id: "fe71e64f-a583-47a0-84b3-828f5b0f0b14",
          name: "总馆外借",
          addr: "海盐塘路339号",
          tel: "82535009",
          type: "部门",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          name: "普光村",
          addr: "海盐塘路339号",
          tel: "82555108",
          type: "村流通",
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
      "addrs",
      null,
      {}
    );
  },
};
