const express = require('express');
const router = express.Router();
const verificarToken = require('../../middlewares/auth');
const verificarRol = require('../../middlewares/rolMiddleware');
const {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarPorTelefono
} = require('../../controllers/clientController');

router.use(verificarToken);
router.use(verificarRol(['agente', 'supervisor', 'admin', 'super_admin']));

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);
router.get('/buscar/:numero', buscarPorTelefono); // búsqueda por número de teléfono

module.exports = router;
