const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').config();  
}

// NOTE: ---------- Use correct location file -------------
// const locationData = require('../utilities/get-Venues');
// console.log(JSON.stringify(locationData));
// NOTE: ---------- Use correct location file -------------

const venueData = require('../data/eventbrite/json-data/venue-data.json').venues;

const axios = require('axios');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);

client.connect();

// ---------- Create module for the above ---------------

const insertVenues = venues => {
  venues
    .forEach((venue, index) => {
      const { name, street, city, state, zip, country, latitude, longitude } = venue;
      
      client.query(
        `INSERT INTO event_venues (
          id, venue_name, venue_address, venue_city, venue_state, venue_zip, 
          venue_country, venue_latitude, venue_longitude
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
        [
          index, name, street, city, state, zip, country, latitude, longitude
        ],
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

// insertVenues(venueData);

// module.exports = getVenues;

