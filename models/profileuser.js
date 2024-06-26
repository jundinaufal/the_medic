'use strict';
const {
  Model
} = require('sequelize');
// const { options } = require('../routers');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class ProfileUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileUser.belongsTo(models.User)
    }

    get age() {
      return Math.floor((new Date() - this.dateFound) / (1000 * 60 * 60 * 24 * 365));
    }
  }
  ProfileUser.init({
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProfileUser',
  });
  ProfileUser.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)

    instance.password = hash
  })
  return ProfileUser;
};