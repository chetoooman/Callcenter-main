const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD.replace(/"/g, ''), // Elimina comillas si existen
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // Para Azure, puedes poner false si no usas Azure
        trustServerCertificate: true // Para desarrollo local
      }
    },
    logging: false
  }
);

module.exports = sequelize;