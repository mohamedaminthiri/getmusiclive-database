/* eslint no-console: 0 */
const { get: axiosGet } = require('axios');
const { range } = require('lodash');
const { getLocations } = require('./get-locations');
const { eventsFormat } = require('./format-events');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  console.log('Dev environment');
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
// const dataFormat = require('./data-format.js');
// const getLocations = require('../../../database/insert/insert-locations');

const EVENTBRITE_KEY = `&token=${process.env.EVENTBRITE_KEY}`;
const SEARCH_URL = '?sort_by=date&location.address=1451+7th+St%2C+Oakland%2C+CA+94607&location.within=50mi&categories=103&start_date.keyword=this_month&expand=venue';
const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const EVENTBRITE_URL = `${BASE_URL}${SEARCH_URL}`;
const PAGE = 'page';
const eventbrite = `${EVENTBRITE_URL}${EVENTBRITE_KEY}`;

const addQuery = (key, value) => {
  const pair = `&${key}=${value}`;

  return `${EVENTBRITE_URL}${pair}${EVENTBRITE_KEY}`;
};

const eventbriteReq = axiosGet(eventbrite);
const paginationRequest = ({ page_count: pageCount }) => {
  const reqs = range(2, pageCount + 1);

  return reqs.map(count => axiosGet(addQuery(PAGE, count)));
};

eventbriteReq
  .then(({ data }) => {
    const { events, pagination } = data;
    const pages = Promise.all(paginationRequest(pagination));

    pages.then(values => console.log(values[0].data.events));
    // console.log('Formatted events: ', eventsFormat(events)[0]);
    // console.log('Locations: ', getLocations(events));
  }).catch(err => console.log('ERROR!!! ', err));


// 
// // Pass in the formatted events Array
// const repeatRequest = (stuff, arr) => {
//   // console.log('Logging', stuff);
//   let pageCount = stuff.pagination.page_count;
//   const currentPage = stuff.pagination.page_number;
//   const THIS_DATE = stuff.events[stuff.events.length - 1].start.local;
//   console.log(THIS_DATE);
// 
//   const makeRequest = () => {
//     pageCount += 1;
// 
//     if (currentPage >= pageCount) {
//       return;
//     }
// 
//     get(url)
//       .then((res) => {
//         dataFormat(res.data.events, arr);
//       })
//       .then(() => {
//         makeRequest();
//       });
//   };
//   makeRequest();
// };
// 
// const ebFetch = (arr, other) => {
//   // console.log(arr[0]);
//   return (req, res, next) => {
//     const test1 = (stuff, func) => {
//       return () => {
//         func(stuff);
//       };
//     };
// 
//     get(eventbrite)
//       .then(response => {
//         // arr.length = 0;
//         dataFormat(response.data.events, arr);
//         return response;
//       })
//       .then(that => {
//         repeatRequest(that.data, arr);
//       })
//       .then(() => {
//         getLocations(arr);
//       })
//       .catch(err => {
//         console.log(err);
//         // next(err);
//       });
//     next();
//   };
// };
// 
// module.exports = {
//   ebFetch: ebFetch,
//   repeatRequest: repeatRequest
// };