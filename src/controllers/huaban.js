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
		let {page} = ctx.request.query||1;
		await oxios.default.get(`http://huaban.com/?page=${page}`).then((res) => {
				// utils.mkdirFile(res)
			if(page>=2) {
				ctx.body = {
					res: 0,
					result: res,
					message: '请求成功'
				}
				return;
			}
			
			// 网页标题
			let title = res.split('<title>')[1].split('</title>')[0];
			// 轮播图
			let banner = res.split('app.page["banners"] = ')[1].split('app.page["bannerExploreProms"]')[0]
			banner = banner.substr(0, banner.length-2)
			// 大家正在关注
			let explores = res.split('app.page["explores"] = ')[1].split('app.page["banners"] = ')[0]
			explores = explores.substr(0, explores.length-2)
			// 为您推荐
			let recom = res.split('app.page["recommends"] = ')[1].split('app._csr = true')[0]
			recom = recom.substr(0, recom.length-2)
			recom = recom.split(';')[0]
			// categories：兴趣
			let menu = res.split('app["settings"] = ')[1].split('app["req"] = ')[0];
			menu = menu.substr(0, menu.length-2)

			let lb = res.split('app["req"] = ')[1].split('app["page"] = {"$url":"/?page=1"};')[0]
			lb = lb.substr(0, lb.length-2)

			ctx.body = {
				res: 0,
				result: { recom, title, menu, banner, explores },
				message: '请求成功'
			}
		}).catch((err) => {
			ctx.throw(500);
			ctx.body = {
				res: 1,
				result: null,
				message: err.error
			}
		})
	}
	static async getAuthorInfo(ctx) {
		let {type, urlname} = ctx.request.body
		if(type=="explores") type="explore"
		let url = type == 'users'?`http://huaban.com/${urlname}`:`http://huaban.com/${type}/${urlname}`;
		await oxios.default.get(url).then(res => {
			// utils.mkdirFile(res)
			if(type=='explore') {
				res = res.split('app.page["pins"] = ')[1].split('app._csr = true')[0]
				res = res.substr(0, res.length-2)
			}
			if(type == 'boards') {
				res = res.split('app.page["board"] = ')[1].split('app._csr = true')[0]
				res = res.substr(0, res.length-2)
				console.log(type, urlname)
			}
			if(type == 'users') {
				console.log(type, urlname)
			}
			ctx.body = {
				res: 0,
				result: res,
				message: null
			}
		}).catch(err => {
			throw new Error(err)
		})
	} 
	static async loadMore(ctx) {
		let {id, max, limit} = ctx.request.body;
		let url = `http://huaban.com/boards/${id}/?jntz2zy5&max=${max}&limit=${limit}&wfl=1`
		await oxios.default.get(url).then(res => {
			let banner = res.split('app.page["board"] =')[1].split('app._csr = true')[0]
			banner = banner.substr(0, banner.length-2)
			banner = JSON.parse(banner);
			if(banner.pins.length==0) {
				ctx.body = {
					res: 0,
					result: null,
					message: '请求成功'
				}
			} else {
				ctx.body = {
					res: 0,
					result: banner,
					message: '请求成功'
				}
			}
		}).catch(err=>{
			ctx.body = {
				res: 1,
				result: null,
				message: 'error'
			}
			// throw new Error(err)
		})
	}
	static async loadMoreE(ctx) {
		let {id, max, limit} = ctx.request.body;
		console.log(id, max, limit);
		let url = `http://huaban.com/explore/${id}/?jntz2zy5&max=${max}&limit=${limit}&wfl=1`;
		await oxios.default.get(url).then(res => {
			// utils.mkdirFile(res)
			let banner = res.split('app.page["pins"] = ')[1].split('app._csr = true')[0]
			banner = banner.substr(0, banner.length-2)
			banner = JSON.parse(banner);
			if(banner.length==0) {
				ctx.body = {
					res: 0,
					result: null,
					message: '请求成功'
				}
			} else {
				ctx.body = {
					res: 0,
					result: banner,
					message: '请求成功'
				}
			}
		}).catch(err=>{
			ctx.body = {
				res: 1,
				result: null,
				message: 'error'
			}
		})
	}
	static async showInfo(ctx) {
		let {id} = ctx.request.body;
		console.log(id);
		let url = `http://huaban.com/pins/${id}/?jnudvv2a`;
		await oxios.default.get(url).then(res => {
			utils.mkdirFile(res)
			let banner = res.split('app["page"] = ')[1].split('app["timestamp"]')[0]
			banner = banner.substr(0, banner.length-2)
			banner = JSON.parse(banner);
			if(banner.length==0) {
				ctx.body = {
					res: 0,
					result: null,
					message: '请求成功'
				}
			} else {
				ctx.body = {
					res: 0,
					result: banner,
					message: '请求成功'
				}
			}
		}).catch(err=>{
			ctx.body = {
				res: 1,
				result: null,
				message: 'error'
			}
		})
	}
}
	
exports.default = HuaBanControler;
