const bcrypt = require('bcryptjs');
const knex = require('../connection');

function addUser(user) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);
    
    return knex('users')
    .insert({
        username: user.username,
        password: hash
    })
    .returning('*');
}

function updateUserGoodreads(user, goodreads_id) {
    return knex('users')
    .update({'goodreads_id' : goodreads_id})
    .where({ id: parseInt(user) })
    .returning('*');
}

function getGoodreadsID(user) {
    return knex('users')
    .select('goodreads_id')
    .where({ id: parseInt(user) })
    .first();
}

module.exports = {
    addUser,
    updateUserGoodreads,
    getGoodreadsID
};