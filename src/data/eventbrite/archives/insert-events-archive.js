// -------------- version 2.0 --------------
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

// -------------- version 1.0 --------------
// genres.forEach(genre => {
//   client.query(
//     `INSERT INTO event_genres (genre_name)
//     VALUES ($1);`, [genre.name]
//   );  
// });

//client.query('INSERT INTO newEvents(id, data) values($1,$2)', [index, element]);
// client.query(
//   `INSERT INTO event_locations (event_location)
//   VALUES ('Oakland');`
// );

// client.query(
//   `INSERT INTO event_locations (event_location)
//   VALUES ($1, $2, $3INT );`
// );

// client.query(
//   `INSERT INTO event_locations (event_location)
//   VALUES ('San Frnacisco');`
// );

// client.query(
//   `INSERT INTO events (event_id, event_title, event_genre)
//   VALUES (${event.name.text}, ${event.description.text});`
// );

// const test = null;

// client.query(
//   `SELECT event_genres 
//   FROM event_genres
//   WHERE id = 1
//   `
//   );
// events.forEach( event => {
//   console.log(event.subcategory_id);
//   client.query(
//     `INSERT INTO events (event_id, event_title, event_genre, event_description)
//     VALUES
//       (SELECT id FROM event_genres WHERE genre_name = ${event.subcategory_id}), 
//       ($1, $2, $4 `, [event.id, event.name.text, event.description.text, event.subcategory_id], (err, result) => {
//       if (err) throw err;

//       console.log('Query results: ', result);
//     }
//     // `INSERT INTO events (event_genre)
//     // VALUES ((SELECT id FROM event_genres WHERE upper(genre_name) = $1));`, [event.subcategory_id]
//   );

//   // client.query(
//   // );
// });