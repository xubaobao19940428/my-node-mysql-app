const mysql = require('mysql2/promise')

const pool = mysql.createPool({
	host: '127.0.0.1', // 数据库地址
	user: 'root', // 数据库用户名
	password: '', // 数据库密码
	database: 'local_mysql', // 数据库名称
})

module.exports = pool
