'use strict';

const getLowestFare = require('./get-lowest-fare');

module.exports = legs => {
  return legs.sort((a, b) => {
    return getLowestFare(a) - getLowestFare(b);
  });
};
