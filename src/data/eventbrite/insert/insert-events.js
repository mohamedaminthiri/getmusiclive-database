const events = require('../json-data/formatted-events.json').events;
const events2 = require('../json-data/eb-events-2-fomatted.json').events;
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);
client.connect();

events2.forEach((eb_event, index) => {
  // console.log(event.subcategory_id);
  // let genre = event.subcategory_id;
  // let location = event.venue.address.city;
  
  const { 
    id, name, descriptionLong, descriptionShort, genre, startTimeZone,
    startLocal, endTimeZone, endLocal, venueName, logoUrl, logoAspectRatio,
    logoEdgeColor, event_url, performer
  } = eb_event;
  
  
  
  client.query(`SELECT id FROM event_genres WHERE event_genre = $1`, [genre], 
    (err, result1) => {
      if (err) throw err;
      
      const genreId = result1.rows[0].id;
      console.log('Venue name: ', venueName);
      client.query(`SELECT id FROM event_venues WHERE venue_name = $1`, [venueName], 
        (err, result2) => {
          if (err) throw err;
          // console.log('Venue rows: ', result2);
          const venueId = !result2.rows || !result2.rows[0] ? 0 : result2.rows[0].id;

          client.query(
            
            `INSERT INTO events (
              id, event_id, event_title, event_description_long,
              event_description_short, event_genre, event_start_timezone,
              event_start_time_local, event_end_timezone, event_end_time_local,
              event_venue, event_logo_url, event_logo_aspect_ration,
              event_logo_edge_color, event_url, event_peformer
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, 
            [
              index, id, name, descriptionLong, descriptionShort, genreId,
              startTimeZone, startLocal, endTimeZone, endLocal, venueId,
              logoUrl, logoAspectRatio, logoEdgeColor, event_url, performer
            ],
            (err) => {
              if (err) throw err;

            }            
          );
        }
      );
    }
  );
});

client.on('end', (err, result) => {
  if (err) console.log(err);

  console.log('Query results: ', result);
  client.end();
});


