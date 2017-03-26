const express = require('express');
const { json: jsonParser } = require('body-parser');
const pgClient = require('../database/pg-connector');
const fetchEvents = require('./middleware/fetch-events');
const PORT = process.env.PORT || 3350;

const app = express();
// pgClient.connect();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!!!');
});

app.get('/events', fetchEvents);



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


