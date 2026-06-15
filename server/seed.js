const { sequelize, Category, Product, ProductSpec, TableInfo, User, Admin } = require('./models');

/**
 * 初始化数据库
 */
const seedDatabase = async () => {
  try {
    console.log('开始初始化数据库...');

    // 同步所有表（force: true 会删除已有表重新创建）
    await sequelize.sync({ force: true });
    console.log('数据库表创建成功');

    // 插入菜品分类
    const categories = await Category.bulkCreate([
      { name: '招牌烤肉', sort_order: 1, status: 1 },
      { name: '精选烤串', sort_order: 2, status: 1 },
      { name: '海鲜水产', sort_order: 3, status: 1 },
      { name: '特色凉菜', sort_order: 4, status: 1 },
      { name: '主食小吃', sort_order: 5, status: 1 },
      { name: '酒水饮料', sort_order: 6, status: 1 }
    ]);
    console.log('菜品分类插入成功');

    // 插入菜品 - 招牌烤肉
    await Product.bulkCreate([
      { category_id: 1, name: '秘制五花肉', price: 38.00, stock: 999, monthly_sales: 520, tags: '["招牌","店长推荐"]', status: 1, sort_order: 1 },
      { category_id: 1, name: '雪花牛肉', price: 58.00, stock: 999, monthly_sales: 380, tags: '["招牌"]', status: 1, sort_order: 2 },
      { category_id: 1, name: '澳洲肥牛', price: 48.00, stock: 999, monthly_sales: 420, tags: '["热销"]', status: 1, sort_order: 3 },
      { category_id: 1, name: '黑椒牛排', price: 68.00, stock: 999, monthly_sales: 280, tags: '["店长推荐"]', status: 1, sort_order: 4 },
      { category_id: 1, name: '羊排', price: 52.00, stock: 999, monthly_sales: 350, tags: '["招牌"]', status: 1, sort_order: 5 }
    ]);

    // 插入菜品 - 精选烤串
    await Product.bulkCreate([
      { category_id: 2, name: '羊肉串', price: 6.00, stock: 999, monthly_sales: 850, tags: '["热销","招牌"]', status: 1, sort_order: 1 },
      { category_id: 2, name: '牛肉串', price: 6.00, stock: 999, monthly_sales: 720, tags: '["热销"]', status: 1, sort_order: 2 },
      { category_id: 2, name: '鸡翅串', price: 5.00, stock: 999, monthly_sales: 680, tags: '["热销"]', status: 1, sort_order: 3 },
      { category_id: 2, name: '虾串', price: 8.00, stock: 999, monthly_sales: 450, tags: '["推荐"]', status: 1, sort_order: 4 },
      { category_id: 2, name: '蔬菜串', price: 3.00, stock: 999, monthly_sales: 380, tags: '["素食"]', status: 1, sort_order: 5 }
    ]);

    // 插入菜品 - 海鲜水产
    await Product.bulkCreate([
      { category_id: 3, name: '烤生蚝', price: 12.00, stock: 999, monthly_sales: 560, tags: '["热销","招牌"]', status: 1, sort_order: 1 },
      { category_id: 3, name: '烤扇贝', price: 10.00, stock: 999, monthly_sales: 420, tags: '["热销"]', status: 1, sort_order: 2 },
      { category_id: 3, name: '烤鱿鱼', price: 15.00, stock: 999, monthly_sales: 380, tags: '["推荐"]', status: 1, sort_order: 3 },
      { category_id: 3, name: '烤秋刀鱼', price: 18.00, stock: 999, monthly_sales: 280, tags: '[]', status: 1, sort_order: 4 }
    ]);

    // 插入菜品 - 特色凉菜
    await Product.bulkCreate([
      { category_id: 4, name: '拍黄瓜', price: 12.00, stock: 999, monthly_sales: 680, tags: '["热销"]', status: 1, sort_order: 1 },
      { category_id: 4, name: '凉拌木耳', price: 14.00, stock: 999, monthly_sales: 420, tags: '[]', status: 1, sort_order: 2 },
      { category_id: 4, name: '酸辣土豆丝', price: 12.00, stock: 999, monthly_sales: 520, tags: '["热销"]', status: 1, sort_order: 3 },
      { category_id: 4, name: '蒜泥白肉', price: 22.00, stock: 999, monthly_sales: 320, tags: '["推荐"]', status: 1, sort_order: 4 }
    ]);

    // 插入菜品 - 主食小吃
    await Product.bulkCreate([
      { category_id: 5, name: '烤馒头片', price: 8.00, stock: 999, monthly_sales: 380, tags: '[]', status: 1, sort_order: 1 },
      { category_id: 5, name: '烤年糕', price: 10.00, stock: 999, monthly_sales: 320, tags: '[]', status: 1, sort_order: 2 },
      { category_id: 5, name: '蛋炒饭', price: 12.00, stock: 999, monthly_sales: 450, tags: '["热销"]', status: 1, sort_order: 3 },
      { category_id: 5, name: '冷面', price: 14.00, stock: 999, monthly_sales: 280, tags: '["推荐"]', status: 1, sort_order: 4 }
    ]);

    // 插入菜品 - 酒水饮料
    await Product.bulkCreate([
      { category_id: 6, name: '青岛啤酒', price: 8.00, stock: 999, monthly_sales: 850, tags: '["热销"]', status: 1, sort_order: 1 },
      { category_id: 6, name: '雪花啤酒', price: 7.00, stock: 999, monthly_sales: 680, tags: '[]', status: 1, sort_order: 2 },
      { category_id: 6, name: '可乐', price: 5.00, stock: 999, monthly_sales: 720, tags: '[]', status: 1, sort_order: 3 },
      { category_id: 6, name: '雪碧', price: 5.00, stock: 999, monthly_sales: 620, tags: '[]', status: 1, sort_order: 4 },
      { category_id: 6, name: '酸梅汤', price: 8.00, stock: 999, monthly_sales: 520, tags: '["推荐"]', status: 1, sort_order: 5 },
      { category_id: 6, name: '鲜榨果汁', price: 15.00, stock: 999, monthly_sales: 380, tags: '["推荐"]', status: 1, sort_order: 6 }
    ]);
    console.log('菜品数据插入成功');

    // 插入菜品规格
    await ProductSpec.bulkCreate([
      // 烤肉类规格
      { product_id: 1, spec_name: '小份', price_diff: 0 },
      { product_id: 1, spec_name: '大份', price_diff: 10.00 },
      { product_id: 2, spec_name: '小份', price_diff: 0 },
      { product_id: 2, spec_name: '大份', price_diff: 15.00 },
      { product_id: 3, spec_name: '小份', price_diff: 0 },
      { product_id: 3, spec_name: '大份', price_diff: 12.00 },
      { product_id: 4, spec_name: '小份', price_diff: 0 },
      { product_id: 4, spec_name: '大份', price_diff: 18.00 },
      { product_id: 5, spec_name: '小份', price_diff: 0 },
      { product_id: 5, spec_name: '大份', price_diff: 15.00 },
      // 烤串类规格
      { product_id: 6, spec_name: '微辣', price_diff: 0 },
      { product_id: 6, spec_name: '中辣', price_diff: 0 },
      { product_id: 6, spec_name: '特辣', price_diff: 0 },
      { product_id: 7, spec_name: '微辣', price_diff: 0 },
      { product_id: 7, spec_name: '中辣', price_diff: 0 },
      { product_id: 7, spec_name: '特辣', price_diff: 0 }
    ]);
    console.log('菜品规格插入成功');

    // 插入桌台信息
    await TableInfo.bulkCreate([
      { table_no: '1', table_name: '大厅1号桌', capacity: 4, status: 0 },
      { table_no: '2', table_name: '大厅2号桌', capacity: 4, status: 0 },
      { table_no: '3', table_name: '大厅3号桌', capacity: 4, status: 0 },
      { table_no: '4', table_name: '大厅4号桌', capacity: 6, status: 0 },
      { table_no: '5', table_name: '大厅5号桌', capacity: 6, status: 0 },
      { table_no: '6', table_name: '大厅6号桌', capacity: 4, status: 0 },
      { table_no: '7', table_name: '大厅7号桌', capacity: 4, status: 0 },
      { table_no: '8', table_name: '大厅8号桌', capacity: 8, status: 0 },
      { table_no: '9', table_name: '大厅9号桌', capacity: 4, status: 0 },
      { table_no: '10', table_name: '大厅10号桌', capacity: 4, status: 0 },
      { table_no: 'A1', table_name: '包厢A1', capacity: 10, status: 0 },
      { table_no: 'A2', table_name: '包厢A2', capacity: 10, status: 0 },
      { table_no: 'A3', table_name: '包厢A3', capacity: 12, status: 0 }
    ]);
    console.log('桌台信息插入成功');

    // 插入测试用户
    await User.create({
      openid: 'test_openid_123456',
      nickname: '测试用户',
      avatar: ''
    });
    console.log('测试用户创建成功');

    // 插入商家账号
    await Admin.bulkCreate([
      { username: 'admin', password: 'e10adc3949ba59abbe56e057f20f883e', role: 'manager', status: 1 },
      { username: 'cook1', password: 'e10adc3949ba59abbe56e057f20f883e', role: 'cook', status: 1 },
      { username: 'cashier1', password: 'e10adc3949ba59abbe56e057f20f883e', role: 'cashier', status: 1 }
    ]);
    console.log('商家账号创建成功');

    console.log('\n数据库初始化完成！');
    console.log('测试账号：admin / admin123');
    console.log('测试用户openid：test_openid_123456');

    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
};

seedDatabase();
