const events = require('../json-data/eb-events.json').events;
const events2Raw = require('../json-data/eb-events-2-raw.json').events;

const locations1 = events.map(({ venue }) => venue);
const locations2 = events2Raw.map(({ venue }) => venue);

const getVenueSet = locations => {
  const venueNames = {};
  
  locations.forEach(({ name }) => {
    if (name !== null) venueNames[name] = [name, 0];
  });
  
  return venueNames;
};

const formatLocation = location => {
  // console.log(location);
  const { name, address, longitude, latitude } = location;
  const { address_1: street, city, region: state, postal_code: zip, country } = address;
  
  return {
    name, street, city, state, zip, country, longitude, latitude
  };
};

const createUniqueVenueList = (locations, venueHash) => {  
  return locations.map(formatLocation).filter(location => {
    if (!location.name) return false;
    
    const { name } = location;
    const tempVenueHash = Object.assign({}, venueHash);
    const venueCount = tempVenueHash[name][1];
    
    if (venueCount === 0) {
      tempVenueHash[name][1]++;

      return true;      
    }
  });
};

console.log(JSON.stringify(createUniqueVenueList(locations2, getVenueSet(locations2))));

// module.exports = createUniqueVenueList(locations, getVenueSet(locations));