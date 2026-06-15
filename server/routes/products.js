const express = require('express');
const { Product, ProductSpec, Category } = require('../models');
const { success, error, notFound, serverError } = require('../utils/response');

const router = express.Router();

/**
 * GET /api/products
 * 按分类获取菜品列表
 */
router.get('/', async (req, res) => {
  try {
    const { category_id, page = 1, limit = 20 } = req.query;

    const where = { status: 1 };
    if (category_id) {
      where.category_id = category_id;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ],
      order: [['sort_order', 'ASC'], ['id', 'ASC']],
      limit: parseInt(limit),
      offset
    });

    return success(res, {
      list: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    console.error('获取菜品列表失败:', err);
    return serverError(res, '获取菜品列表失败');
  }
});

/**
 * GET /api/products/:id
 * 获取菜品详情（含规格）
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id, status: 1 },
      include: [
        {
          model: ProductSpec,
          as: 'specs',
          attributes: ['id', 'spec_name', 'price_diff', 'stock']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!product) {
      return notFound(res, '菜品不存在');
    }

    return success(res, product);
  } catch (err) {
    console.error('获取菜品详情失败:', err);
    return serverError(res, '获取菜品详情失败');
  }
});

module.exports = router;
