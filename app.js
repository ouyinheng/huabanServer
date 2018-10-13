const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const fs = require('fs')
const utils = require('./src/utls/utils')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err)
  fs.readdir('./log/error', (error, files) => {
    if(files) {
      let timestamp = utils.getTime();
      let str = JSON.stringify(err)+'\n'+JSON.stringify(ctx)
      fs.writeFile('./log/error/error.log-'+timestamp+'.txt', str, (errs) => {
        if(errs) {
          console.log('写入失败', errs)
        } else
        console.log('写入成功')
      })
    } else {
      fs.mkdir('./log/error', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
      })
    }
  })
});

module.exports = app
