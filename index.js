'use strict';

const getValidatedOptions = require('./lib/get-validated-options');
const fetch = require('./lib/fetch');
const getLowestTotal = require('./lib/get-lowest-total');
const getResult = require('./lib/get-result');

module.exports = function (options) {
  const validatedOptions = getValidatedOptions(options);

  return fetch(validatedOptions)
    .then(getLowestTotal)
    .then(lowestTotal => getResult(lowestTotal, validatedOptions));
};
