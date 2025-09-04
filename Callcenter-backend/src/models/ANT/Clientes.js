const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Cliente = sequelize.define('Cliente', {
  nombre: DataTypes.STRING,
  telefono: { type: DataTypes.STRING, unique: true },
  correo: { type: DataTypes.STRING, unique: true },
  empresa: DataTypes.STRING,
  notas: DataTypes.TEXT,
});

module.exports = Cliente;