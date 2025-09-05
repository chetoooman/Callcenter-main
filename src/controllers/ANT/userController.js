const User = require("../models/user");
const bcrypt = require("bcrypt");

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    const { name, lastName, username, password, email, role, state, phone } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastName,
      username,
      password: hashedPassword,
      email,
      role,
      state,
      phone
    });

    res.status(201).json({ message: "Usuario creado exitosamente", user });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};
