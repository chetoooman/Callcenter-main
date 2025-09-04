const express = require('express');
const router = express.Router();
const verificarToken = require('../../middlewares/auth');
const verificarRol = require('../../middlewares/rolMiddleware');
const { crearTipificacion, listarTipificaciones } = require('../../controllers/adminController');

router.use(verificarToken);
router.use(verificarRol(['admin', 'super_admin']));

router.get('/', verificarRol(['agente', 'supervisor', 'admin', 'super_admin']), listarTipificaciones);
router.post('/', verificarRol(['admin', 'super_admin']), crearTipificacion);

module.exports = router;
