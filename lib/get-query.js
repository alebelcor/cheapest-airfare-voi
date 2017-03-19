'use strict';

module.exports = options => {
  const query = {
    o1: options.originAirport,
    d1: options.destinationAirport,
    dd1: options.departureDate,
    cc: 'MXN',
    format: 'json'
  };

  if (options.returnDate) {
    query.o2 = options.destinationAirport;
    query.d2 = options.originAirport;
    query.dd2 = options.returnDate;
  }

  return query;
};
