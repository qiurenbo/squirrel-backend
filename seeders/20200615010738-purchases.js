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
      "purchases",
      [
        {
          id: "570f41ad-3f83-17bf-bf16-82f2d90694b3",
          date: "20190501",
          projectName: "农家书屋手机",
          productName: "NFC手机",
          unitPrice: 1024.1,
          number: 35,
          totalPrice: 35843.5,
          source: "农家书屋统一经费",
          remarks: "备注信息",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "570f42ad-3f83-47bf-be16-92f2d90694b3",
          date: "20190501",
          projectName: "市民卡更换",
          productName: "市民卡读卡器",
          unitPrice: 2000,
          number: 15,
          totalPrice: 30000,
          source: "图星经费",
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
      "purchases",
      null,
      {}
    );
  },
};
