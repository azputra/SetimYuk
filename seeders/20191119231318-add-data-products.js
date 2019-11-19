'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        nameProduct: 'Cuci Ban',
        price: 15000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameProduct: 'Cuci Salju',
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameProduct: 'Cuci Biasa',
        price: 35000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameProduct: 'Cuci Body',
        price: 25000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
