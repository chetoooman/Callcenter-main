const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,    // 192.168.1.193
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
        // 👇 Agrega estas líneas:
        useUTC: false,
        dateFirst: 1
      }
    },
    // 👇 Agrega esta configuración:
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);

module.exports = sequelize;