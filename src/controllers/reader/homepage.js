const oxios = require('../../utls/http.request');
const utils = require('../../utls/utils');
const { API_BASE_URL} = require('../../config/config');


class HomepageControler {
  constructor() {}
  /**
   * 首次进入APP，选择性别后，获取推荐列表 url?gender='male'
   * @param {string} gender 
   */
  static async getBanner(ctx) {
    let gender = 'male'
    await oxios.default.get(`${API_BASE_URL}/book/recommend?gender=${gender}`).then(res=> {
      ctx.body = { res: 0, result: JSON.parse(res), message: '请求成功' }
    }).catch(err=>{
      ctx.body = { res: 1, result: null, message: err.error }
    })
  }

  /**
   * 获取正版源(若有) 与 盗版源
   * @param {*} ctx 
   */
  static async getAtoc(ctx) {
    await oxios.default.get(`${API_BASE_URL}/atoc`).then(res=>{
      ctx.body = { res: 0, result: JSON.parse(res), message: '请求成功' }
    }).catch(err=>{
      ctx.body = { res: 1, result: null, message: err.error }
    })
  }

  /**
   * 用户偏好推荐
   * GET gender: male | female
   * @param {*} ctx 
   */
  static async getRecommend(ctx) {
    await oxios.default.get(`${API_BASE_URL}/book/recommend`).then(res=>{
      ctx.body = { res: 0, result: JSON.parse(res), message: '请求成功' }
    }).catch(err=>{
      ctx.body = { res: 1, result: null, message: err.error }
    })
  }
}

exports.default = HomepageControler
