const express = require('express');
const router = express.Router();
const verificarToken = require('../../../middlewares/ANT/auth');
const {
  registrarLlamada,
  obtenerLlamadas,
  llamadasPorCliente,
  obtenerLlamadasPorAgente
} = require('../../controllers/llamadaController');

router.use(verificarToken);

router.post('/', registrarLlamada);
router.get('/', obtenerLlamadas);
router.get('/mis-llamadas', obtenerLlamadasPorAgente);
router.get('/:id', llamadasPorCliente);

module.exports = router;