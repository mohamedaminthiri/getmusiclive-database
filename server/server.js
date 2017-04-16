const express = require('express');
const fetchEvents = require('./middleware/fetch-events');
const PORT = process.env.PORT || 5005;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!!!');
});

app.get('/events', fetchEvents);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
