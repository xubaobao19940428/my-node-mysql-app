const Router = require('koa-router');
require('dotenv').config()
const userRoutes = require('./modules/users');
const loginRoutes = require('./modules/login');
const codeRoutes = require('./modules/code');


const router = new Router();

// 使用不同的模块路由
router.use(userRoutes.routes());
router.use(loginRoutes.routes());
router.use(codeRoutes.routes());

module.exports = router;
