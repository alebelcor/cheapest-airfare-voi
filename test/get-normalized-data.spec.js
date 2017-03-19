'use strict';

import test from 'ava';
import isPlainObj from 'is-plain-obj';
import fn from '../lib/get-normalized-data';

import fixtures from './fixtures';

let data;

test('it should throw an error when there is no availability', t => {
  data = fn(fixtures);

  const error = t.throws(() => {
    fn({volarisAvailability: {trips: [{flightDates: [{flightCount: 0}]}]}});
  });

  t.is(error.message, 'No availability found');
});

test('it should return an object', t => {
  data = fn(fixtures);

  t.true(isPlainObj(data));
});

test('it should have certain members', t => {
  data = fn(fixtures);

  t.true(Object.prototype.hasOwnProperty.call(data, 'outbound'));
  t.true(Object.prototype.hasOwnProperty.call(data, 'inbound'));
});
