require('dotenv').config();

const verificarRol = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: permiso insuficiente' });
    }

    next();
  };
};

module.exports = verificarRol;
