
exports.up = (knex, Promise) => {
    return knex.schema.table('users', (table) => {
      table.integer('goodreads_id');
    });
  };
  
  exports.down = (knex, Promise) => {
    knex.schema.table('users', (table) => {
      table.dropColumn('goodreads_id');
    });
};