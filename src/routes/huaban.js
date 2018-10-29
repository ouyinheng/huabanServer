const router = require('koa-router')();
const HuaBanControler = require('../controllers/huaban')
const SearchControler = require('../controllers/search')
//首页
router.get('/huabanhome', HuaBanControler.default.getHBImage)//--推荐
// 首页推荐点进去
router.post('/author', HuaBanControler.default.getAuthorInfo)
router.post('/borads', HuaBanControler.default.loadMore)
router.post('/explore', HuaBanControler.default.loadMoreE)
router.post('/showInfo', HuaBanControler.default.showInfo)
// search
router.get('/searchAuto', SearchControler.default.searchAuto)
router.get('/search', SearchControler.default.search)
module.exports = router
