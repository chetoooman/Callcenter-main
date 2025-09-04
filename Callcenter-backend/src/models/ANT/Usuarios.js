const { DataTypes } = require('sequelize');
const bycrypt = require('bcrypt');
const { sequelize } = require('../../config/db');

const Users = sequelize.define('Users', {
  