const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const ProductSpec = sequelize.define('ProductSpec', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '菜品ID'
  },
  spec_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '规格名称'
  },
  price_diff: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: '价格差额'
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 999
  }
}, {
  tableName: 'product_spec',
  timestamps: false
});

// 建立关联关系
ProductSpec.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(ProductSpec, { foreignKey: 'product_id', as: 'specs' });

module.exports = ProductSpec;
