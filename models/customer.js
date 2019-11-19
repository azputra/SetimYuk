'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Customer extends Model { }
  Customer.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    platNo: DataTypes.STRING
  }, { sequelize });
  Customer.associate = function (models) {
    // associations can be defined here
  };
  return Customer;
};