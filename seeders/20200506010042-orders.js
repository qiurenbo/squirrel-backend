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
      "Targets",
      [
        {
          id: "f34702ca-fe03-406b-b078-af4ccdf5dbe1",
          date: "20200430",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          actionId: "181d4a19-49a9-475e-bfdc-13f7e597eb4e",
          targetId: "a26ec00d-9dfa-43e8-8947-8098b4632b22",
          malfunctionId: "45a21a3f-90b0-49de-8dab-5de833631ed7",
        },

        {
          id: "f34702ca-fe03-406b-b078-bf4ccdf5dbe1",
          date: "20200503",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          actionId: "181d4a19-49a9-475e-bfdc-13f7e597eb4e",
          targetId: "a26ec00d-9dfa-43e8-8947-8098b4632b22",
          malfunctionId: "45a21a3f-90b0-49de-8dab-5de833631ed7",
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
      "Orders",
      null,
      {}
    );
  },
};
