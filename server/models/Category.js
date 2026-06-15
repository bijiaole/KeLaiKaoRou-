const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '分类名称'
  },
  icon: {
    type: DataTypes.STRING(200),
    comment: '分类图标'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '排序'
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '1启用 0禁用'
  }
}, {
  tableName: 'category',
  timestamps: false
});

module.exports = Category;
