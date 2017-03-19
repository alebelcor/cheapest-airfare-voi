'use strict';

const getLegs = require('./get-legs');

module.exports = data => {
  if (data.volarisAvailability.trips[0].flightDates[0].flightCount === 0) {
    throw new Error('No availability found');
  }

  return {
    outbound: getLegs(data.volarisAvailability.trips[0]),
    inbound: getLegs(data.volarisAvailability.trips[1])
  };
};
