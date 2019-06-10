const Koa = require('koa');
const app = new Koa();
const render = require('koa-swig');

app.use(async (ctx) => {
  ctx.body = 'hello koa2';
})

app.listen(3000);
