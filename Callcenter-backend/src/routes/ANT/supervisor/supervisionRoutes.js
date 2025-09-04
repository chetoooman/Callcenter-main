const express = require('express');
const router = express.Router();
const verificarToken = require('../../../middlewares/ANT/auth');
const verificarRol = require('../../../middlewares/ANT/rolMiddleware');
const { obtenerLlamadas, monitorearLlamada } = require('../../controllers/supervisionController');

router.use(verificarToken);
router.use(verificarRol(['supervisor', 'admin', 'superadmin']));

router.get('/llamadas', obtenerLlamadas);
router.post('/monitorear/:llamadaId', monitorearLlamada); // susurro, escucha, chat, etc.

module.exports = router;
