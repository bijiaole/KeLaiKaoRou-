const sequelize = require('../config/db');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductSpec = require('./ProductSpec');
const TableInfo = require('./TableInfo');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Admin = require('./Admin');

// 同步所有模型到数据库
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('数据库同步成功');
  } catch (error) {
    console.error('数据库同步失败:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  ProductSpec,
  TableInfo,
  Order,
  OrderItem,
  Admin,
  syncDatabase
};
