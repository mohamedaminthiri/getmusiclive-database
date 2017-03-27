const pgClient = require('../../database/pg-connector');

const fetchEvents = (req, res) => {
  console.log('Getting all events');

  const query = pgClient.query('SELECT * FROM events');
  
  query.on('error', error => console.error(error));
  
  query.on('end', result => res.type('json').send(result.rows));
  
};

module.exports = fetchEvents;