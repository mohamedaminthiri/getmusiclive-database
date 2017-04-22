const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('dotenv')
  .config({path: '/Users/Martial-One/Desktop/Coding/currentsoundglom/getmusiclive/.env'});
}

// const axios = require('axios');
const { subcategories: genres } = require('../json-data/eb-genres.json');
const client = require('../../../../database/pg-connector');

// console.log(client);
// ----------- Eventbrite Request Stuff --------------

// const EVENTBRITE_KEY = process.env.EVENTBRITE_KEY;
// const EVENTBRITE_URL = 'https://www.eventbriteapi.com/v3/categories/103/?token=';
// const url = `${EVENTBRITE_URL}${EVENTBRITE_KEY}`;
// console.log(url);

// ----------- Eventbrite Request Stuff --------------

// Create a genre insert query and return a resolver
const createGenreQuery = (genreObj, index) => {
  const { id: genreId, name: genreName } = genreObj;

  const genreInsert = client.query(
    `INSERT INTO event_genres (id, genre_code, event_genre)
    VALUES ($1, $2, $3)`,
    [
      index, Number(genreId), genreName
    ]
  );

  genreInsert.on('error', err => console.error(err));

  return genreInsert;
};

// Takes in a genres array and inserts each genre into the DB
const insertGenres = genres => {
  genres.forEach((genre, index) => {
    const insertGenre = createGenreQuery(genre, index);

    insertGenre.on('end', eventsRes => {
      console.log('Genre inserted!!!');
    });
  });
};

insertGenres(genres);

module.exports = insertGenres;
