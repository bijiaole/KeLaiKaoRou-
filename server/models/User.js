const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openid: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    comment: '微信openid'
  },
  nickname: {
    type: DataTypes.STRING(100),
    comment: '微信昵称'
  },
  avatar: {
    type: DataTypes.STRING(500),
    comment: '头像URL'
  },
  phone: {
    type: DataTypes.STRING(20),
    comment: '手机号'
  }
}, {
  tableName: 'user',
  timestamps: true
});

module.exports = User;
