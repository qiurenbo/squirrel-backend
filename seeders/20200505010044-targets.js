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
      "targets",
      [
        {
          id: "ab6902ce-0987-4ae5-8d48-630412d2f5fe",
          name: "阿尔法迪——自助借还机",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d6240b34-b862-4baf-866f-3416df36e834",
          name: "TPLink——路由器",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a26ec00d-9dfa-43e8-8947-8098b4632b22",
          name: "海恒——自助借还机",
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
      "targets",
      null,
      {}
    );
  },
};
