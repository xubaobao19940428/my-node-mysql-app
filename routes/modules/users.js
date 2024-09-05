const Router = require('koa-router')
const pool = require('../../config/db')

const router = new Router()

// 获取所有用户或单个用户的接口
router.get('api/users', async (ctx) => {
	const { id } = ctx.query

	try {
		let query = 'SELECT * FROM users'
		const params = id ? [id] : []

		if (id) {
			query += ' WHERE id = ?'
		}

		const [rows] = await pool.query(query, params)

		if (id && rows.length === 0) {
			ctx.status = 404
			ctx.body = {
				code: '404',
				message: 'User not found',
			}
			return
		}

		ctx.body = {
			data: rows,
			code: '200',
			message: 'success',
		}
	} catch (error) {
		console.log('error', error)
		ctx.status = 500
		ctx.body = 'Database Error'
	}
})

// 新增用户
router.post('api/addUsers', async (ctx) => {
	const { name, password, phone } = ctx.request.body

	// 简单的输入验证
	if (!name || !password) {
		ctx.status = 400
		ctx.body = {
			code: '400',
			message: 'Name, password, and phone are required fields',
		}
		return
	}
    
	try {
		// 检查用户名或手机号是否已存在
		const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ? OR phone = ?', [name, phone])

		if (existingUser.length > 0) {
			ctx.status = 409
			ctx.body = {
				code: '409',
				message: 'User with the same name or phone already exists',
			}
			return
		}

		// 插入新用户
		const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?, ?)', [name, password])

		// 成功插入，返回新用户的 ID
		ctx.status = 201
		ctx.body = {
			code: '201',
			message: 'User created successfully',
			data: {
				id: result.insertId,
				name,
				phone,
			},
		}
	} catch (error) {
		console.log('error', error)

		// 捕获重复插入的错误
		if (error.code === 'ER_DUP_ENTRY') {
			ctx.status = 409
			ctx.body = {
				code: '409',
				message: 'User with the same name or phone already exists',
			}
		} else {
			ctx.status = 500
			ctx.body = {
				code: '500',
				message: 'Database Error',
			}
		}
	}
})

module.exports = router
