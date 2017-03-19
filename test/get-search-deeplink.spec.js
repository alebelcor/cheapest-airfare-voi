'use strict';

import test from 'ava';

import fn from '../lib/get-search-deeplink';

const options = {
  originAirport: 'MEX',
  destinationAirport: 'TIJ',
  departureDate: '01/01/2016',
  returnDate: '01/05/2016'
};

test('it should return a deeplink URL for the search (with return date)', t => {
  const url = fn(options);

  t.is(url, 'https://www.volaris.com/Flight/Select?o1=MEX&d1=TIJ&dd1=01/01/2016&o2=TIJ&d2=MEX&dd2=01/05/2016&cc=MXN');
});

test('it should return a deeplink URL for the search', t => {
  delete options.returnDate;
  const url = fn(options);

  t.is(url, 'https://www.volaris.com/Flight/Select?o1=MEX&d1=TIJ&dd1=01/01/2016&cc=MXN');
});
