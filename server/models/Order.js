const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const TableInfo = require('./TableInfo');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_no: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    comment: '订单编号（如：KL20260529001）'
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: '顾客ID'
  },
  table_id: {
    type: DataTypes.INTEGER,
    comment: '桌台ID'
  },
  table_no: {
    type: DataTypes.STRING(20),
    comment: '桌号（冗余存储）'
  },
  people_num: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
    comment: '用餐人数'
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '订单总金额'
  },
  discount_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '优惠金额'
  },
  pay_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '实付金额'
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '1待支付 2已支付/待接单 3已接单/制作中 4已出餐 5已完成 6已取消'
  },
  pay_type: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '1微信支付 2到店付款'
  },
  pay_time: {
    type: DataTypes.DATE,
    comment: '支付时间'
  },
  remark: {
    type: DataTypes.STRING(500),
    comment: '订单备注'
  }
}, {
  tableName: 'orders',
  timestamps: true
});

// 建立关联关系
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Order.belongsTo(TableInfo, { foreignKey: 'table_id', as: 'table' });

module.exports = Order;
