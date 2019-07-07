"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = _config.baseUrl;
  }

  fetch() {
    let result = {
      code: 0,
      message: "",
      data: []
    };
    return new Promise((resolve, reject) => {
      let ydfetch = (0, _nodeFetch.default)(this.baseUrl + this.url);
      ydfetch.then(res => res.json()).then(json => {
        result.data = json;
        resolve(result);
      }).catch(error => {
        result.code = 1;
        result.message = "❎node-fetch请求数据失败";
        reject(result);
      });
    });
  }

}

var _default = SafeRequest;
exports.default = _default;