import Books from "../models/Books";
import cheerio from "cheerio";
class BooksController {
    constructor() {
    }
    async actionAdd (ctx, next) {
        ctx.body = await ctx.render('books/pages/add')
    }
    async actionList(ctx, next) {
        const books = new Books()
        const result = await books.getData({
            url: "books/index"
        });
        const html = await ctx.render('books/pages/list', {
            data: result.data
        });
        console.log('ss')
        if (ctx.request.header["x-pjax"]) {
            console.log('站内跳')
            const $ = cheerio.load(html);
            // ctx.body = $('#js-hooks-data').html();
            let _result = "";
            $(".pjaxcontent").each( function()  {
                _result += $(this).html();
            })
            $(".lazyload-js").each(function ()  {
                _result += `<script src="${$(this).attr("src")}"></script>`;
            })
            ctx.body = _result;
        } else {
            console.log("落地页-直接刷")
             console.log(result);
            ctx.body = html
        }
    }
}
export default BooksController;