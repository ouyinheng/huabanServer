// http://huaban.com/
const oxios = require('../utls/http.request')
const utils = require('../utls/utils')
class HuaBanControler {
	//首页--推荐
	/**
	 * @return {string} type:{
	  	"explores"：   '兴趣
	 		"boards": 		'画板
	 	 } 
	 */
	constructor(
		host = 'http://huaban.com/'
	) {
		this.host = host;
	}
	static async getHBImage(ctx) {
		await oxios.default.get('http://huaban.com/').then((res) => {
			res = res.split('app.page["recommends"] = ')[1]
			res = res.split('app._csr = true')[0]
			res = res.substr(0, res.length-2)
			res = res.split(';')[0]
			// utils.mkdirFile(res)
			ctx.body = {
				res: 0,
				result: res,
				message: null
			}
		}).catch((err) => {
			ctx.body = {
				res: 1,
				result: null,
				message: err.error
			}
		})
	}
	static getAuthorInfo(ctx) {
		// await oxios.default.get()
		ctx.body = 'asdf'
	} 
}
	
exports.default = HuaBanControler;
