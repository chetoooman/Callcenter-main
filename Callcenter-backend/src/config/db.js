require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('DB_HOST:', process.env.DB_HOST); // Verifica que la IP se imprime correctamente

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // <-- debe ser 'host'
    dialect: 'mssql',
    port: process.env.DB_PORT,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      }
    },
    logging: false
  }
);

module.exports = sequelize;