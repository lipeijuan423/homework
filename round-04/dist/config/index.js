"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _path = require("path");

let config = {
  "viewDir": (0, _path.join)(__dirname, "..", "views"),
  "staticDir": (0, _path.join)(__dirname, "..", "assets")
};

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    port: 8082,
    baseUrl: "http://localhost/basic/web/index.php?r="
  };
  config = (0, _lodash.extend)(config, localConfig);
}

if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    port: 80
  };
  config = (0, _lodash.extend)(config, prodConfig);
}

var _default = config;
exports.default = _default;