'use strict';
const koa = require('koa')
//const koaRouter = require('koa-router')

const app = new koa()
const PORT = 1337

// const router = new koaRouter()

// router.get('koala', '/', (ctx) => {
//   ctx.body = "Hi there."
// })

// app.use(router.routes())
//   .use(router.allowedMethods())


app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server