const express = require('express');
const router = express.Router();
const verificarToken = require('../../middlewares/auth');
const verificarRol = require('../../middlewares/rolMiddleware');
const { crearPausa } = require('../../controllers/adminController');

router.use(verificarToken);
router.use(verificarRol(['admin', 'super_admin']));

router.post('/', crearPausa);

module.exports = router;
