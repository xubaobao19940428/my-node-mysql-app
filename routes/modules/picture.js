const Router = require('koa-router')
// const pool = require('../../config/db')

const router = new Router()
const returnPicuture = function (){
    let pictureArr = Array.from({length: 30}, (v, k) =>{
        return {
            pic: 'https://picsum.photos/300/300',
            text: 'text' + k
        }
    })
    return pictureArr
}
//拿到图片地址和文字
router.get('/api/picture/getAll', async (ctx) => {
	try {

       
		const rows = returnPicuture()

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
