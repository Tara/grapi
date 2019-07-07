const faker = require('faker');

exports.seed = function(knex) {
  faker.seed(1000);

  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      const authors = []
      for (let i = 0; i < 100; ++i) {
        authors.push({
          name: faker.name.findName()
        });
      }

      // Inserts seed entries
      return knex('authors').insert(authors);
    });
};
