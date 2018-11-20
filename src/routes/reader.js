const router = require('koa-router')();
const HomepageControler = require('../controllers/reader/homepage');
const BookInfoControler = require('../controllers/reader/bookInfo');
const SearchControler = require('../controllers/reader/search');
router.prefix('/reader')
//--推荐
router.get('/home', HomepageControler.default.getBanner)
router.get('/atoc', HomepageControler.default.getAtoc)
router.get('/recommend', HomepageControler.default.getRecommend)
// 书籍详情
router.get('/bookinfo', BookInfoControler.default.getBookInfo)//--推荐

// 书籍查询
router.get('/hotword', SearchControler.default.getHotWord)//--推荐
router.get('/autocomplete', SearchControler.default.autoComplete)//--推荐
router.get('/fuzzysearch', SearchControler.default.fuzzySearch)//--推荐








module.exports = router