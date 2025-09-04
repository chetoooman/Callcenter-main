const { Llamada } = require('../models');

const obtenerLlamadas = async (req, res) => {
  try {
    const llamadas = await Llamada.findAll({ order: [['fecha', 'DESC']] });
    res.json(llamadas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener llamadas' });
  }
};

const monitorearLlamada = async (req, res) => {
  const llamadaId = req.params.llamadaId;
  // Simulación por ahora
  res.json({ mensaje: `Monitoreando llamada ID: ${llamadaId}` });
};

module.exports = {
  obtenerLlamadas,
  monitorearLlamada
};
