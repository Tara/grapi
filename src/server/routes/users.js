const Router = require('koa-router');
const fs = require('fs');
const queries = require('../db/queries/users');

const router = new Router();

router.get('/user', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/user.html');
  } else {
    ctx.redirect('/auth/login');
  }
});

router.post('/user/update', async (ctx) => {  
  if (ctx.isAuthenticated()) {
    const user = await queries.updateUserGoodreads(ctx.state.user.id, ctx.request.body.goodreads_id);

    if (user.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: user
      };      
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That user does not exist.'
      };      
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Cannot update user while not logged in'
    };
  }
});


module.exports = router;