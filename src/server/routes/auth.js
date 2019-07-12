const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const queries = require('../db/queries/users');
const grQueries = require('../db/queries/goodreads');

//const querystring = require('querystring');
const url = require('url');

const router = new Router();

router.get('/auth/register', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./src/server/views/register.html');
});

router.post('/auth/register', async (ctx) => {
  const user = await queries.addUser(ctx.request.body);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

router.get('/auth/status', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/status.html');
  } else {
    ctx.redirect('/auth/login');
  }
});

router.get('/auth/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/login.html');
  } else {
    ctx.redirect('/auth/status');
  }
});

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', 
  async (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      let r = await grQueries.oauthGoodreads(ctx);
      console.log(r);
      ctx.redirect(r);
//      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

router.get('/goodreads_oauth_callback', async (ctx) => {
  console.log("get callback =>")
  console.log(ctx.req.url)
  const parsedUrl = url.parse(ctx.req.url, true);

  console.log(parsedUrl.query);

  //await gr.getAccessToken()

  ctx.body = {
    status: 'success',
    data: parsedUrl.query
  };

  // 2019-07-09T06:19:13.464878+00:00 app[web.1]: get callback =>
  // 2019-07-09T06:19:13.465031+00:00 app[web.1]: /goodreads_oauth_callback?oauth_token=2FJhgcTyOkkKydZMfJsDw&authorize=1
  // 2019-07-09T06:19:13.468317+00:00 app[web.1]: [Object: null prototype] {
  // 2019-07-09T06:19:13.468321+00:00 app[web.1]: oauth_token: '2FJhgcTyOkkKydZMfJsDw',
  // 2019-07-09T06:19:13.468322+00:00 app[web.1]: authorize: '1'
  // 2019-07-09T06:19:13.468324+00:00 app[web.1]: }  
});

router.post('/goodreads_oauth_callback', async (ctx) => {
  console.log("post callback: " + ctx.request)
});

module.exports = router;