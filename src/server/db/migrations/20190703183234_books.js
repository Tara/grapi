exports.up = (knex, Promise) => {
    return knex.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable().unique();
      table.string('genre').notNullable();
      table.integer('goodreads_id').notNullable();
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('books');
  };