const events = require('../json-data/formatted-events.json').events;
const events2 = require('../json-data/eb-events-2-fomatted.json').events;
const { 
  client, createValuesParams, pg_constants 
} = require('../../../../database/index');
const {
  EVENT_GENRES, EVENT_VENUES, VENUE_NAME, ID, EVENT_ID, EVENT_TITLE, 
  EVENT_DESCRIPTION_LONG, EVENT_DESCRIPTION_SHORT, EVENT_GENRE,
  EVENT_START_TIMEZONE, EVENT_START_TIME_LOCAL, EVENT_END_TIMEZONE,
  EVENT_END_TIME_LOCAL, EVENT_VENUE, EVENT_LOGO_URL, EVENT_LOGO_ASPECT_RATIO,
  EVENT_LOGO_EDGE_COLOR, EVENT_URL, EVENT_PERFORMER, EVENTS
} = require('../constants');

// Pass in 'genre'
const getGenreId = genreName => {  
  const genreQuery = client.query(
    `SELECT ${ID} FROM ${EVENT_GENRES} WHERE ${EVENT_GENRE} = $1`, [genreName]
  );
  
  genreQuery.on('error', error => console.error(error));
  
  return genreQuery;
  // return genreQuery.on('end', res => callback(res));
};

// Pass in venue
const getVenueId = (venueName, callback) => {
  // { ID, EVENT_VENUES, VENUE_NAME } = constants;
  
  const venueQuery = client.query(
    `SELECT ${ID} FROM ${EVENT_VENUES} WHERE ${VENUE_NAME} = $1`, [venueName]
  );
  
  venueQuery.on('error', err => console.error(err));
  
  // venueQuery.on('end', res => callback(res));
  return venueQuery;
};

// Creates value parameters string
// const createValuesParams = count => {
//   const { VALUES } = pg_constants;
//   
//   return `${VALUES} (${createParamsStr(count)})`;
// };

// Creates query insert string
const createEventsInsert = () => {
  const { INSERT_INTO } = pg_constants;
  
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
    id, name, descriptionLong, descriptionShort, genre, startTimeZone,
    startLocal, endTimeZone, endLocal, venueName, logoUrl, logoAspectRatio,
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
const insertEventsQuery = (ebEvent, index) => {
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
              console.log('Events inserted!!!');
            });
        });
    });
  
};

// 
const insertEvents = events => {
  events.forEach((eb_event, index) => {
    insertEventsQuery(eb_event, index);    
  });
};

insertEvents(events2);
// 
// events2.forEach((eb_event, index) => {
//   const { 
//     id, name, descriptionLong, descriptionShort, genre, startTimeZone,
//     startLocal, endTimeZone, endLocal, venueName, logoUrl, logoAspectRatio,
//     logoEdgeColor, event_url, performer
//   } = eb_event;  
//   
//   client.query(`SELECT id FROM event_genres WHERE event_genre = $1`, [genre], 
//     (err, result1) => {
//       if (err) throw err;
//       
//       const genreId = result1.rows[0].id;
//       console.log('Venue name: ', venueName);
//       client.query(`SELECT id FROM event_venues WHERE venue_name = $1`, [venueName], 
//         (err, result2) => {
//           if (err) throw err;
// 
//           const venueId = !result2.rows || !result2.rows[0] ? 0 : result2.rows[0].id;
// 
//           client.query(
//             
//             `INSERT INTO events (
//               id, event_id, event_title, event_description_long,
//               event_description_short, event_genre, event_start_timezone,
//               event_start_time_local, event_end_timezone, event_end_time_local,
//               event_venue, event_logo_url, event_logo_aspect_ratio,
//               event_logo_edge_color, event_url, event_peformer
//             )
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, 
//             [
//               index, id, name, descriptionLong, descriptionShort, genreId,
//               startTimeZone, startLocal, endTimeZone, endLocal, venueId,
//               logoUrl, logoAspectRatio, logoEdgeColor, event_url, performer
//             ],
//             (err) => {
//               if (err) throw err;
// 
//             }            
//           );
//         }
//       );
//     }
//   );
// });
// 
// client.on('end', (err, result) => {
//   if (err) console.log(err);
// 
//   console.log('Query results: ', result);
//   client.end();
// });
// 
// 
