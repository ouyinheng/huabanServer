const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const utils = require('./src/utls/utils')

const index = require('./src/routes/index')
const users = require('./src/routes/users')
const picture = require('./src/routes/picture')

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
app.use(picture.routes(), picture.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.log('server error------------', err.stack, '------------')
  console.error('ctx', ctx)
  utils.setErrorLog(err, ctx)
});

module.exports = app
