// File: src/models/Tipificacion.js
// Description: Definición del modelo de Tipificación para la base de datos utilizando Sequelize.
// Se importa el módulo Sequelize y la configuración de la base de datos desde el archivo db.js.
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
// Se define el modelo de Tipificación utilizando Sequelize
// Se establece la propiedad nombre como un campo de tipo cadena y no nulo
// IMPORTANTE: Asegurarse de que el nombre del modelo sea singular y en mayúscula al inicio
// para que Sequelize lo reconozca correctamente al crear la tabla en la base de datos
// si ya existe la tabla en la base de datos, Sequelize no la volverá a crear
const Tipificacion = sequelize.define('Tipificacion', {
  // Definición de los atributos del modelo
  // Se establece la propiedad nombre como un campo de tipo cadena y no nulo
  nombre: {
    type: DataTypes.STRING,// Nombre de la tipificación de tipo cadena
    allowNull: false
  }
});
// Se sincroniza el modelo con la base de datos
module.exports = Tipificacion;
