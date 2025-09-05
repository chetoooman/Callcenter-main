require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authRouter = require('./src/routes/authRoutes');
const sequelize = require('./src/config/db'); // Importa directamente

const app = express();
const PORT = process.env.PORT || 5000;

// Seguridad y utilidades
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limitar a 100 solicitudes por IP
}));

// Conectar a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Autenticación con la base de datos exitosa');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Rutas
app.use('/api/auth', authRouter);