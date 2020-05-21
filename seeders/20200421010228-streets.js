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
      "streets",
      [
        {
          id: "330402007",
          name: "建设街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402008",
          name: "解放街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402009",
          name: "新嘉街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402010",
          name: "南湖街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402011",
          name: "新兴街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402012",
          name: "城南街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402013",
          name: "东栅街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402014",
          name: "长水街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402015",
          name: "七星街道",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402100",
          name: "凤桥镇",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402101",
          name: "余新镇",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402103",
          name: "新丰镇",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330402105",
          name: "大桥镇",
          areaId: "330402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411002",
          name: "新城街道",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411003",
          name: "嘉北街道",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411004",
          name: "塘汇街道",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411005",
          name: "高照街道",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411101",
          name: "王江泾镇",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411103",
          name: "油车港镇",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411104",
          name: "新塍镇",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411105",
          name: "王店镇",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "330411106",
          name: "洪合镇",
          areaId: "330411",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */ return queryInterface.bulkDelete(
      "streets",
      null,
      {}
    );
  },
};
