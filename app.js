const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const utils = require('./src/utls/utils')
const cors = require('koa-cors');

const index = require('./src/routes/index')
const users = require('./src/routes/users')
const picture = require('./src/routes/picture')
const huaban = require('./src/routes/huaban')

// error handler
onerror(app)
// 跨域
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/cors') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:4200';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

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
app.use(picture.routes(), picture.allowedMethods())
app.use(huaban.routes(), huaban.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.log('server error------------', err.stack, '------------')
  console.error('ctx', ctx)
  utils.setErrorLog(err, ctx)
});

module.exports = app
