const Router = require('koa-router')
const pool = require('../../config/db')

const router = new Router()

// 获取所有用户或单个用户的接口
router.get('/users', async (ctx) => {
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

module.exports = router
