'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Customer extends Model {
    checkFullname() {
      return `${this.firstName} ${this.lastName}`
    }
  }
  Customer.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    platNo: DataTypes.STRING,
    email: DataTypes.STRING
  }, { sequelize });
  Customer.associate = function (models) {
    // associations can be defined here
    Customer.belongsToMany(models.Product, { through: models.ProductCustomer })
  };
  return Customer;
};