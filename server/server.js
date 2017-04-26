const express = require('express');
const fetchEvents = require('./middleware/fetch-events');
const insertion = require('../src/data/eventbrite/insert/insert-eb-data');
const PORT = process.env.PORT || 80;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!!!');
});

app.get('/events', fetchEvents);

app.listen(PORT, () => {
  console.log(insertion());
  console.log(`Listening on port ${PORT}`);
});
