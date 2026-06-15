const express = require('express');
const { Order, OrderItem, Product, ProductSpec, TableInfo } = require('../models');
const { success, error, notFound, serverError } = require('../utils/response');
const { generateOrderNo } = require('../utils/orderNo');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * POST /api/orders
 * 创建订单
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { table_no, people_num, pay_type, remark, items } = req.body;

    // 参数验证
    if (!table_no) {
      return error(res, '请选择桌号');
    }
    if (!items || items.length === 0) {
      return error(res, '请选择菜品');
    }

    // 查询桌台
    let table = await TableInfo.findOne({ where: { table_no } });
    if (!table) {
      // 如果桌台不存在，自动创建
      table = await TableInfo.create({
        table_no,
        table_name: `${table_no}号桌`
      });
    }

    // 计算订单金额
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return error(res, `商品ID ${item.product_id} 不存在`);
      }

      let price = parseFloat(product.price);
      let specName = '';

      // 如果有规格，计算规格价格
      if (item.spec_id) {
        const spec = await ProductSpec.findByPk(item.spec_id);
        if (spec) {
          price += parseFloat(spec.price_diff);
          specName = spec.spec_name;
        }
      }

      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        spec_name: specName,
        price,
        quantity: item.quantity,
        subtotal,
        remark: item.remark || ''
      });
    }

    // 创建订单
    const order = await Order.create({
      order_no: generateOrderNo(),
      user_id: req.user.id,
      table_id: table.id,
      table_no,
      people_num: people_num || 2,
      total_amount: totalAmount,
      discount_amount: 0,
      pay_amount: totalAmount,
      status: 1, // 待支付
      pay_type: pay_type || 1,
      remark: remark || ''
    });

    // 创建订单商品
    for (const item of orderItems) {
      await OrderItem.create({
        order_id: order.id,
        ...item
      });
    }

    // 更新桌台状态
    await table.update({ status: 2 });

    return success(res, {
      order_id: order.id,
      order_no: order.order_no,
      pay_amount: order.pay_amount
    });
  } catch (err) {
    console.error('创建订单失败:', err);
    return serverError(res, '创建订单失败');
  }
});

/**
 * GET /api/orders
 * 获取当前用户订单列表
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const where = { user_id: req.user.id };
    if (status) {
      where.status = status;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: OrderItem,
          as: 'items',
          attributes: ['product_name', 'quantity']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    // 格式化返回数据
    const list = rows.map(order => ({
      id: order.id,
      order_no: order.order_no,
      table_no: order.table_no,
      status: order.status,
      pay_amount: order.pay_amount,
      created_at: order.created_at,
      items_count: order.items ? order.items.length : 0,
      items_preview: order.items ? order.items.slice(0, 3).map(i => i.product_name).join('、') : ''
    }));

    return success(res, {
      list,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    console.error('获取订单列表失败:', err);
    return serverError(res, '获取订单列表失败');
  }
});

/**
 * GET /api/orders/:id
 * 获取订单详情
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          as: 'items'
        }
      ]
    });

    if (!order) {
      return notFound(res, '订单不存在');
    }

    return success(res, order);
  } catch (err) {
    console.error('获取订单详情失败:', err);
    return serverError(res, '获取订单详情失败');
  }
});

/**
 * POST /api/orders/:id/pay
 * 模拟支付
 */
router.post('/:id/pay', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, user_id: req.user.id }
    });

    if (!order) {
      return notFound(res, '订单不存在');
    }

    if (order.status !== 1) {
      return error(res, '订单状态异常，无法支付');
    }

    // 模拟支付成功，更新订单状态
    await order.update({
      status: 2, // 已支付/待接单
      pay_time: new Date()
    });

    return success(res, {
      order_id: order.id,
      status: order.status
    }, '支付成功');
  } catch (err) {
    console.error('支付失败:', err);
    return serverError(res, '支付失败');
  }
});

module.exports = router;
