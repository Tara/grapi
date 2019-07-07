const Router = require('koa-router');
const queries = require('../db/queries/authors');

const router = new Router();
const BASE_URL = `/api/v1/authors`;

router.get(BASE_URL, async (ctx) => {
    try {
        const authors = await queries.getAllAuthors();
        ctx.body = {
            status: 'success',
            data: authors
        };
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const author = await queries.getSingleAuthor(ctx.params.id);
        if (author.length) {
            ctx.body = {
                status: 'success',
                data: author
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That author does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;