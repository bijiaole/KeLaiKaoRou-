-- 客来烤肉微信小程序点餐系统 - 初始数据

USE kelailaorou;

-- 插入菜品分类
INSERT INTO category (name, icon, sort_order, status) VALUES
('招牌烤肉', '/images/category/BBQ.png', 1, 1),
('精选烤串', '/images/category/skewer.png', 2, 1),
('海鲜水产', '/images/category/seafood.png', 3, 1),
('特色凉菜', '/images/category/cold-dish.png', 4, 1),
('主食小吃', '/images/category/staple.png', 5, 1),
('酒水饮料', '/images/category/drink.png', 6, 1);

-- 插入菜品 - 招牌烤肉
INSERT INTO product (category_id, name, image, description, price, stock, monthly_sales, tags, status, sort_order) VALUES
(1, '秘制五花肉', '/images/products/wuhuarou.jpg', '精选五花肉，秘制酱料腌制，肥而不腻', 38.00, 999, 520, '["招牌","店长推荐"]', 1, 1),
(1, '雪花牛肉', '/images/products/niurou.jpg', '进口雪花牛肉，纹理清晰，口感嫩滑', 58.00, 999, 380, '["招牌"]', 1, 2),
(1, '澳洲肥牛', '/images/products/feiniu.jpg', '澳洲进口肥牛，肉质鲜嫩', 48.00, 999, 420, '["热销"]', 1, 3),
(1, '黑椒牛排', '/images/products/niupai.jpg', '黑椒腌制牛排，香气扑鼻', 68.00, 999, 280, '["店长推荐"]', 1, 4),
(1, '羊排', '/images/products/yangpai.jpg', '新鲜羊排，孜然腌制，外焦里嫩', 52.00, 999, 350, '["招牌"]', 1, 5);

-- 插入菜品 - 精选烤串
INSERT INTO product (category_id, name, image, description, price, stock, monthly_sales, tags, status, sort_order) VALUES
(2, '羊肉串', '/images/products/yangrouchuan.jpg', '新鲜羊肉，孜然风味', 6.00, 999, 850, '["热销","招牌"]', 1, 1),
(2, '牛肉串', '/images/products/niurouchuan.jpg', '精选牛肉，麻辣鲜香', 6.00, 999, 720, '["热销"]', 1, 2),
(2, '鸡翅串', '/images/products/jichichuan.jpg', '秘制鸡翅，外焦里嫩', 5.00, 999, 680, '["热销"]', 1, 3),
(2, '虾串', '/images/products/xiachuan.jpg', '新鲜大虾，蒜蓉风味', 8.00, 999, 450, '["推荐"]', 1, 4),
(2, '蔬菜串', '/images/products/shucaichuan.jpg', '时令蔬菜，健康美味', 3.00, 999, 380, '["素食"]', 1, 5);

-- 插入菜品 - 海鲜水产
INSERT INTO product (category_id, name, image, description, price, stock, monthly_sales, tags, status, sort_order) VALUES
(3, '烤生蚝', '/images/products/shenghao.jpg', '新鲜生蚝，蒜蓉烤制', 12.00, 999, 560, '["热销","招牌"]', 1, 1),
(3, '烤扇贝', '/images/products/shanbei.jpg', '肥美扇贝，粉丝蒜蓉', 10.00, 999, 420, '["热销"]', 1, 2),
(3, '烤鱿鱼', '/images/products/youyu.jpg', '整条鱿鱼，酱香烤制', 15.00, 999, 380, '["推荐"]', 1, 3),
(3, '烤秋刀鱼', '/images/products/qiudaoyu.jpg', '日式烤秋刀鱼，原汁原味', 18.00, 999, 280, '[]', 1, 4);

-- 插入菜品 - 特色凉菜
INSERT INTO product (category_id, name, image, description, price, stock, monthly_sales, tags, status, sort_order) VALUES
(4, '拍黄瓜', '/images/products/huanggua.jpg', '爽脆可口，开胃必备', 12.00, 999, 680, '["热销"]', 1, 1),
(4, '凉拌木耳', '/images/products/muer.jpg', '酸辣爽口，营养丰富', 14.00, 999, 420, '[]', 1, 2),
(4, '酸辣土豆丝', '/images/products/tudousi.jpg', '酸辣开胃，下酒好菜', 12.00, 999, 520, '["热销"]', 1, 3),
(4, '蒜泥白肉', '/images/products/bairou.jpg', '蒜香浓郁，肥而不腻', 22.00, 999, 320, '["推荐"]', 1, 4);

