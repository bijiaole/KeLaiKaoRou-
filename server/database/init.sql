-- 客来烤肉微信小程序点餐系统 - 数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS kelailaorou DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE kelailaorou;

-- 表1：user（顾客表）
CREATE TABLE IF NOT EXISTS user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openid VARCHAR(100) UNIQUE NOT NULL COMMENT '微信openid',
  nickname VARCHAR(100) COMMENT '微信昵称',
  avatar VARCHAR(500) COMMENT '头像URL',
  phone VARCHAR(20) COMMENT '手机号',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 表2：category（菜品分类表）
CREATE TABLE IF NOT EXISTS category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL COMMENT '分类名称',
  icon VARCHAR(200) COMMENT '分类图标',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status TINYINT DEFAULT 1 COMMENT '1启用 0禁用'
);

-- 表3：product（菜品表）
CREATE TABLE IF NOT EXISTS product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL COMMENT '分类ID',
  name VARCHAR(100) NOT NULL COMMENT '菜品名称',
  image VARCHAR(500) COMMENT '菜品图片',
  description VARCHAR(500) COMMENT '菜品描述',
  price DECIMAL(10,2) NOT NULL COMMENT '基础价格',
  stock INT DEFAULT 999 COMMENT '库存',
  monthly_sales INT DEFAULT 0 COMMENT '月售量',
  tags VARCHAR(200) COMMENT '标签（JSON数组：["招牌","店长推荐"]）',
  status TINYINT DEFAULT 1 COMMENT '1上架 0下架',
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

-- 表4：product_spec（菜品规格表）
CREATE TABLE IF NOT EXISTS product_spec (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL COMMENT '菜品ID',
  spec_name VARCHAR(50) NOT NULL COMMENT '规格名称',
  price_diff DECIMAL(10,2) DEFAULT 0 COMMENT '价格差额',
  stock INT DEFAULT 999,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- 表5：table_info（桌台信息表）
CREATE TABLE IF NOT EXISTS table_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  table_no VARCHAR(20) NOT NULL UNIQUE COMMENT '桌号',
  table_name VARCHAR(50) COMMENT '桌名（如：大厅8号、包厢A1）',
  qrcode_url VARCHAR(500) COMMENT '点餐二维码URL',
  status TINYINT DEFAULT 0 COMMENT '0空闲 1使用中 2已下单 3已结账',
  capacity INT DEFAULT 4 COMMENT '容纳人数',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 表6：orders（订单表）
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_no VARCHAR(50) UNIQUE NOT NULL COMMENT '订单编号（如：KL20260529001）',
  user_id INT COMMENT '顾客ID（未登录可为空）',
  table_id INT COMMENT '桌台ID',
  table_no VARCHAR(20) COMMENT '桌号（冗余存储）',
  people_num INT DEFAULT 2 COMMENT '用餐人数',
  total_amount DECIMAL(10,2) NOT NULL COMMENT '订单总金额',
  discount_amount DECIMAL(10,2) DEFAULT 0 COMMENT '优惠金额',
  pay_amount DECIMAL(10,2) NOT NULL COMMENT '实付金额',
  status TINYINT DEFAULT 1 COMMENT '1待支付 2已支付/待接单 3已接单/制作中 4已出餐 5已完成 6已取消',
  pay_type TINYINT DEFAULT 1 COMMENT '1微信支付 2到店付款',
  pay_time DATETIME COMMENT '支付时间',
  remark VARCHAR(500) COMMENT '订单备注',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (table_id) REFERENCES table_info(id)
);

-- 表7：order_item（订单商品表）
CREATE TABLE IF NOT EXISTS order_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL COMMENT '订单ID',
  product_id INT NOT NULL COMMENT '商品ID',
  product_name VARCHAR(100) COMMENT '商品名称（快照）',
  spec_name VARCHAR(50) COMMENT '规格名称',
  price DECIMAL(10,2) NOT NULL COMMENT '下单时单价',
  quantity INT NOT NULL COMMENT '数量',
  subtotal DECIMAL(10,2) NOT NULL COMMENT '小计',
  remark VARCHAR(200) COMMENT '菜品备注（如：不要洋葱）',
  status TINYINT DEFAULT 1 COMMENT '1正常 2退菜申请中 3已退菜',
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 表8：admin（商家账号表）
CREATE TABLE IF NOT EXISTS admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL COMMENT 'MD5加密',
  role VARCHAR(20) DEFAULT 'manager' COMMENT '角色：manager店长 cook厨师 cashier收银员',
  status TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
