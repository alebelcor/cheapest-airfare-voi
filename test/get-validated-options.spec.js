'use strict';

import test from 'ava';
import moment from 'moment';
import isPlainObj from 'is-plain-obj';

import constants from '../lib/constants';
import fn from '../lib/get-validated-options';

const options = {};

test('it should throw an error when options are not sent', t => {
  const error = t.throws(() => {
    fn();
  }, TypeError);

  t.is(error.message, 'Options are missing');
});

test('it should throw an error when origin airport is missing (type)', t => {
  options.from = {};

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Origin airport code is missing');
});

test('it should throw an error when origin airport is missing (blank)', t => {
  options.from = '';

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Origin airport code is missing');
});

test('it should throw and error when origin airport is invalid', t => {
  options.from = 'foo';

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Origin airport code is invalid');
});

test('it should throw an error when destination airport is missing (type)', t => {
  options.from = 'MEX';
  options.to = {};

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Destination airport code is missing');
});

test('it should throw an error when destination airport is missing (blank)', t => {
  options.from = 'MEX';
  options.to = '';

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Destination airport code is missing');
});

test('it should throw an error when destination airport is invalid', t => {
  options.from = 'MEX';
  options.to = 'foo';

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Destination airport code is invalid');
});

test('it should throw an error when departure date is missing (type)', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = {};

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Departure date is missing');
});

test('it should throw an error when departure date is missing (blank)', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = '';

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Departure date is missing');
});

test('it should throw an error when the departure date is in an invalid format', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format('YYYY/MM/DD');

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Departure date is invalid');
});

test('it should throw an error when the departure date is a past date', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().subtract(1, 'day').format(constants.DATETIME_DATE_FORMAT);

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Departure date is invalid');
});

test('it should throw an error when the return date is invalid', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().format('YYYY/MM/DD');

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Return date is invalid');
});

test('it should throw an error when the return date is before departure date', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().subtract(1, 'day').format(constants.DATETIME_DATE_FORMAT);

  const error = t.throws(() => {
    fn(options);
  }, TypeError);

  t.is(error.message, 'Return date is invalid');
});

test('it should return a validated options object', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);

  const validated = fn(options);

  t.true(isPlainObj(validated));
});

test('the options object should have certain members (with return date)', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);

  const validated = fn(options);

  t.true(Object.prototype.hasOwnProperty.call(validated, 'originAirport'));
  t.true(Object.prototype.hasOwnProperty.call(validated, 'destinationAirport'));
  t.true(Object.prototype.hasOwnProperty.call(validated, 'departureDate'));
  t.true(Object.prototype.hasOwnProperty.call(validated, 'returnDate'));
});

test('the options object should have certain members (always present)', t => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);

  const validated = fn(options);

  t.true(Object.prototype.hasOwnProperty.call(validated, 'originAirport'));
  t.true(Object.prototype.hasOwnProperty.call(validated, 'destinationAirport'));
  t.true(Object.prototype.hasOwnProperty.call(validated, 'departureDate'));
});
