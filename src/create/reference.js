if (env === 'development') {
  console.log('Dev environment')
  require('dotenv').config();  
}
const pg = require('pg');
    
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/getmusiclive';
const client = new pg.Client(connectionString);
const key = process.env.EVENTBRITE_KEY;

    dataScraped = require('./../Data/musicSites.js');


const client, query, query1, query2, data, queryInsert;




client.connect();

// If the scraped events table exists, drop it before repopulating
client.query('DROP TABLE IF EXISTS ');

// Create the table for the scraped events
client.query('CREATE TABLE newEvents(id SERIAL PRIMARY KEY,data json)');
client.query('CREATE TABLE newEvents(id SERIAL PRIMARY KEY,data json)');
client.query('CREATE TABLE newEvents(id SERIAL PRIMARY KEY,data json)');


// populate the table with the data scrapped
data = dataScraped;
data.forEach(function(element, index) {
  queryInsert = client.query('INSERT INTO newEvents(id, data) values($1,$2)', [index, element]);
});

queryInsert.on('end',  function() { client.end(); console.log(key); });
