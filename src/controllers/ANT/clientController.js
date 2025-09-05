const { Cliente } = require('../models');

const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener clientes' });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener cliente' });
  }
};

const crearCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    console.error(err);
    res.status(400).json({ mensaje: 'Error al crear cliente', error: err.message });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

    await cliente.update(req.body);
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al actualizar cliente', error: err.message });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

    await cliente.destroy();
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente' });
  }
};

// clientController.js
const buscarPorTelefono = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ where: { telefono: req.params.numero } });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar cliente' });
  }
};


module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente, 
  buscarPorTelefono
};
