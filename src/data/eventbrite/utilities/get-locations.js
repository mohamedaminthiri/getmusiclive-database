const getVenues = eventsArr => eventsArr.map(({ venue }) => venue);

const getVenueSet = (locations) => {
  const venueNames = {};

  locations.forEach(({ name }) => {
    if (name !== null) venueNames[name] = [name, 0];
  });

  return venueNames;
};

const formatLocation = (location) => {
  const { name, address, longitude, latitude } = location;
  const {
    address_1: street,
    city,
    region: state,
    postal_code: zip,
    country
  } = address;

  return {
    name,
    street,
    city,
    state,
    zip,
    country,
    longitude,
    latitude
  };
};

const createUniqueVenueList = (locations, venueHash) => locations.map(formatLocation)
  .filter((location) => {
    if (!location.name) return false;

    const { name } = location;
    const tempVenueHash = Object.assign({}, venueHash);
    const venueCount = tempVenueHash[name][1];

    if (venueCount === 0) {
      tempVenueHash[name][1] += 1;

      return true;
    }

    return false;
  });

const getLocations = (eventsRes) => {
  const locs = getVenues(eventsRes);
  const venueHash = getVenueSet(locs);
  const uniqueVenueList = createUniqueVenueList(locs, venueHash);

  return uniqueVenueList;
};

module.exports = getLocations;
