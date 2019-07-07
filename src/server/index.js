const Koa = require('koa');
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

const { port } = require('./config');
const app = new Koa();

app.use(indexRoutes.routes());
app.use(bookRoutes.routes());
app.use(authorRoutes.routes());

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = server;