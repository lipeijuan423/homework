const Koa = require("koa");
const serve = require("koa-static");
const render = require("koa-swig");
const config = require("./src/server/config")
const app = new Koa();
const co = require('co');
const errorHandler = require("./src/server/middlewares/errorHandler");
const log4js = require('log4js');
// require('x-tag'); // self not defined
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './src/server/logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
app.use(serve(config.staticDir));
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    varControls: ["[[", "]]"],
    // cache: 'memory', // disable, set to false
    cache: false,
    ext: 'html',
    writeBody: false
}));
//先让他next 再次的判断当前的业务情况
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
require("./src/server/controllers")(app);
app.listen(config.port, () => {
    console.log("图书管理平台启动成功📚");
});
// app.use(async (ctx, next) => {
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.set("Access-Control-Allow-Credentials", true);
//     ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//     ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
//     ctx.set("X-Powered-By", ' 3.2.1');
//     ctx.set("Content-Type", "application/json;charset=utf-8");
//     if (ctx.request.method == "OPTIONS") {
//         ctx.response.status = 200
//     }
//     await next();
// });