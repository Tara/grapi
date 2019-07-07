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

  function getSingleAuthor(id) {
    return knex('authors')
    .leftJoin('books_authors', {'authors.id' : 'books_authors.author_id'})
    .leftJoin('books', {'books.id' : 'books_authors.book_id'})
    .select('authors.*', 'books.title')
    .where({'authors.id': parseInt(id)})
    .reduce(function(author, bookEntry) {
      // if we are in the first entry, copy all the data from the book
        if (!author.name) {
          author = bookEntry;
          author.books = [];
        }
  
        // add the author's name
        author.books.push(bookEntry.title);
        
        // delete the data we don't want in the final result
        delete author['title'];
        return author;
      }, {});
  }

module.exports = {
  getAllAuthors,
  getSingleAuthor
};