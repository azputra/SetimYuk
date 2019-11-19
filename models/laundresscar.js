'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class LaundressCar extends Model { }
  LaundressCar.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, { sequelize });
  LaundressCar.associate = function (models) {
    // associations can be defined here
  };
  return LaundressCar;
};