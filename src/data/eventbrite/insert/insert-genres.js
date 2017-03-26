require('dotenv')
.config({path: '/Users/Martial-One/Desktop/Coding/currentsoundglom/getmusiclive/.env'});
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv')
  .config({path: '/Users/Martial-One/Desktop/Coding/currentsoundglom/getmusiclive/.env'});
}

const axios = require('axios');
const genreData = require('../data/eventbrite/eb-genres.json');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);
client.connect();

const EVENTBRITE_KEY = process.env.EVENTBRITE_KEY;
const EVENTBRITE_URL = 'https://www.eventbriteapi.com/v3/categories/103/?token=';
const url = `${EVENTBRITE_URL}${EVENTBRITE_KEY}`;
console.log(url);

const insertGenres = (json) => {
  json.subcategories
    .forEach((genre, index) => {
      const { id: genreId, name: genreName } = genre;
      
      client.query(
        `INSERT INTO event_genres (id, genre_code, event_genre)
        VALUES ($1, $2, $3)`, 
        [index, Number(genreId), genreName],
        (err) => {
          if (err) throw err;

        }
      );
    });

  client.on('end', (err, result) => {
    if (err) console.log(err);

    console.log('Query results: ', result);
    client.end();
  });
};

// const getGenres = () => {
//   axios.get(url)
//     .then(response => {
//       insertGenres(response.data);
//     });
// };
// 
// insertGenres(genreData);

module.exports = insertGenres;
