// * 去除 strict 模式
module.exports = class RemoveStrict {
  apply(compiler) {
    console.log('XX')
    let reg = /"use strict";/g;
    compiler.hooks.emit.tap('removeStrict', (compilation) => {
      // * 拿到打包之后的文件
      Object.keys(compilation.assets).forEach((data) => {
        let content = compilation.assets[data].source();
        content = content.replace(reg, '');
        compilation.assets[data] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          }
        }
      })
    })
  }
}