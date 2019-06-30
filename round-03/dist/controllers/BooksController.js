"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Books = _interopRequireDefault(require("../models/Books"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BooksController {
  constructor() {}

  async actionList(ctx, next) {
    const books = new _Books.default();
    const result = await books.getData({
      url: "books/index"
    });
    console.log(result);
    ctx.body = await ctx.render('books/list', {
      data: result.data
    });
  }

}

var _default = BooksController;
exports.default = _default;