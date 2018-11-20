const oxios = require('../../utls/http.request');
const utils = require('../../utls/utils');
const { API_BASE_URL} = require('../../config/config');


class SearchControler {
  constructor() {}

  // 热门关键字
  static async getHotWord(ctx) {
    await oxios.default.get(`${API_BASE_URL}/book/hot-word`).then(res=>{
      ctx.body = { res: 0, result: JSON.parse(res), message: '请求成功' }
    }).catch(err=>{
      ctx.body = { res: 1, result: null, message: err.error }
    })
  }
  
  /**
   * 关键字补全
   * @param {string} query 
   */
  static async autoComplete(ctx) {
    let {query} = ctx.request.query;
    await oxios.default.get(`${API_BASE_URL}/book/auto-complete?query=${query}`).then(res=>{
      ctx.body = { res: 0, result: JSON.parse(res), message: '请求成功' }
    }).catch(err=>{
      ctx.body = { res: 1, result: null, message: err.error }
    })
  }
   // 书籍查询
   /**
    * 
    * @param {string} val 
    */
  static async fuzzySearch(ctx) {
    let {query, start, limit} = ctx.request.query;
    let url = utils.url_encode(`https://api.zhuishushenqi.com/book/fuzzy-search?query=${query}&start=0&limit=7`)
    await oxios.default.get(url).then(res=>{
      ctx.body = { res: 0, result: JSON.parse(res), message: '请求成功' }
    }).catch(err=>{
      ctx.body = { res: 1, result: null, message: err.error }
    })
  }
}

exports.default = SearchControler
