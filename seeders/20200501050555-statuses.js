"use strict";

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
      "statuses",
      [
        {
          id: "ab6902ce-0987-4ae5-8d48-630412d2f5fe",
          name: "进行中",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d6240b34-b862-4baf-866f-3416df36e834",
          name: "计划中",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d6240b34-b862-4baf-866f-3416df3de834",
          name: "已完成",
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
      "statuses",
      null,
      {}
    );
  },
};
