const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  console.log('Dev environment')
  require('dotenv').config();  
}
const axios = require('axios');
const dataFormat = require('./data-format.js');
const getLocations = require('../../../database/insert/insert-locations');
const EVENTBRITE_KEY = process.env.EVENTBRITE_KEY;
const EVENTBRITE_URL = 'https://www.eventbriteapi.com/v3/events/search/?sort_by=date&venue.city=San+Francisco&venue.region=CA&categories=103&expand=venue&token=';
const SEARCH_URL = '?sort_by=date&location.address=1451+7th+St%2C+Oakland%2C+CA+94607&location.within=50mi&venue.region=CA&categories=103&start_date.range_start='
const BASE = 'https://www.eventbriteapi.com/v3/events/search/';

// const EVENTBRITE_QUERY = {
//   root: 'https://www.eventbriteapi.com/v3/events/search/',
//   sort: '?sort_by=date',
//   city: '&venue.city='
//   state: '&venue.region=CA',
//   options: '&categories=103'
// };
// 2016-07-08T16%3A00%3A00
const eventbrite = `${EVENTBRITE_URL}${EVENTBRITE_KEY}`;
const ebNext = ``;

const createQuery = (id, base, key) => {
  return `${base}${id}${key}`;
};
// Pass in the formatted events Array
const repeatRequest = (stuff, arr) => {
    // console.log('Logging', stuff);
    let count = 0;  
    let page_count = stuff.pagination.page_count;
    let object_count = stuff.pagination.object_count;
    let currentPage = stuff.pagination.page_number;
    let THIS_DATE = stuff.events[stuff.events.length - 1].start.local;
    console.log(THIS_DATE);
    
    const makeRequest = () => {
      page_count++;
      if (currentPage >= page_count) {
        return
      }

      let url = `${BASE}${SEARCH_URL}&page=${page_count}&token=${EVENTBRITE_KEY}`;
      axios.get(url)
        .then((res) => {
          dataFormat(res.data.events, arr);
        })
        .then(() => {
          makeRequest();
        });
    }
    makeRequest();    
}



// const ebFetch2 = (arr, url) => {
//   return (req, res, next) => {
//     axios.get(eventbrite)
//       .then((url) => {
//         arr.length = 0;
//         dataFormat(response.data.events, arr);
//         next(response.data.pagination);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     next();
//   };
// };


const ebFetch = (arr, other) => {
  // console.log(arr[0]);
  return (req, res, next) => {
    const test1 = (stuff, func) => {
      return () => {
        func(stuff);
      }
    }

    axios.get(eventbrite)
      .then((response) => {
        // arr.length = 0;
        dataFormat(response.data.events, arr);
        return response;
      })
      .then((that) => {
        repeatRequest(that.data, arr);
      })
      .then(() => {
        getLocations(arr);
      })
      .catch((err) => {
        console.log(err);
        // next(err);
      });
      next();
  };
};

module.exports = {
  ebFetch: ebFetch,
  repeatRequest: repeatRequest
};
