const { Llamada, Cliente, Usuario } = require('../models');

const registrarLlamada = async (req, res) => {
  try {
    const { cliente_id, duracion, resultado, grabacion_url, observaciones } = req.body;
    const usuario_id = req.usuario.id;

    const llamada = await Llamada.create({
      usuario_id,
      cliente_id,
      duracion,
      resultado,
      grabacion_url,
      observaciones
    });

    res.status(201).json(llamada);
  } catch (err) {
    console.error(err);
    res.status(400).json({ mensaje: 'Error al registrar llamada' });
  }
};

const obtenerLlamadas = async (req, res) => {
  try {
    const llamadas = await Llamada.findAll({
      include: [Cliente, Usuario],
      order: [['fecha', 'DESC']]
    });
    res.json(llamadas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener llamadas' });
  }
};

const llamadasPorCliente = async (req, res) => {
  try {
    const llamadas = await Llamada.findAll({
      where: { cliente_id: req.params.id },
      include: [Usuario],
      order: [['fecha', 'DESC']]
    });
    res.json(llamadas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener llamadas del cliente' });
  }
};

const obtenerLlamadasPorAgente = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const llamadas = await Llamada.findAll({
      where: { usuario_id },
      include: [Cliente, Usuario],
      order: [['fecha', 'DESC']]
    });
    res.json(llamadas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener llamadas del agente' });
  }
};

module.exports = {
  registrarLlamada,
  obtenerLlamadas,
  llamadasPorCliente,
  obtenerLlamadasPorAgente
};
