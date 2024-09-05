// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const Router = require('koa-router')
const pool = require('../../config/db')
const Dysmsapi20170525 = require('@alicloud/dysmsapi20170525')
const OpenApi = require('@alicloud/openapi-client')
const Util = require('@alicloud/tea-util')
const Tea = require('@alicloud/tea-typescript')
const redis = require('redis')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'your_jwt_secret_key'
// 创建 Redis 客户端
const redisClient = redis.createClient({
	url: 'redis://localhost:6379',
})

redisClient.connect().catch(console.error) // 连接 Redis

redisClient.on('error', (err) => {
	console.log('Redis error:', err)
})

const router = new Router()
const runCode = function (num) {
	let code = ''
	for (let i = 0; i < num; i++) {
		let radom = Math.floor(Math.random() * 10)
		code += radom
	}
	return {
		code: code,
	}
}
const createClient = function () {
	// 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
	// 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
	let config = new OpenApi.Config({
		// 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
		accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
		
		// 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
		accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
	})
	// Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
	config.endpoint = `dysmsapi.aliyuncs.com`
	return new Dysmsapi20170525.default(config)
}
router.post('/api/sendCode', async (ctx) => {
	const { phonenumber } = ctx.request.body
	const randCode = runCode(6)
	let client = createClient()
	let sendSmsRequest = new Dysmsapi20170525.SendSmsRequest({
		phoneNumbers: phonenumber,
		signName: '钱诚',
		templateCode: 'SMS_137375100',
		templateParam: JSON.stringify(randCode),
	})
	let runtime = new Util.RuntimeOptions({})
	try {
		console.log(sendSmsRequest)
		// 复制代码运行请自行打印 API 的返回值
		const response = await client.sendSmsWithOptions(sendSmsRequest, runtime)
		console.log(response)
		if (response.statusCode == 200) {
			await redisClient.set(phonenumber, randCode.code, { EX: 300 })
			ctx.body = {
				code: '200',
				message: '发送成功',
			}
		} else {
			ctx.body = {
				code: '400',
				message: '发送失败',
			}
		}
	} catch (error) {
		ctx.body = {
			code: '400',
			message: error.message,
		}
		// 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
		// 错误 message
		console.log(error.message)
		// 诊断地址
		console.log(error.data['Recommend'])
		Util.default.assertAsString(error.message)
	}
})
// 短信验证码登录接口
router.post('/api/loginWithCode', async (ctx) => {
	const { phonenumber, code } = ctx.request.body
	try {
		// 从 Redis 中获取验证码
		const cachedCode = await redisClient.get(phonenumber)
        console.log(cachedCode,code)
		if (!cachedCode) {
			ctx.status = 400
			ctx.body = {
				code: '400',
				message: '验证码已失效或不存在',
			}
			return
		}

		if (cachedCode !== code) {
			ctx.status = 401
			ctx.body = {
				code: '401',
				message: '验证码错误',
			}
			return
		}

		// 验证成功，生成 JWT
		const token = jwt.sign({ phonenumber },JWT_SECRET, { expiresIn: '1h' })
        
		ctx.body = {
			code: '200',
			message: '登录成功',
			data: {
				token,
				phonenumber,
				avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
			},
		}
	} catch (error) {
		ctx.status = 500
		ctx.body = '服务器错误'
	}
})
module.exports = router
