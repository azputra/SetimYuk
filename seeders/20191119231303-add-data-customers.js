'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [
      {
        firstName: "ahmad",
        lastName: "zuliansyah",
        platNo: "B 4332 FFU",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "zuli",
        lastName: "ansyah",
        platNo: "B 4512 VUU",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "putra",
        lastName: "zuli",
        platNo: "K 3455 VDU",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "zul",
        lastName: "damha",
        platNo: "D 8765 BBF",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "iluz",
        lastName: "artup",
        platNo: "BG 9764 ASD",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
