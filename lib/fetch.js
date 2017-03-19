'use strict';

const got = require('got');

const getQuery = require('./get-query');
const getResponseBody = require('./get-response-body');
const getNormalizedData = require('./get-normalized-data');

const ENDPOINT = require('./constants').ENDPOINT_SEARCH;

const getGotOptions = options => {
  return {
    json: true,
    query: getQuery(options),
    headers: {
      'user-agent': require('ua-string')
    }
  };
};

module.exports = options => {
  return got.get(ENDPOINT, getGotOptions(options))
    .then(getResponseBody)
    .then(getNormalizedData);
};
