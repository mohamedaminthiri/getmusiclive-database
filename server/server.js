const express = require('express');
const fetchEvents = require('./middleware/fetch-events');
const insertion = require('../src/data/eventbrite/insert/insert-eb-data');
// const PORT = process.env.PORT || 80; // Setting the port for Docker
const PORT = process.env.PORT || 8001;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!!!');
});

app.get('/events', fetchEvents);

app.listen(PORT, () => {
  /* eslint no-console: 0 */
  console.log(insertion());
  console.log(`Listening on port ${PORT}`);
});
