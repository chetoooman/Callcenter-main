const express = require('express');
const router = express.Router();
const verificarToken = require('../../../middlewares/ANT/auth');
const verificarRol = require('../../../middlewares/ANT/rolMiddleware');
const {
  cambiarEstado,
  listarPausas,
  obtenerEstadoActual
} = require('../../controllers/agenteController');

router.use(verificarToken);
router.use(verificarRol(['agente', 'supervisor', 'admin', 'superadmin']));

router.post('/estado', cambiarEstado);
router.get('/estado', obtenerEstadoActual);
router.get('/pausas', listarPausas);

module.exports = router;
