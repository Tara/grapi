const knex = require('../connection');

function getAllAuthors() {
  return knex('authors')
  .select('*');
}

function getSingleAuthor(id) {
    return knex('authors')
    .select('*')
    .where({ id: parseInt(id) });
  }

module.exports = {
  getAllAuthors,
  getSingleAuthor
};