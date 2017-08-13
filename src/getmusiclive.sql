DROP DATABASE IF EXISTS getmusiclive;
CREATE DATABASE getmusiclive;

\c getmusiclive;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Events'
-- All events
-- ---

DROP TABLE IF EXISTS events;
    
CREATE TABLE events (
  id serial PRIMARY KEY, -- Primary key for events
  event_id TEXT NULL DEFAULT NULL, -- Event Id in reference to API
  event_title VARCHAR(50) NULL DEFAULT NULL, -- Title of the event
  event_description_long TEXT NULL DEFAULT NULL, -- Event long description
  event_description_short TEXT NULL DEFAULT NULL, -- Event  short description
  event_genre INTEGER NULL DEFAULT NULL, -- Genre foreign key
  event_start_timezone TEXT NULL DEFAULT NULL, -- Event start timezone
  event_start_time_local TEXT NULL DEFAULT NULL, -- Event local start time
  event_end_timezone TEXT NULL DEFAULT NULL, -- Event end timezone
  event_end_time_local TEXT NULL DEFAULT NULL, -- Event local end time
  event_venue INTEGER NULL DEFAULT NULL, -- Event venue _foreign key_
  event_logo_url TEXT NULL DEFAULT NULL, -- Event logo url
  event_logo_aspect_ratio TEXT NULL DEFAULT NULL, -- Event logo aspect ratio
  event_logo_edge_color TEXT NULL DEFAULT NULL, -- Event logo edge color
  event_url TEXT NULL DEFAULT NULL, -- Event url
  event_peformer TEXT NULL DEFAULT NULL -- Event performer
);

-- ---
-- Table 'event_genres'
-- Genres table
-- ---

DROP TABLE IF EXISTS event_genres;
    
CREATE TABLE event_genres (
  id serial PRIMARY KEY,
  genre_code INTEGER, -- code given by API,
  event_genre VARCHAR(20) NULL DEFAULT NULL -- Music genres for events
);

-- ---
-- Table 'Event Venues'
-- Venue for events (address)
-- ---

DROP TABLE IF EXISTS event_venues;
    
CREATE TABLE event_venues (
  id serial PRIMARY KEY,
  venue_name VARCHAR(100) NULL DEFAULT NULL,
  venue_address VARCHAR(50) NULL DEFAULT NULL,
  venue_city VARCHAR(50) NULL DEFAULT NULL,
  venue_state VARCHAR(15) NULL DEFAULT NULL,
  venue_zip VARCHAR(10) NULL DEFAULT NULL,
  venue_country VARCHAR(3) NULL DEFAULT NULL,
  venue_latitude VARCHAR(30) NULL DEFAULT NULL,
  venue_longitude VARCHAR(30) NULL DEFAULT NULL
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE events ADD FOREIGN KEY (event_genre) REFERENCES event_genres (id); -- Sequence foreign keys for genres
ALTER TABLE events ADD FOREIGN KEY (event_venue) REFERENCES event_venues (id); -- Sequence foreign keys for locations
