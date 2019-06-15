const Koa = require('koa');
const app = new Koa();
// koa-convert koa1转换器
// koa-static
// const router = require('koa-simple-router');
const render = require('koa-swig');
const serve = require('koa-static');
const co = require('co');
const path = require('path');
// ? require
// const bookIndex = require('./controllers/my') 
const config = require('./config');

app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  // cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}))
require('./controllers')(app);
app.use(serve("./assets"));
// app.use(router(_ => {
//   // _.get('/index',  bookIndex.index), // 访问到controller
//   _.get('/api')
// }))
app.listen(config.port, () => {
  console.log('启动成功');
});
