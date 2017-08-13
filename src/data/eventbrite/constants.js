/* eslint object-property-newline: 0 */

// Table Constants
const EVENTS = 'events';
const EVENT_GENRES = 'event_genres';
const EVENT_VENUES = 'event_venues';

// Event insertion constants
const VENUE_NAME = 'venue_name';
const ID = 'id';
const EVENT_ID = 'event_id';
const EVENT_TITLE = 'event_title';
const EVENT_DESCRIPTION_LONG = 'event_description_long';
const EVENT_DESCRIPTION_SHORT = 'event_description_short';
const EVENT_GENRE = 'event_genre';
const EVENT_START_TIMEZONE = 'event_start_timezone';
const EVENT_START_TIME_LOCAL = 'event_start_time_local';
const EVENT_END_TIMEZONE = 'event_end_timezone';
const EVENT_END_TIME_LOCAL = 'event_end_time_local';
const EVENT_VENUE = 'event_venue';
const EVENT_LOGO_URL = 'event_logo_url';
const EVENT_LOGO_ASPECT_RATIO = 'event_logo_aspect_ratio';
const EVENT_LOGO_EDGE_COLOR = 'event_logo_edge_color';
const EVENT_URL = 'event_url';
const EVENT_PERFORMER = 'event_peformer';
const SEARCH_URL = '?sort_by=date&location.address=1451+7th+St%2C+Oakland%2C+CA+94607&location.within=50mi&categories=103&start_date.keyword=this_month&expand=venue';
const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const EVENTBRITE_URL = `${BASE_URL}${SEARCH_URL}`;
const PAGE = 'page';
const DEV_ENV = 'development';
const PROD_ENV = 'production';

module.exports = {
  EVENT_GENRES, EVENT_VENUES, VENUE_NAME, ID, EVENT_ID, EVENT_TITLE,
  EVENT_DESCRIPTION_LONG, EVENT_DESCRIPTION_SHORT, EVENT_GENRE,
  EVENT_START_TIMEZONE, EVENT_START_TIME_LOCAL, EVENT_END_TIMEZONE,
  EVENT_END_TIME_LOCAL, EVENT_VENUE, EVENT_LOGO_URL, EVENT_LOGO_ASPECT_RATIO,
  EVENT_LOGO_EDGE_COLOR, EVENT_URL, EVENT_PERFORMER, EVENTS, SEARCH_URL,
  EVENTBRITE_URL, PAGE, DEV_ENV, PROD_ENV
};
