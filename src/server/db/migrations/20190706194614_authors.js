
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('authors', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),
        knex.schema.createTable('books_authors', function(table){
            table.increments('id').primary();
            table.integer('author_id').references('authors.id').onDelete('CASCADE');
            table.integer('book_id').references('books.id').onDelete('CASCADE');
          }),
        knex.schema.table('books', (table) => {
            table.integer('isbn13').notNullable();
            table.date('publication_date');
        }),
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('books_authors'),
        knex.schema.dropTable('authors'),
        knex.schema.table('books', (table) => {
            table.dropColumn('isbn13');
            table.dropColumn('publication_date');
        }),
    ]);
};
