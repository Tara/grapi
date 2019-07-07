exports.seed = (knex, Promise) => {
  return knex('books').del()
  .then(() => {
    return knex('books').insert({
      title: 'The Land Before Time',
      genre: 'Fantasy',
      goodreads_id: 7,
      isbn13: 112314234,
      publication_date: '12/3/2016'
    });
  })
  .then(() => {
    return knex('books').insert({
      title: 'The Land Before Time 2',
      genre: 'Science Fiction',
      goodreads_id: 8,
      isbn13: 212314234,
      publication_date: '1/3/2000'
    });
  })
  .then(() => {
    return knex('books').insert({
      title: 'The Fly',
      genre: 'Fantasy',
      goodreads_id: 9,
      isbn13: 312314234,
      publication_date: '11/30/1972'
    });
  });
};