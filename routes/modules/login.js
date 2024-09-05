const Router = require('koa-router')
const pool = require('../../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = new Router()

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'

// 登录接口
router.post('/api/login', async (ctx) => {
	const { username, password } = ctx.request.body

	try {
		const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
		if (rows.length === 0) {
			ctx.status = 401
			ctx.body = {
				code: '401',
				message: 'Invalid username or password',
			}
			return
		}

		const user = rows[0]
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			ctx.status = 401
			ctx.body = {
				code: '401',
				message: 'Invalid username or password',
			}
			return
		}

		const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' })

		ctx.body = {
			code: '200',
			message: 'Login successful',
			data:{
                token:token,
                username:username,
                avatar:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            },
		}
	} catch (error) {
		console.log('error', error)
		ctx.status = 500
		ctx.body = 'Database Error'
	}
})

module.exports = router
