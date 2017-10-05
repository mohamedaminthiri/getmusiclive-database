// Local genres file
const genreData = require('../json-data/eb-genres.json').subcategories;

// Create a short description
const descrFormat = (descr) => {
  if (!descr) {
    return 'No description';
  }
  return descr.substring(0, 300);
};

// Set null genre codes to 'Other' code
const fixGenreCode = (code) => {
  if (code === null || !code) {
    return '3999';
  }

  return code;
};

// Create a map for the genre code
const genreMap = arr => arr.reduce((acc, { id, name }) => {
  acc[id] = name;

  return acc;
}, {});

// Translate genre codes
const createGenre = (code, obj) => obj[code];

// Format and create new event object
const formatEvents = event => ({
  id: event.id,
  name: event.name.text.substring(0, 49),
  descriptionShort: descrFormat(event.description.text),
  descriptionLong: 'Long descriptiong',
  genre: createGenre(fixGenreCode(event.subcategory_id), genreMap(genreData)),
  startTimeZone: event.start.timezone,
  startLocal: event.start.local,
  endTimeZone: event.start.timezone,
  endLocal: event.start.local,
  venueName: event.venue.name,
  logoUrl: !event.logo ? null : event.logo.url,
  logoAspectRatio: !event.logo ? null : event.logo.aspect_ratio,
  logoEdgeColor: !event.logo ? null : event.logo.edge_color,
  event_url: event.url,
  performer: 'Artist'
});

// Format Eventbrite API data
const eventsFormat = events => events.map(event => formatEvents(event));

module.exports = eventsFormat;
