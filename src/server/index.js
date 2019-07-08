const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const { port, secret_key } = require('./config');

const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
const authRoutes = require('./routes/auth');

const app = new Koa();

// sessions
app.keys = [secret_key];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes.routes());
app.use(bookRoutes.routes());
app.use(authorRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = server;