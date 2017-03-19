'use strict';

import test from 'ava';
import moment from 'moment';
import isPlainObj from 'is-plain-obj';

import constants from '../lib/constants';
import fn from '../lib/get-result';

const today = moment();
const options = {
  originAirport: 'MEX',
  destinationAirport: 'LAX',
  departureDate: today.add(20, 'days').format(constants.DATETIME_DATE_FORMAT),
  returnDate: today.add(25, 'days').format(constants.DATETIME_DATE_FORMAT)
};

test('it should return a result object', t => {
  t.true(isPlainObj(fn(1000, options)));
});

test('it should return a result object with certain members', t => {
  const result = fn(2000, options);

  t.true(Object.prototype.hasOwnProperty.call(result, 'total'));
  t.is(typeof result.total, 'number');
  t.is(result.total, 2000);

  t.true(Object.prototype.hasOwnProperty.call(result, 'source'));
  t.is(typeof result.source, 'string');
});
