const Knex = require('knex');
const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6523716',
    password: 'tsaxvpisEd',
    database: 'sql6523716',
  },
});

module.exports = { knex };
