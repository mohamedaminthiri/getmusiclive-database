// const R = require('ramda');
const { get } = require('axios');
const { getLocations } = require('./get-locations');

const ebUrl = 'https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=1451+7th+St%2C+Oakland%2C+CA+94607&location.within=50mi&categories=103&start_date.keyword=this_month&expand=venue&token=MD33DX7LJOIGAGCBYRF7';

// Local genres file
const genreData = require('../json-data/eb-genres.json').subcategories;
const eventsData = require('../json-data/eb-events.json').events;
const eventsData2 = require('../json-data/eb-events-2-raw.json').events;

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
// {
//   const obj = {};
//
//   arr.forEach((genre) => {
//     obj[genre.id] = genre.name;
//   });
//   return obj;
// };

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

// get(ebUrl)
//   .then((res) => {
//     const events = eventsFormat(res.data.events);
//     // const locs = getVenues(res.data.events);
//     // console.log('Response: ', locs);
//     // console.log('Response: ', events);
//     const locations = getLocations(res.data.events);
//     console.log('Locations: ', locations);
//   })
//   .catch(err => console.log('Error: ', err));
// eslint-disable-next-line no-console
// console.log(JSON.stringify(eventFormat(eventsData2)));

module.exports = { eventsFormat };
