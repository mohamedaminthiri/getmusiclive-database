/* eslint no-console: 0 */
const { get: axiosGet } = require('axios');
const { range } = require('lodash');
const { getLocations, eventsFormat } = require('./index');
const { insertEvents, insertVenues, insertGenres } = require('../insert/index');

const env = process.env.NODE_ENV || 'development';
const { EVENTBRITE_URL, PAGE, DEV_ENV } = require('../constants');

/* fallback for pulling in environmental variables */
if (env === DEV_ENV) {
  console.log('Dev environment');
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

/* Eventbrite URL's */
const EVENTBRITE_KEY = `&token=${process.env.EVENTBRITE_KEY}`;
const eventbrite = `${EVENTBRITE_URL}${EVENTBRITE_KEY}`;

const addQuery = (key, value) => {
  const pair = `&${key}=${value}`;

  return `${EVENTBRITE_URL}${pair}${EVENTBRITE_KEY}`;
};

// Eventbrite requests and pagination handlers
const eventbriteReq = axiosGet(eventbrite);
const paginationRequest = ({ page_count: pageCount }) => {
  const reqs = range(2, pageCount + 1);

  return reqs.map(count => axiosGet(addQuery(PAGE, count)));
};

// Not yet sure if I still need this
// const insertEventsCallback = ebEvents => () => insertEvents(ebEvents);

// insert event genres then make the Eventbrite request
insertGenres();
eventbriteReq
  .then(({ data }) => {
    // Pull out the first event and the pagination object
    const { events: firstEvents, pagination } = data;

    // Create the pagination promises or paginated requests
    const pages = Promise.all(paginationRequest(pagination));

    pages.then((values) => {
      // Reduce all the events into one object and add the first set of events
      const reducedValues = values.reduce((accEvents, pagedRes) => {
        const { data: { events: pagedEvents } } = pagedRes;
        const mergedEvents = accEvents.concat(pagedEvents);

        return mergedEvents;
      }, []).concat(firstEvents);

      // Get the locations and format the events from the reduced events
      const venues = getLocations(reducedValues);
      const formattedEvents = eventsFormat(reducedValues);

      // Insert the venues
      insertVenues(venues);

      return formattedEvents;
    }).then(eventsData => insertEvents(eventsData));
  }).catch(err => console.log('ERROR!!! ', err));
