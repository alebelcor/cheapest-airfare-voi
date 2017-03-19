'use strict';

const airports = require('airports');
const moment = require('moment');
const constants = require('./constants');

module.exports = options => {
  const validatedOptions = {};

  if (!options) {
    throw new TypeError('Options are missing');
  }

  const originAirport = options.from;

  if (typeof originAirport !== 'string' || originAirport.length === 0) {
    throw new TypeError('Origin airport code is missing');
  }

  if (airports.find(airport => airport.iata === originAirport) === undefined) {
    throw new TypeError('Origin airport code is invalid');
  }

  validatedOptions.originAirport = originAirport;

  const destinationAirport = options.to;

  if (typeof destinationAirport !== 'string' || destinationAirport.length === 0) {
    throw new TypeError('Destination airport code is missing');
  }

  if (airports.find(airport => airport.iata === destinationAirport) === undefined) {
    throw new TypeError('Destination airport code is invalid');
  }

  validatedOptions.destinationAirport = destinationAirport;

  const departureDate = options.departure;

  if (typeof departureDate !== 'string' || departureDate.length === 0) {
    throw new TypeError('Departure date is missing');
  }

  const departureMoment = moment(departureDate, constants.DATETIME_DATE_FORMAT, true);
  const today = moment();

  if (!(departureMoment.isValid() && departureMoment.isSameOrAfter(today, 'day'))) {
    throw new TypeError('Departure date is invalid');
  }

  validatedOptions.departureDate = departureMoment.format(constants.DATETIME_DATE_FORMAT_REQUEST);

  const returnDate = options.return;

  if (typeof returnDate === 'string' && returnDate.length > 0) {
    const returnMoment = moment(returnDate, constants.DATETIME_DATE_FORMAT, true);

    if (!(returnMoment.isValid() && returnMoment.isSameOrAfter(today))) {
      throw new TypeError('Return date is invalid');
    }

    validatedOptions.returnDate = returnMoment.format(constants.DATETIME_DATE_FORMAT_REQUEST);
  }

  return validatedOptions;
};
