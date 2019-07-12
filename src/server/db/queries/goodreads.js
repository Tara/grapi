const Goodreads = require('goodreads-api-node');

const { goodreads_api_key, goodreads_api_secret } = require('../../config');

const myCredentials = {
    key: goodreads_api_key,
    secret: goodreads_api_secret
};
  
const goodreads = Goodreads(myCredentials);

function getUserBooks(user) {
    return goodreads.getBooksOnUserShelf({id: user, shelf:"read"});
    //return goodreads.getBooksByAuthor('175417')
}

async function oauthGoodreads(ctx) {
    // get the host location
    const hostLoc = ctx.req.headers.origin

    goodreads.initOAuth(hostLoc + '/goodreads_oauth_callback');
    return goodreads.getRequestToken()
}

module.exports = {
    getUserBooks,
    oauthGoodreads
}