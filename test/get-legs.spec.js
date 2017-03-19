'use strict';

import test from 'ava';
import isPlainObj from 'is-plain-obj';
import fn from '../lib/get-legs';

import fixtures from './fixtures';

const rawLegs = fixtures.volarisAvailability.trips[0];
let legs;
let leg;

test.beforeEach(() => {
  legs = fn(rawLegs);
  leg = legs[0];
});

test('it should return an array', t => {
  t.true(Array.isArray(legs));
  t.true(Array.isArray(fn()));
  t.true(Array.isArray(fn(null)));
});

test('leg should be an object', t => {
  t.true(isPlainObj(leg));
});

test('legs should have certain members', t => {
  t.true(Object.prototype.hasOwnProperty.call(leg, 'fares'));
});
