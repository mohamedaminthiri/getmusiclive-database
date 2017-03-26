const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').config();  
}

// NOTE: ---------- Use correct location file -------------
const locationData = require('../utilities/get-locations');
console.log(JSON.stringify(locationData));
// NOTE: ---------- Use correct location file -------------

const axios = require('axios');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);

client.connect();

// ---------- Create module for the above ---------------

const insertLocations = (json) => {
  json.subcategories
    .forEach((venue, index) => {
      const { address, name, latitude, longitude } = venue;
      const { address_1: street, city, postal_code: zip, country, region } = address;
      client.query(
        `INSERT INTO event_venues (
          id, venue_name, venue_address, venue_city, venue_state, venue_zip, 
          venue_country, venue_latitude, venue_longitude
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
        [
          index, name, 'address', city, region, zip, country, latitude, longitude
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

const getLocations = (arr, num) => {
  console.log('Get locations')
  // if (arr.length !== num) return
  arr.forEach(event => {
    insertLocations(event.venue)
  });
};



module.exports = getLocations;
