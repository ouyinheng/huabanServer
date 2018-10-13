const router = require('koa-router')()
const test = require('../src/db/pool');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  console.error('asdf', ctx.response)
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  ctx.response.redirect('/');
  ctx.response.body = '<a href="/json">Index Page</a>';
  // ctx.body = 'koa2 string'
})
router.get('/json', async (ctx, next) => {
  ctx.throw(500);
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/404', async (ctx, next) => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
})

router.get('/cookies', async (ctx, next) => {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';
})

router.get('/mysql', async(ctx, next) => {
  test.test();
})
module.exports = router
