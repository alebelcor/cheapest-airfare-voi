'use strict';

import test from 'ava';

import fn from '../lib/get-query';

const options = {
  originAirport: 'MEX',
  destinationAirport: 'TIJ',
  departureDate: '01-01-2016'
};

test('it should have members', t => {
  const query = fn(options);

  t.is(query.o1, 'MEX');
  t.is(query.d1, 'TIJ');
  t.is(query.dd1, '01-01-2016');
  t.is(query.cc, 'MXN');
  t.is(query.format, 'json');
});

test('it should consider roundtrip flights', t => {
  options.returnDate = '05-01-2016';
  const query = fn(options);

  t.is(query.o2, 'TIJ');
  t.is(query.d2, 'MEX');
  t.is(query.dd2, '05-01-2016');
});
