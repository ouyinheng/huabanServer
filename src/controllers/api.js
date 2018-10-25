// const md = require('markdown-it')()
const fs = require('fs');

class APIControler {
  constructor(){}

  static async renderMd(ctx) {
    let res = fs.readFileSync('./doc/api.md').toString();
    let result = md.render(res);
    const title = '花瓣API'
    await ctx.render('article', {
        title,
        result:result
    })
  }
}
exports.default = APIControler;