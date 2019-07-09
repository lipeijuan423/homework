"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _config = _interopRequireDefault(require("./config"));

var _co = require("co");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _log4js = require("log4js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();
(0, _log4js.configure)({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + './logs/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
app.use((0, _koaStatic.default)(_config.default.staticDir));
app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  root: _config.default.viewDir,
  autoescape: true,
  varControls: ["[[", "]]"],
  // cache: 'memory', // disable, set to false
  cache: false,
  ext: 'html',
  writeBody: false
})); //先让他next 再次的判断当前的业务情况

const logger = (0, _log4js.getLogger)('cheese');

_errorHandler.default.error(app, logger);

require("./controllers").default(app);

app.listen(_config.default.port, () => {
  console.log("图书管理平台启动成功📚");
});