const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const pgClient = new pg.Client(connectionString);
// client.connect();

module.exports = pgClient;