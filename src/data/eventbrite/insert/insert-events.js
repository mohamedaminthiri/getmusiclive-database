// const events = require('../json-data/formatted-events.json').events;
// const events2 = require('../json-data/eb-events-2-fomatted.json').events;
const {
  client, createValuesParams, pgConstants
} = require('../../../../database/index');

const { INSERT_INTO, FROM, WHERE, SELECT } = pgConstants;
const {
  EVENT_GENRES, EVENT_VENUES, VENUE_NAME, ID, EVENT_ID, EVENT_TITLE,
  EVENT_DESCRIPTION_LONG, EVENT_DESCRIPTION_SHORT, EVENT_GENRE,
  EVENT_START_TIMEZONE, EVENT_START_TIME_LOCAL, EVENT_END_TIMEZONE,
  EVENT_END_TIME_LOCAL, EVENT_VENUE, EVENT_LOGO_URL, EVENT_LOGO_ASPECT_RATIO,
  EVENT_LOGO_EDGE_COLOR, EVENT_URL, EVENT_PERFORMER, EVENTS
} = require('../constants');

// Pass in 'genre', creates and returns an 'id' query from the table
const getGenreId = (genreName) => {
  const genreQuery = client.query(
    `${SELECT} ${ID} ${FROM} ${EVENT_GENRES} ${WHERE} ${EVENT_GENRE} = $1`,
    [genreName]
  );

  genreQuery.on('error', error => console.error(error));

  return genreQuery;
};

// Pass in venue and optional callback to create the genreId query
const getVenueId = (venueName, callback) => {
  const venueQuery = client.query(
    `${SELECT} ${ID} ${FROM} ${EVENT_VENUES} ${WHERE} ${VENUE_NAME} = $1`,
    [venueName]
  );

  venueQuery.on('error', err => console.error(err));

  return venueQuery;
};

// Creates query insert string
const createEventsInsert = () => {
  return `${INSERT_INTO} ${EVENTS} (
    ${ID}, ${EVENT_ID}, ${EVENT_TITLE}, ${EVENT_DESCRIPTION_LONG}, 
    ${EVENT_DESCRIPTION_SHORT}, ${EVENT_GENRE}, ${EVENT_START_TIMEZONE}, 
    ${EVENT_START_TIME_LOCAL}, ${EVENT_END_TIMEZONE}, ${EVENT_END_TIME_LOCAL}, 
    ${EVENT_VENUE}, ${EVENT_LOGO_URL}, ${EVENT_LOGO_ASPECT_RATIO},
    ${EVENT_LOGO_EDGE_COLOR}, ${EVENT_URL}, ${EVENT_PERFORMER}
  )`;
};

// Creates the event query and returns the query to be resolved
const createEventQuery = (ebEvent, index, genreId, venueId) => {
  const {
    id, name, descriptionLong, descriptionShort, startTimeZone,
    startLocal, endTimeZone, endLocal, logoUrl, logoAspectRatio,
    logoEdgeColor, event_url, performer
  } = ebEvent;

  const insertEventQuery = client.query(
    `${createEventsInsert()} ${createValuesParams(16)}`,
    [
      index, id, name, descriptionLong, descriptionShort, genreId,
      startTimeZone, startLocal, endTimeZone, endLocal, venueId,
      logoUrl, logoAspectRatio, logoEdgeColor, event_url, performer
    ]
  );

  insertEventQuery.on('error', err => console.error(err));

  return insertEventQuery;
};

// Pass in an event object and index, returns a query
const insertEventsQuery = (ebEvent, index, callback = null) => {
  const { genre, venueName } = ebEvent;

  let genreId = 0;
  let venueId = 0;

  getGenreId(genre)
    .on('end', genreRes => {
      const { rows = null } = genreRes;

      genreId = !rows || !rows[0] ? 0 : rows[0].id;

      getVenueId(venueName)
        .on('end', venueRes => {
          const { rows = null } = venueRes;

          venueId = !rows || !rows[0] ? 0 : rows[0].id;

          createEventQuery(ebEvent, index, genreId, venueId)
            .on('end', eventsRes => {
              if (callback) {
                callback(eventsRes);
              } else {
                console.log('Events inserted!!!');
              }
            });
        });
    });
};

// Pass in the events array to insert the events into the DB
const insertEvents = (events, callback = null) => {
  events.forEach((ebEvent, index) => {
    insertEventsQuery(ebEvent, index);
  });
};

// insertEvents(events2)();

// const insertEventsMiddileware = events => (req, res) => {
//   insertEvents(events);
// };

module.exports = insertEvents;
