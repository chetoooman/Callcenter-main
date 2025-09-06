const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ajusta la ruta si no está bien
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de login
router.post('/login', authController.login);

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { name, lastName, username, email, password, role } = req.body;

    // Verifica si el email ya existe
    const existe = await User.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: 'El email ya está registrado.' });
    }

    // Hashea la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Crea el usuario
    const user = await User.create({
      name,
      lastName,
      username,
      email,
      password_hash, // 👈 importante usar el mismo campo que en login
      role
    });

    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

module.exports = router;
