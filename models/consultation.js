'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Consultation.init({
    ProfileUserId: DataTypes.INTEGER,
    ProfileDoctorId: DataTypes.INTEGER,
    symptom: DataTypes.STRING,
    diagnose: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};