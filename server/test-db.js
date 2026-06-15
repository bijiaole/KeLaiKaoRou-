const mysql = require('mysql2/promise');
require('dotenv').config();

const testConnection = async () => {
  console.log('测试数据库连接...');
  console.log(`主机: ${process.env.DB_HOST}`);
  console.log(`端口: ${process.env.DB_PORT}`);
  console.log(`用户: ${process.env.DB_USER}`);
  console.log(`数据库: ${process.env.DB_NAME}`);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    console.log('\n✓ MySQL 连接成功！');

    // 检查数据库是否存在
    const [databases] = await connection.query('SHOW DATABASES');
    const dbList = databases.map(db => db.Database);
    console.log('\n可用数据库:', dbList.join(', '));

    if (dbList.includes(process.env.DB_NAME)) {
      console.log(`✓ 数据库 "${process.env.DB_NAME}" 已存在`);
    } else {
      console.log(`✗ 数据库 "${process.env.DB_NAME}" 不存在，需要创建`);
      await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`✓ 数据库 "${process.env.DB_NAME}" 创建成功`);
    }

    await connection.end();
    console.log('\n可以运行 npm run seed 初始化数据了');
  } catch (error) {
    console.error('\n✗ 连接失败:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.log('\n提示: MySQL 服务未启动，请启动 MySQL');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n提示: 用户名或密码错误，请检查 .env 文件');
    }
  }
};

testConnection();
