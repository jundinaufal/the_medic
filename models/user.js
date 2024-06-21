'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routers');
const profiledoctor = require('./profiledoctor');
const profileuser = require('./profileuser');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.ProfileUser)
      User.hasOne(models.ProfileDoctor)
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)

    instance.password = hash
    
    if (profiledoctor === 'Doctor') {
      instance.role = 'User'
    } else {
      instance.role = 'Doctor';
    }
    
    if (profileuser === 'User') {
      instance.role = 'Doctor'
    } else {
      instance.role = 'User';
    }

  });
  return User;
};