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
      "minorTargetTypes",
      [
        {
          id: "eae76e06-05d0-4d15-86db-7d374cb6ce59",
          name: "安防",
          majorTargetTypeId: "79d97f77-aff4-4832-9a19-fb48951af21a",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "35343096-65e5-4ee8-a786-f9098770c5de",
          name: "计算机",
          majorTargetTypeId: "79d97f77-aff4-4832-9a19-fb48951af21a",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "884e05c6-8a94-4696-bfd0-9e4e074c2137",
          name: "网络设备",
          majorTargetTypeId: "79d97f77-aff4-4832-9a19-fb48951af21a",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "7050231d-146d-4196-be33-dc330fb8ddd3",
          name: "业务系统",
          majorTargetTypeId: "35343096-65e5-4ee8-a786-f9098770c5de",
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
