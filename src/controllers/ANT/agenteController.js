const { Usuario, Pausa, AgenteEstado } = require('../models');
const { Op } = require('sequelize');

const cambiarEstado = async (req, res) => {
  const usuario_id = req.usuario.id;
  const { estado, pausa_id } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Finalizar el último estado activo
    await AgenteEstado.update(
      { fecha_fin: new Date() },
      {
        where: {
          usuario_id,
          fecha_fin: { [Op.is]: null }
        }
      }
    );

    // Registrar el nuevo estado
    await AgenteEstado.create({
      usuario_id,
      estado,
      pausa_id: pausa_id || null
    });

    // Actualizar el estado actual del usuario
    usuario.estado = estado;
    await usuario.save();

    res.json({ mensaje: 'Estado actualizado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al cambiar estado del agente' });
  }
};

const listarPausas = async (req, res) => {
  try {
    const pausas = await Pausa.findAll();
    res.json(pausas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener motivos de pausa' });
  }
};

const obtenerEstadoActual = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.json({ estado: usuario.estado });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener estado del agente' });
  }
};

module.exports = {
  cambiarEstado,
  listarPausas,
  obtenerEstadoActual
};
