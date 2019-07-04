const Koa = require('koa');
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(indexRoutes.routes());
app.use(bookRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;