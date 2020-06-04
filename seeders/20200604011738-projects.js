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
      "projects",
      [
        {
          id: "570f41ad-3f83-47bf-be16-82f2d90694b3",
          name: "网络改造",
          date: "20190501",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          remarks: "备注信息",
          statusId: "d6240b34-b862-4baf-866f-3416df3de834",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "2d34f8b4-44aa-4d92-83c5-2c7c6c4245fc",
          date: "20190301",
          name: "网络改造",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          remarks: "备注信息",
          statusId: "d6240b34-b862-4baf-866f-3416df3de834",
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
      "projects",
      null,
      {}
    );
  },
};
