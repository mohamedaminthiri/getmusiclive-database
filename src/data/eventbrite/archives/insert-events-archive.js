
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