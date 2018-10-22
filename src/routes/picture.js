const router = require('koa-router')()
const http = require('http');
const fs = require('fs');
const {getImages} = require('../controler/getImages')

router.get('/picture', async (ctx ,next) => {
    let {page} = ctx.request.query;
    if(isNaN(Number(page))) {
        ctx.response.status = 500;
        ctx.response.message = '参数格式错误';
        throw new Error('参数格式错误')
    }
    await getImages(page).then( res => {
        res = res.split('pagecontent">')[1];
        res = res.split('<div class="pic">');
        res = res.join('')
        let src = res.match(/src="(\S*)"/g);//image src
        let alt = res.match(/alt="(\S*)"/g);//image alt
        let obj = []
        src.forEach((item, index) => {
            item = item.match(/src="(\S*)"/)[1];
            // console.log(alt[index])
            var str = index<alt.length?alt[index].match(/alt\="(\S*)"/)[1]:str = '';
            obj.push({ src: item, alt: str })
        });
        ctx.body = obj;
    }).catch( err => {
        console.log(err)
    })
})

module.exports = router



// fs.writeFile(`./log/html/page${page}.html`, res, async(err) => {
// 	if(!err) {
// 		await console.log('写入成功')
// 	} else {
//         console.log('写入失败:--->'+err)
//     }
// })