const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const {beforeCreateUser} = require('../hooks/userHooks');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('agente', 'supervisor', 'admin', 'superAdmin'),
        allowNull: false,
        defaultValue: 'agente' // Default role can be 'user', 'admin', etc.
    },
    state: {
        type: DataTypes.ENUM('activo', 'inactivo', 'suspendido', 'pausado', 'en llamada'),
        allowNull: false,
        defaultValue: 'activo' // Default state can be 'active', 'inactive', etc.
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {hooks: {
    beforeCreate: beforeCreateUser
    },
    timestamps: true,
});

User.prototype.validarPassword = function (input) {
    return bcrypt.compareSync(input, this.password);
};

module.exports = User;