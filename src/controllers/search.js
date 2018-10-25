// http://huaban.com/search/hint/?q=%E7%BE%8E&limit=6
const oxios = require('../utls/http.request')
const utils = require('../utls/utils')
class SearchControler {
	//首页--推荐
	/**
	 * @return {string} type:{
	  	"explores"：   '兴趣
	 		"boards": 		'画板
	 	 } 
	 */
	constructor(
	) {
	}
	// 自动补全
	static async searchAuto(ctx) {
		let {q, size=6} = ctx.request.query;
		await oxios.default.get(`http://huaban.com/search/hint/?q=${q}&limit=${size}`).then((res) => {
			let list = JSON.parse(res).result;
			let total = JSON.parse(res).total
			ctx.body = {
				res: 0,
				result: { total, list },
				message: '请求成功'
			}
		}).catch((err) => {
			// ctx.throw(500);
			ctx.body = {
				res: 1,
				result: null,
				message: err.error
			}
		})
	}
	// 查询详情
	static async search(ctx) {
		let {q} = ctx.request.query||'';
		if(q=='') {
			ctx.body = {
				ret: 0,
				result: null,
				message: '值为空'
			}
			return
		};
		await oxios.default.get(`http://huaban.com/search/?q=${q}`).then(res=>{
			utils.mkdirFile(res)
			ctx.body = {
				ret: 0,
				result: 'success',
				message: '请求成功'
			}
		}).catch(err=>{
			ctx.body = {
				ret: 1,
				result: null,
				message: err.error
			}
		})
	}
	
}
	
exports.default = SearchControler;
