const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Importar modelos y asociaciones
const db = require('./src/models/associations');

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Conectar BD
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a SQL Server'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Sincronizar modelos
sequelize.sync({ alter: true })
  .then(() => console.log('📦 Modelos sincronizados'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

module.exports = app; // opcional si haces testing
