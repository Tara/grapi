
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books_authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('books_authors').insert([
        {id: 1, author_id: 25, book_id: 1},
        {id: 2, author_id: 3, book_id: 1},
        {id: 3, author_id: 73, book_id: 2},
        {id: 4, author_id: 16, book_id: 3},
      ]);
    });
};
