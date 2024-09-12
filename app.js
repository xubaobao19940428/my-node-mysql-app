

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods()); // 处理路由时发生的错误

if (!module.parent) {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}
// .listen(3000); // 导出 app 实例以便测试
module.exports = app
