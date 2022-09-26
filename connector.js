const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'sql6.freesqldatabase.com',
    user: 'sql6522091',
    password: 'eJUGWmRnIR',
    database: 'sql6522091',
  },
});

module.exports = { knex };
