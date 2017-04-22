const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('dotenv').config();
}

const venueData = require('../json-data/venue-data.json').venues;
const client = require('../../../../database/pg-connector');

// Create a venue insert query and return a resolver
const createVenueQuery = (venueObj, index) => {
  const {
    name, street, city, state, zip, country, latitude, longitude
  } = venueObj;

  const venueInsert = client.query(
    `INSERT INTO event_venues (
      id, venue_name, venue_address, venue_city, venue_state, venue_zip, 
      venue_country, venue_latitude, venue_longitude
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id`,
    [
      index, name, street, city, state, zip, country, latitude, longitude
    ]
  );

  venueInsert.on('error', err => console.error(err));

  return venueInsert;
};

// Insert venue data into the DB
const insertVenues = (venues, callback = null) => {
  venues.forEach((venue, index) => {
    const insertVenue = createVenueQuery(venue, index);

    insertVenue.on('end', eventsRes => {
      if (callback) callback();

      console.log('Venue inserted!!!');
    });
  });
};

// insertVenues(venueData);

module.exports = insertVenues;
