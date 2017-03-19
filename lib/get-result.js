'use strict';

const getSearchDeeplink = require('./get-search-deeplink');

module.exports = (lowestTotal, options) => {
  return {
    total: lowestTotal,
    source: getSearchDeeplink(options)
  };
};
