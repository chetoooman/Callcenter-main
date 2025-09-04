// src/models/associations.js
const Usuario = require('./Usuarios');
const Cliente = require('./Clientes');
const Llamada = require('./Llamada');
const Pausa = require('./Pausa');
const AgenteEstado = require('./AgenteEstado');
const Tipificacion = require('./Tipificacion');

Usuario.hasMany(Llamada, { foreignKey: 'usuario_id' });
Cliente.hasMany(Llamada, { foreignKey: 'cliente_id' });
Llamada.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Llamada.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Usuario.hasMany(AgenteEstado, { foreignKey: 'usuario_id' });
AgenteEstado.belongsTo(Usuario, { foreignKey: 'usuario_id' });
AgenteEstado.belongsTo(Pausa, { foreignKey: 'pausa_id' });
Tipificacion.belongsTo(Llamada, { foreignKey: 'llamada_id' });

module.exports = {
  Usuario,
  Cliente,
  Llamada,
  Pausa,
  AgenteEstado,
  Tipificacion
};