'use strict';

const constants = require('./constants');

module.exports = options => {
  let deeplink = `${constants.ENDPOINT_SEARCH}` +
    `?o1=${options.originAirport}` +
    `&d1=${options.destinationAirport}` +
    `&dd1=${options.departureDate}`;

  if (options.returnDate) {
    deeplink = deeplink +
      `&o2=${options.destinationAirport}` +
      `&d2=${options.originAirport}` +
      `&dd2=${options.returnDate}`;
  }

  return deeplink + `&cc=MXN`;
};
