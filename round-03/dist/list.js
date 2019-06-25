// console.log('dfsaf'); // 可以gulp-js-import
const frank = xtag.create('x-books', class extends XTagElement {
    name() { return 'Frankenstein'; }
    '::template(true)'() {
        return `<h2>I am ${this.name()}</h2>
            <span>I was created by a mad scientist</span>`
    }
});
import("/scripts/index.js").then((_) => {
    console.log(_.default);
})