-- 插入菜品 - 主食小吃
INSERT INTO product (category_id, name, image, description, price, stock, monthly_sales, tags, status, sort_order) VALUES
(5, '烤馒头片', '/images/products/mantou.jpg', '外酥里软，蘸酱更香', 8.00, 999, 380, '[]', 1, 1),
(5, '烤年糕', '/images/products/niangao.jpg', '软糯香甜，韩式风味', 10.00, 999, 320, '[]', 1, 2),
(5, '蛋炒饭', '/images/products/chaofan.jpg', '粒粒分明，配料丰富', 12.00, 999, 450, '["热销"]', 1, 3),
(5, '冷面', '/images/products/lengmian.jpg', '酸甜爽口，夏日必备', 14.00, 999, 280, '["推荐"]', 1, 4);

-- 插入菜品 - 酒水饮料
INSERT INTO product (category_id, name, image, description, price, stock, monthly_sales, tags, status, sort_order) VALUES
(6, '青岛啤酒', '/images/products/qingdao.jpg', '经典青岛啤酒，清爽解腻', 8.00, 999, 850, '["热销"]', 1, 1),
(6, '雪花啤酒', '/images/products/xuehua.jpg', '雪花纯生，口感清爽', 7.00, 999, 680, '[]', 1, 2),
(6, '可乐', '/images/products/kele.jpg', '经典可口可乐', 5.00, 999, 720, '[]', 1, 3),
(6, '雪碧', '/images/products/xuebi.jpg', '清爽雪碧', 5.00, 999, 620, '[]', 1, 4),
(6, '酸梅汤', '/images/products/suanmei.jpg', '自制酸梅汤，消暑解渴', 8.00, 999, 520, '["推荐"]', 1, 5),
(6, '鲜榨果汁', '/images/products/guozhi.jpg', '新鲜水果现榨，多种口味可选', 15.00, 999, 380, '["推荐"]', 1, 6);

-- 插入菜品规格
-- 烤肉类规格（大份/小份）
INSERT INTO product_spec (product_id, spec_name, price_diff, stock) VALUES
(1, '小份', 0, 999),
(1, '大份', 10.00, 999),
(2, '小份', 0, 999),
(2, '大份', 15.00, 999),
(3, '小份', 0, 999),
(3, '大份', 12.00, 999),
(4, '小份', 0, 999),
(4, '大份', 18.00, 999),
(5, '小份', 0, 999),
(5, '大份', 15.00, 999);

-- 烤串类规格（微辣/中辣/特辣）
INSERT INTO product_spec (product_id, spec_name, price_diff, stock) VALUES
(6, '微辣', 0, 999),
(6, '中辣', 0, 999),
(6, '特辣', 0, 999),
(7, '微辣', 0, 999),
(7, '中辣', 0, 999),
(7, '特辣', 0, 999),
(8, '微辣', 0, 999),
(8, '中辣', 0, 999),
(8, '特辣', 0, 999);

-- 插入桌台信息
INSERT INTO table_info (table_no, table_name, capacity, status) VALUES
('1', '大厅1号桌', 4, 0),
('2', '大厅2号桌', 4, 0),
('3', '大厅3号桌', 4, 0),
('4', '大厅4号桌', 6, 0),
('5', '大厅5号桌', 6, 0),
('6', '大厅6号桌', 4, 0),
('7', '大厅7号桌', 4, 0),
('8', '大厅8号桌', 8, 0),
('9', '大厅9号桌', 4, 0),
('10', '大厅10号桌', 4, 0),
('A1', '包厢A1', 10, 0),
('A2', '包厢A2', 10, 0),
('A3', '包厢A3', 12, 0);

-- 插入测试用户
INSERT INTO user (openid, nickname, avatar) VALUES
('test_openid_123456', '测试用户', '');

-- 插入商家账号（密码：admin123，MD5加密）
INSERT INTO admin (username, password, role) VALUES
('admin', 'e10adc3949ba59abbe56e057f20f883e', 'manager'),
('cook1', 'e10adc3949ba59abbe56e057f20f883e', 'cook'),
('cashier1', 'e10adc3949ba59abbe56e057f20f883e', 'cashier');
