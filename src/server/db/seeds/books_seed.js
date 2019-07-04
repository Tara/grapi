exports.seed = (knex, Promise) => {
  return knex('books').del()
  .then(() => {
    return knex('books').insert({
      title: 'The Land Before Time',
      author: 'Bob',
      genre: 'Fantasy',
      goodreads_id: 7
    });
  })
  .then(() => {
    return knex('books').insert({
      title: 'The Land Before Time 2',
      author: 'Bob',
      genre: 'Science Fiction',
      goodreads_id: 8
    });
  })
  .then(() => {
    return knex('books').insert({
      title: 'The Fly',
      author: 'Bobby',
      genre: 'Fantasy',
      goodreads_id: 9
    });
  });
};