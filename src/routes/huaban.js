const router = require('koa-router')();
const HuaBanControler = require('../controllers/huaban')
//首页
router.get('/huabanhome', HuaBanControler.default.getHBImage)//--推荐
// 首页推荐点进去
router.post('/author', HuaBanControler.default.getAuthorInfo)
module.exports = router
