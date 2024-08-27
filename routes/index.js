const Router = require('koa-router');
const userRoutes = require('./modules/users');
const loginRoutes = require('./modules/login');

const router = new Router();

// 使用不同的模块路由
router.use(userRoutes.routes());
router.use(loginRoutes.routes());

module.exports = router;
