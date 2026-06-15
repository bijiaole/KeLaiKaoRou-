const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TableInfo = sequelize.define('TableInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  table_no: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    comment: '桌号'
  },
  table_name: {
    type: DataTypes.STRING(50),
    comment: '桌名（如：大厅8号、包厢A1）'
  },
  qrcode_url: {
    type: DataTypes.STRING(500),
    comment: '点餐二维码URL'
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: '0空闲 1使用中 2已下单 3已结账'
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
    comment: '容纳人数'
  }
}, {
  tableName: 'table_info',
  timestamps: true
});

module.exports = TableInfo;
