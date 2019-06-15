const request = require('../request');
const index = async (ctx, next) => {
  // ctx.body = 'hello '
  let url = ctx.url;
  let result
  result = await request.get('http://localhost:8080')
  // result.body = '23'
  ctx.body = result.body
    // await ctx.render('index.html', {
    //   result: result.body
    // })
}
module.exports = {
  index
}
