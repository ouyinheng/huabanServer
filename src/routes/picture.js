const router = require('koa-router')()
const http = require('http');
const fs = require('fs');
const {getImages} = require('../controler/getImages')

router.get('/picture', async (ctx ,next) => {
    let page = 2;
    await getImages(page).then( res => {
        ctx.body = res;
    }).catch( err => {
        console.log(err)
    })
})

module.exports = router
