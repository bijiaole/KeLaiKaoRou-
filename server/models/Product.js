const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '分类ID'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '菜品名称'
  },
  image: {
    type: DataTypes.STRING(500),
    comment: '菜品图片'
  },
  description: {
    type: DataTypes.STRING(500),
    comment: '菜品描述'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '基础价格'
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 999,
    comment: '库存'
  },
  monthly_sales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '月售量'
  },
  tags: {
    type: DataTypes.STRING(200),
    comment: '标签（JSON数组）',
    get() {
      const rawValue = this.getDataValue('tags');
      if (rawValue) {
        try {
          return JSON.parse(rawValue);
        } catch (e) {
          return [];
        }
      }
      return [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('tags', JSON.stringify(value));
      } else {
        this.setDataValue('tags', value);
      }
    }
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '1上架 0下架'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'product',
  timestamps: true
});

// 建立关联关系
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

module.exports = Product;
