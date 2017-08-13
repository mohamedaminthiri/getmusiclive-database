const pgClient = require('../../database/pg-connector');

const fetchEvents = (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Getting all events');

  const query = pgClient.query('SELECT * FROM events');

  // eslint-disable-next-line no-console
  query.on('error', error => console.error(error));

  query.on('end', result => res.type('json').send(result.rows));
};

module.exports = fetchEvents;
