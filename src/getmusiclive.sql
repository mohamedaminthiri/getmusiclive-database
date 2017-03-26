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
  event_id INTEGER NULL, -- Event Id in reference to API
  event_title VARCHAR(20) NULL DEFAULT NULL, -- Title of the event
  event_genre INTEGER NULL DEFAULT NULL, -- Genre foreign key
  event_description TEXT NULL DEFAULT NULL, -- Event description
  event_venue INTEGER NULL DEFAULT NULL -- Location foreign key
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
-- Table 'Event Locations'
-- Location for events (city)
-- ---

DROP TABLE IF EXISTS event_locations;
    
CREATE TABLE event_locations (
  id serial PRIMARY KEY,
  event_location VARCHAR(20) NULL DEFAULT NULL -- Music event locations
);

-- ---
-- Table 'Event Venues'
-- Venue for events (address)
-- ---

DROP TABLE IF EXISTS event_venues;
    
CREATE TABLE event_venues (
  id serial PRIMARY KEY,
  venue_name VARCHAR(50) NULL DEFAULT NULL,
  venue_address VARCHAR(20) NULL DEFAULT NULL,
  venue_city VARCHAR(20) NULL DEFAULT NULL,
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

/************************************************

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Events'
-- All events
-- ---

DROP TABLE IF EXISTS `Events`;
    
CREATE TABLE `Events` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event_id` INTEGER NULL DEFAULT NULL COMMENT 'Id from the id''s table',
  `event_title` VARCHAR(20) NULL DEFAULT NULL COMMENT 'Titles from the event title table',
  `event_genre` INTEGER NULL DEFAULT NULL,
  `event_description` MEDIUMTEXT NULL DEFAULT NULL COMMENT 'Description of the event',
  `event_location` INTEGER NULL DEFAULT NULL COMMENT 'Event locations',
  PRIMARY KEY (`id`)
) COMMENT 'All events';

-- ---
-- Table 'event_genres'
-- Genres table
-- ---

DROP TABLE IF EXISTS `event_genres`;
    
CREATE TABLE `event_genres` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event_genres` VARCHAR(20) NULL DEFAULT NULL COMMENT 'Genres table',
  PRIMARY KEY (`id`)
) COMMENT 'Genres table';

-- ---
-- Table 'Event Locations'
-- Location for events (city)
-- ---

DROP TABLE IF EXISTS `Event Locations`;
    
CREATE TABLE `Event Locations` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event_location` VARCHAR(20) NULL DEFAULT NULL COMMENT 'City where event will occur',
  PRIMARY KEY (`id`)
) COMMENT 'Location for events (city)';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Events` ADD FOREIGN KEY (event_genre) REFERENCES `event_genres` (`id`);
ALTER TABLE `Events` ADD FOREIGN KEY (event_location) REFERENCES `Event Locations` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `event_genres` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Event Locations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Events` (`id`,`event_id`,`event_title`,`event_genre`,`event_description`,`event_location`) VALUES
-- ('','','','','','');
-- INSERT INTO `event_genres` (`id`,`event_genres`) VALUES
-- ('','');
-- INSERT INTO `Event Locations` (`id`,`event_location`) VALUES
-- ('','');

*/
