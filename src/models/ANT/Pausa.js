// File: src/models/Pausa.js
// Description: Definición del modelo de Pausa para la base de datos utilizando Sequelize.

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Pausa = sequelize.define('Pausa', {
  motivo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Pausa;
