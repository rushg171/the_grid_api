const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6520636',
    password: 'AhFXmK1Fxe',
    database: 'sql6520636',
  },
});

module.exports = { knex };
