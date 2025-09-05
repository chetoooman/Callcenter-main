const User = require('../models/user'); // 👈 importa tu modelo real
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar usuario
    const usuario = await User.findOne({ where: { username } });

    if (!usuario || usuario.state !== 'activo') {
      return res.status(401).json({ mensaje: 'Usuario no encontrado o inactivo' });
    }

    // Validar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.name, rol: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.name,
        rol: usuario.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };
