const router = require('koa-simple-router');
const indexController = require('./IndexController');

module.exports = (app) => {
  app.use(router (_ => {
    // _.get('/', (ctx, next) => {
    //   ctx.body = 'hello';
    // });
    _.get('/main', indexController.actionIndex);
  })
  )
}