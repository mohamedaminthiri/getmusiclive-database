const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').config();  
}
const locationData = require('../utilities/get-locations');
console.log(locationData);

const axios = require('axios');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);

client.connect();

// ---------- Create module for the above ---------------

const insertLocations = (json) => {
  json.subcategories
    .forEach((venue, index) => {
      client.query(
        `INSERT INTO event_locations (event_location_id, event_city, event_venue)
        VALUES ($1, $2, $3)`, [index, venue.address.city, venue],
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

const getLocations = (arr, num) => {
  console.log('Get locations')
  // if (arr.length !== num) return
  arr.forEach(event => {
    insertLocations(event.venue)
  });
};



module.exports = getLocations;
