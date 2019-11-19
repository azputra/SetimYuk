'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model { }
  Product.init({
    nameProduct: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, { sequelize });
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};