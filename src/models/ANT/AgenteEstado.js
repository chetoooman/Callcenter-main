const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Usuario = require('./Usuarios');

const AgenteEstado = sequelize.define('AgenteEstado', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'pausa', 'en_llamada', 'post_llamada'),
    allowNull: false
  },
  pausa_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

Usuario.hasMany(AgenteEstado, { foreignKey: 'usuario_id' });
AgenteEstado.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = AgenteEstado;
