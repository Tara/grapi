const bcrypt = require('bcryptjs');

exports.seed = (knex) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('johnson', salt);

  return knex('users').del()
  .then(() => {
    return knex('users').insert({
        username: 'jeremy',
        password: hash,
      })
  });
};
