"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview 实现Books数据模型
 * @author yuanzhijia@yidengxuetang.com
 */
class Books {
  /**
   * Books类 获取后台有关于图书相关的数据类
   * @class
   */

  /**
   * @constructor
   * @param {object} app KOA2执行的上下文
   */
  constructor(app) {
    this.app = app;
  }
  /**
   * 获取后台全部图书列表
   * @param {*} options 配置项
   * @example
   * return new Promise
   * getData(options)
   */


  getData(options) {
    const safeRequest = new _SafeRequest.default(options.url);
    return safeRequest.fetch();
  }

}

var _default = Books;
exports.default = _default;