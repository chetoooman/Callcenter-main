// src/models/associations.js
const Usuario = require('./ANT/Usuarios');
const Cliente = require('./ANT/Clientes');
const Llamada = require('./ANT/Llamada');
const Pausa = require('./ANT/Pausa');
const AgenteEstado = require('./ANT/AgenteEstado');
const Tipificacion = require('./ANT/Tipificacion');

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