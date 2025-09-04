const { DataTypes }= require('sequelize');
const sequelize = require('../../config/db');

const Llamada = sequelize.define('Llamada', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    resultado: {
        type: DataTypes.ENUM('sin_respuesta', 'completada', 'no contestó', 'ocupado', 'cancelada'),
        defaultValue: 'sin_respuesta'
    },
    grabacion_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Llamada;