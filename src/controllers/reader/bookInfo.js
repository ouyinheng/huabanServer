const oxios = require('../../utls/http.request');
const utils = require('../../utls/utils')
const { API_BASE_URL } = require('../../config/config');


class BookInfoControler {
  // 获取书籍详情
  static async getBookInfo(ctx) {

  }
  // 热门评论 url?book=id
  static async getReview(ctx) {

  }
  // 根据id推荐书单 url?limit=3 
  static async getReview(ctx) {

  }
  // 通过作者查询书名 url?author=''
  static async searchByAnthor(ctx) {

  }
  /**
   * GET 根据标签查询书籍列表
   * @param {String} tags 
   * @param {String} start 
   * @param {String} limit 
   */
  static async searchByTags(ctx) {

  }

  /**
   * GET 获取书的章节信息 http://api.zhuishushenqi.com/mix-atoc/5569ba444127a49f1fa99d29?view=chapters
   * @param {String} bookId  
   */
  static async getBookChapters(ctx) {

  }
  // GET 获取书的章节详情
  /**
   * GET 获取书的章节详情
   * READ_BOOK_CHAPTER_DETAIL: (chapterUrl) => {return 'http://chapter2.zhuishushenqi.com/chapter/' + chapterUrl},
   * @param {String} chapterUrl 
   */
  static async getBookChaptersInfo(ctx) {

  }
}





exports.default = BookInfoControler
