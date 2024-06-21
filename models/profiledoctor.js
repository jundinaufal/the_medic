'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class ProfileDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileDoctor.belongsTo(models.User)
    }

    get age() {
      return Math.floor((new Date() - this.dateOfBirth) / (1000 * 60 * 60 * 24 * 365));
    }
  }
  ProfileDoctor.init({
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    classification: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProfileDoctor',
  });
  ProfileDoctor.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)

    instance.password = hash
  })
  return ProfileDoctor;
};