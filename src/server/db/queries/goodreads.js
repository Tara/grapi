const Goodreads = require('goodreads-api-node');
const userQueries = require('./users');

const { goodreads_api_key, goodreads_api_secret } = require('../../config');

const myCredentials = {
    key: goodreads_api_key,
    secret: goodreads_api_secret
};
  
const goodreads = Goodreads(myCredentials);

async function getUserBooks(user) {
    const { goodreads_id } = await userQueries.getGoodreadsID(user)
    
    return goodreads.getBooksOnUserShelf(goodreads_id, "read", {per_page: 200, sort: 'author'})
    .catch ((err) => {
        console.log(err);
    });
    //return goodreads.getBooksByAuthor('175417')
}

async function oauthGoodreads(ctx) {
    // get the host location
    const hostLoc = ctx.req.headers.origin

    goodreads.initOAuth(hostLoc + '/goodreads_oauth_callback');
    return goodreads.getRequestToken()
}

async function getGoodreadsAccessToken(ctx) {
    return goodreads.getAccessToken()
}

module.exports = {
    getUserBooks,
    oauthGoodreads,
    getGoodreadsAccessToken
}