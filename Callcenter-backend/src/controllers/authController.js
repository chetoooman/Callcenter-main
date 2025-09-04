// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generarToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || user.state !== 'activo') {
            return res.status(401).json({ message: 'Usuario no encontrado o inactivo' });
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña inválida' });
        }

        // Actualizar fecha de último login
        user.lastLogin = new Date();
        await user.save();

        const token = generarToken(user);
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                state: user.state
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
