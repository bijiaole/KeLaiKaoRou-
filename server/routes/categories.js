const express = require('express');
const { Category } = require('../models');
const { success, serverError } = require('../utils/response');

const router = express.Router();

/**
 * GET /api/categories
 * 获取菜品分类列表
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { status: 1 },
      order: [['sort_order', 'ASC']]
    });

    return success(res, categories);
  } catch (err) {
    console.error('获取分类列表失败:', err);
    return serverError(res, '获取分类列表失败');
  }
});

module.exports = router;
