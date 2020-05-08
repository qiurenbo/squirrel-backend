"use strict";
const moment = require("moment");
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
      "Orders",
      [
        {
          id: "f34702ca-fe03-406b-b078-af4ccdf5dbe1",
          date: moment().format("YYYYMMDD"),
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          actionId: "181d4a19-49a9-475e-bfdc-13f7e597eb4e",
          targetId: "a26ec00d-9dfa-43e8-8947-8098b4632b22",
          malfunctionId: "f6918a86-f0be-4145-84d6-a57389bddd1f",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "f34702ca-fe03-406b-b078-af4cddf5dbe1",
          date: "20200301",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          actionId: "181d4a19-49a9-475e-bfdc-13f7e597eb4e",
          targetId: "a26ec00d-9dfa-43e8-8947-8098b4632b22",
          malfunctionId: "45a21a3f-90b0-49de-8dab-5de833631ed7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f34702ca-ge03-406b-b078-af4cddf5dbe1",
          date: "19900301",
          addrId: "3f98b79b-e051-4878-9522-97bbc6a4db49",
          operatorId: "42ab3c40-2a44-4c9b-b951-49a5c49922ea",
          actionId: "181d4a19-49a9-475e-bfdc-13f7e597eb4e",
          targetId: "d6240b34-b862-4baf-866f-3416df36e834",
          malfunctionId: "526f8e69-dbea-459f-9c4f-4d39630dcee6",
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
      "Orders",
      null,
      {}
    );
  },
};
