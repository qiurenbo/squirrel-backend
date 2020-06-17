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
      "distributes",
      [
        {
          id: "570f41ad-3f83-17bf-bf16-82f2d90694b3",
          date: "20190501",
          number: 1,
          purchaseId: "570f41ad-3f83-17bf-bf16-82f2d90694b3",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          receiver: "金穗",
          remarks: "备注信息",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "570f54ad-3f83-18bf-bf16-82f2d12694b3",
          date: "20190501",
          number: 1,
          purchaseId: "570f41ad-3f83-17bf-bf16-82f2d90694b3",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          receiver: "金穗",
          remarks: "备注信息",
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
      "distributes",
      null,
      {}
    );
  },
};
