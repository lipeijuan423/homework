const pluginName = "htmlAfterPlugin";
const assetsHelp = (data) => {
    let js = [];
    let css = [];
    const dir = {
        js: item => `<script class= "lazyload-js" src="${item}"></script>`,
        css: item => `<link rel="stylesheet" href="${item}">`
    }
    for(let jsitem of data.js){
        js.push(dir.js(jsitem))
    }
    for(let cssitem of data.css){
        css.push(dir.css(cssitem))
    }
    return {
        js,
        css
    }
}
const hackCode = ` (function () {
                var check = document.createElement('script');
                if (!('noModule' in check) && 'onbeforeload' in check) {
                    var support = false;
                    document.addEventListener('beforeload', function (e) {
                        if (e.target === check) {
                            support = true;
                        } else if (!e.target.hasAttribute('nomodule') || !support) {
                            return;
                        }
                    }, true);

                    check.type = 'module';
                    check.src = '.';
                    document.head.appendChild(check);
                    check.remove();
                }
            }());`;
class HtmlAfterPlugin {
    constructor({ isHack } = options) {
        this.isHack = isHack;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // 触发tap
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
                pluginName,
                (htmlPluginData, cb) => {

                    htmlPluginData.body.forEach(tag => {
                        if (tag.tagName == "script") {
                            // nomodule
                            if (/.bundle./.test(tag.attributes.src)) {
                                delete tag.attributes.type;
                                tag.attributes.nomodule = "";
                            } else {
                                tag.attributes.type = "module";
                            }
                        }
                    });
                    if (this.isHack) {
                        // nomodule 和 module共同执行
                        htmlPluginData.body.push({
                            tagName: "script",
                            closeTag: true,
                            innerHTML: hackCode
                        });
                    }
                    cb(null, htmlPluginData);
                }
            );
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
                pluginName,
                htmlPluginData => {
                    htmlPluginData.html = htmlPluginData.html.replace(
                        /\snomodule=""/g,
                        " nomodule"
                    );
                }
            );
        });
        // 
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // 触发tap
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
                // console.log(htmlPluginData.assets, '🍎🍎🍎🍎🍎');
                let _html = htmlPluginData.html;
                const result = assetsHelp(htmlPluginData.assets);
                _html = _html.replace(/@components/g, "../../../components");
                _html = _html.replace("<!-- injectjs -->", result.js.join(""));
                _html = _html.replace("<!-- injectcss -->", result.css.join(""));
                htmlPluginData.html = _html;
            })
        })
    }
}
module.exports = HtmlAfterPlugin;
