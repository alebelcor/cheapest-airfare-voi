'use strict';

const getLegFares = require('./get-leg-fares');

module.exports = rawLegs => {
  if (!rawLegs) {
    return [];
  }

  return rawLegs.flightDates[0].flights.map(rawLeg => {
    return {
      fares: getLegFares(rawLeg)
    };
  });
};
