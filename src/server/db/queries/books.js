const knex = require('../connection');

function getAllBooks() {
  return knex('books')
  .select('*');
}

function getSingleBook(id) {
  return knex('books')
  .leftJoin('books_authors', {'books.id' : 'books_authors.book_id'})
  .leftJoin('authors', {'authors.id' : 'books_authors.author_id'})
  .select('books.*', 'authors.name')
  .select('*')
  .where({'books.id': parseInt(id)})
  .reduce(function(book, authorEntry) {
    // if we are in the first entry, copy all the data from the author
      if (!book.title) {
        book = authorEntry;
        book.authors = [];
      }

      // add the author's name
      book.authors.push(authorEntry.name);
      
      // delete the data we don't want in the final result
      delete book['author'];
      delete book['name'];
      delete book['author_id'];
      return book;
    }, {});
}

module.exports = {
  getAllBooks,
  getSingleBook
};