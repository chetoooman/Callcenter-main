const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
  try {
    const { nombre, username, correo, password, rol } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({
      nombre,
      username,
      correo,
      password_hash,
      rol
    });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error: err.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

const { Pausa } = require('../models');

const crearPausa = async (req, res) => {
  try {
    const nueva = await Pausa.create({ motivo: req.body.motivo });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear motivo de pausa' });
  }
};
const { Tipificacion } = require('../models');

const crearTipificacion = async (req, res) => {
  try {
    const t = await Tipificacion.create({ nombre: req.body.nombre });
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear tipificación' });
  }
};

const listarTipificaciones = async (req, res) => {
  try {
    const t = await Tipificacion.findAll();
    res.json(t);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al listar tipificaciones' });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  crearPausa,
  crearTipificacion,
  listarTipificaciones
};
