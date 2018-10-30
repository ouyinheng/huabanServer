const router = require('koa-router')();
const HuaBanControler = require('../controllers/huaban')
const SearchControler = require('../controllers/search')
//首页
router.get('/huabanhome', HuaBanControler.default.getHBImage)//--推荐
// 首页推荐详情
router.post('/author', HuaBanControler.default.getAuthorInfo)
// 花瓣详情
router.post('/borads', HuaBanControler.default.loadMore)
// 探索详情
router.post('/explore', HuaBanControler.default.loadMoreE)
// 图片详情
router.post('/showInfo', HuaBanControler.default.showInfo)
// search
// 搜索自动补全
router.get('/searchAuto', SearchControler.default.searchAuto)
// 查询
router.get('/search', SearchControler.default.search)
module.exports = router
