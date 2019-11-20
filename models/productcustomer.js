'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ProductCustomer extends Model { }

  ProductCustomer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, { sequelize });
  ProductCustomer.associate = function (models) {
    // associations can be defined here
  };
  return ProductCustomer;
};