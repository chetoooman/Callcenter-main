const express = require('express');
const router = express.Router();
const verificarToken = require('../../../middlewares/ANT/auth');
const verificarRol = require('../../../middlewares/ANT/rolMiddleware');
const { crearUsuario, listarUsuarios } = require('../../controllers/adminController');

router.use(verificarToken);
router.use(verificarRol(['admin', 'superadmin']));

router.post('/usuarios', crearUsuario);
router.get('/usuarios', listarUsuarios);

module.exports = router;
