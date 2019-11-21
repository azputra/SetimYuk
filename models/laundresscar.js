'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const hashPassword = require('../helper/hashPassword')
  class LaundressCar extends Model { }
  LaundressCar.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (laundress, options) => {
        laundress.password = hashPassword(laundress.password)
      }
    },
    sequelize
  });
  LaundressCar.associate = function (models) {
    // associations can be defined here
  };
  return LaundressCar;
};