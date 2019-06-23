const Books = require("../models/Books");
const fetch = require("node-fetch");
class BooksController {
    constructor() {
    }
    async actionList(ctx, next) {
        const books = new Books()
        const result = await books.getData({
            url: "books/index"
        });
        // render
        ctx.body = await ctx.render('../../web/views/books/list', {
            data: result.data
        });
    }
}
module.exports = BooksController;