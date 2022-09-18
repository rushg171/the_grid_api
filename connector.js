const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'kkkljdddfs@2A',
    database: 'the_grid',
  },
});

module.exports = { knex };
