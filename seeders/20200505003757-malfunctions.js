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
      "malfunctions",
      [
        {
          id: "f6918a86-f0be-4145-84d6-a57389bddd1f",
          name: "无法开机",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "526f8e69-dbea-459f-9c4f-4d39630dcee6",
          name: "界面黑屏",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "45a21a3f-90b0-49de-8dab-5de833631ed7",
          name: "软件闪退",
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
      "malfunctions",
      null,
      {}
    );
  },
};
