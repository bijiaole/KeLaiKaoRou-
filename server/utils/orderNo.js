/**
 * 订单号生成工具
 * 格式：KL + 日期(YYYYMMDD) + 序号(001-999)
 * 示例：KL20260530001
 */

const generateOrderNo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  // 生成3位随机序号
  const random = Math.floor(Math.random() * 1000);
  const sequence = String(random).padStart(3, '0');

  return `KL${dateStr}${sequence}`;
};

module.exports = {
  generateOrderNo
};
