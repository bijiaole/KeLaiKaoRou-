const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '订单ID'
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品ID'
  },
  product_name: {
    type: DataTypes.STRING(100),
    comment: '商品名称（快照）'
  },
  spec_name: {
    type: DataTypes.STRING(50),
    comment: '规格名称'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '下单时单价'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '数量'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '小计'
  },
  remark: {
    type: DataTypes.STRING(200),
    comment: '菜品备注（如：不要洋葱）'
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '1正常 2退菜申请中 3已退菜'
  }
}, {
  tableName: 'order_item',
  timestamps: false
});

// 建立关联关系
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

module.exports = OrderItem;
