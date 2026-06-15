const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'MD5加密'
  },
  role: {
    type: DataTypes.STRING(20),
    defaultValue: 'manager',
    comment: '角色：manager店长 cook厨师 cashier收银员'
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  }
}, {
  tableName: 'admin',
  timestamps: true
});

module.exports = Admin;
