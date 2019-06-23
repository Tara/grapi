'use strict';
const koa = require('koa')
const koaRouter = require('koa-router')

const app = new koa()
const router = new koaRouter()

router.get('koala', '/', (ctx) => {
  ctx.body = "Hi there."
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(1234, () => console.log('running on port 1234'))