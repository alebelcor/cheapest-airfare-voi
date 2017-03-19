'use strict';

const getSortedLegsByLowestFare = require('./get-sorted-legs-by-lowest-fare');

module.exports = legs => {
  const sortedLegsByLowestFare = getSortedLegsByLowestFare(legs);

  return sortedLegsByLowestFare[0];
};
