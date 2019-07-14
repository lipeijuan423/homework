"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Books = _interopRequireDefault(require("../models/Books"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BooksController {
  constructor() {}

  async actionAdd(ctx, next) {
    ctx.body = await ctx.render('books/pages/add');
  }

  async actionList(ctx, next) {
    const books = new _Books.default();
    const result = await books.getData({
      url: "books/index"
    });
    const html = await ctx.render('books/pages/list', {
      data: result.data
    });
    console.log('ss');

    if (ctx.request.header["x-pjax"]) {
      console.log('站内跳');

      const $ = _cheerio.default.load(html); // ctx.body = $('#js-hooks-data').html();


      let _result = "";
      $(".pjaxcontent").each(function () {
        _result += $(this).html();
      });
      $(".lazyload-js").each(function () {
        _result += `<script src="${$(this).attr("src")}"></script>`;
      });
      ctx.body = _result;
    } else {
      console.log("落地页-直接刷");
      console.log(result);
      ctx.body = html;
    }
  }

}

var _default = BooksController;
exports.default = _default;