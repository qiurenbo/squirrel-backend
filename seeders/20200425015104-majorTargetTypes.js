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
    */
    return queryInterface.bulkInsert(
      "majorTargetTypes",
      [
        {
          id: "79d97f77-aff4-4832-9a19-fb48951af21a",
          name: "硬件",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "35343096-65e5-4ee8-a786-f9098770c5de",
          name: "软件",
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
  },
};
