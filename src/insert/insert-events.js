const events = require('../eb-events.json').events;
const genres = require('../eb-genres.json').subcategories;
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);
client.connect();

const event = events[0];
// event.subcategory_id = 'funk';

// const genreSwap = (event) => {
//   const genreCode = event.subcategory_id;
//   if (event.subcategory_id)
// }

events.forEach(event => {
  let genreCode = event.subcategory_id;

  genres.forEach(genre => {
    if (genreCode === genre.id) {
      event.subcategory_id = genre.name;
    } else if (!genreCode) {
      event.subcategory_id = 'Other';
    }
  });

  event.venue.address.city = 'Oakland';

});


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


events.forEach( event => {
  console.log(event.subcategory_id);
  let genre = event.subcategory_id;
  let location = event.venue.address.city;

  client.query(`SELECT id FROM event_genres WHERE genre_name = $1`, [genre], 
    (err, result1) => {
      if (err) throw err;
      
      let genreKey = result1.rows[0].id;
      console.log('Genre results: ', genreKey);

      client.query(`SELECT id FROM event_locations WHERE event_location = $1`, [location], 
        (err, result2) => {
          if (err) throw err;

          let locationKey = result2.rows[0].id;
          console.log('Location results: ', locationKey);

          client.query(
            `INSERT INTO events (event_id, event_title, event_genre, event_description, event_location)
            VALUES ($1, $2, $3, $4, $5)`, [event.id, event.name.text, genreKey, event.description.text, locationKey],
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

// console.log(test);


// const testEvents = () => console.lin
