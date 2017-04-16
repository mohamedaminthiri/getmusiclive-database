const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@172.17.0.1:6000/getmusiclive';

const pgClient = new pg.Client(connectionString);
pgClient.connect(err => {
  if (err) throw err;
});

module.exports = pgClient;
