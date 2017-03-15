const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';

const client = new pg.Client(connectionString);

const createTables = () => {
  client.connect((err) => {
    if (err) throw err;

    client.query('DROP TABLE IF EXISTS events');

    // Create the genres table
    client.query(`DROP TABLE IF EXISTS event_genres;`);
    client.query(
      `CREATE TABLE event_genres (
        event_genre_id serial PRIMARY KEY,
        event_genre VARCHAR(20) NULL DEFAULT NULL,
        genre_api_key VARCHAR(20) NULL DEFAULT NULL
      );`
    );

    // Create the locations table
    client.query(`DROP TABLE IF EXISTS event_locations;`);
    client.query(
      `CREATE TABLE event_locations (
        event_location_id serial PRIMARY KEY,
        event_city VARCHAR(20) NULL DEFAULT NULL,
        event_venue json NULL DEFAULT NULL
      );`
    );

    // Create events table
    
    client.query(
      `CREATE TABLE events (
        event_id serial PRIMARY KEY,
        event_api_id VARCHAR(20) NULL DEFAULT NULL,
        event_title VARCHAR(20) NULL DEFAULT NULL,
        event_description TEXT NULL DEFAULT NULL,
        event_genre INTEGER REFERENCES event_genres (event_genre_id),
        event_location INTEGER REFERENCES event_locations (event_location_id)
      );`
    );

    client.on('end', (err) => {
      if (err) throw err;

      console.log('connected to pg database');    
    });
  });
};

module.exports = createTables;
// Create the venues table
    // client.query(`DROP TABLE IF EXISTS event_venues;`);
    // client.query(
    //   `CREATE TABLE event_venues (
    //     id serial PRIMARY KEY,
    //     name VARCHAR(50),
    //     address VARCHAR(20),
    //     city VARCHAR(20),
    //     state VARCHAR(15),
    //     zip VARCHAR(10),
    //     country VARCHAR(3),
    //     latitude VARCHAR(30),
    //     longitude VARCHAR(30) NULL DEFAULT NULL
    //   );`
    // );

    // Foreign Keys
    // client.query(
    //   `ALTER TABLE events 
    //   ADD FOREIGN KEY (event_genre) 
    //   REFERENCES event_genres (id);`
    // );

    // client.query(
    //   `ALTER TABLE events 
    //   ADD FOREIGN KEY (event_location) 
    //   REFERENCES event_locations (id);`
    // );
