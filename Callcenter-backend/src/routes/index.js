const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
// Importar subrutas
router.use('/agente', require('./agente/agenteRoutes'));
router.use('/supervisor', require('./supervisor/supervisionRoutes'));
router.use('/admin/usuarios', require('./admin/adminRoutes'));
router.use('/llamadas', require('./shared/llamadaRoutes'));
router.use('/admin/tipificaciones', require('./admin/tipificacionesRouter'));
router.use('/clientes', require('./shared/clienteRouters'));

module.exports = router;
