// Middleware
const insertGenres = require('./insert-genres.js'); // insertGenres(genreData);
const insertVenues = require('./insert-venues.js'); // insertVenues(venueData);
const insertEvents = require('./insert-events.js'); // insertEvents(events2);

// Data
const { subcategories: genres } = require('../json-data/eb-genres.json');
const { events } = require('../json-data/eb-events-2-fomatted.json');
const { venues } = require('../json-data/venue-data.json');

insertGenres(genres);
insertVenues(venues);
insertEvents(events);
