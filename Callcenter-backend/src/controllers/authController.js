const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, lastName, username, password, email, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastName,
      username,
      password: hashedPassword,
      email,
      role
    });

    res.status(201).json({ message: '✅ Usuario creado', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ message: '✅ Login correcto', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Error en el login' });
  }
};

module.exports = { register, login };
