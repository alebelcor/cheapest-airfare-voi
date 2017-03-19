'use strict';

import test from 'ava';
import fn from '../lib/get-sorted-legs-by-lowest-fare';

const legs = [{
  fares: [{
    total: 1000
  }, {
    total: 2000
  }]
}, {
  fares: [{
    total: 500
  }, {
    total: 1500
  }]
}];
let sortedLegs;

test.beforeEach(() => {
  sortedLegs = fn(legs);
});

test('it should return an array', t => {
  t.true(Array.isArray(sortedLegs));
});

test('it should return a sorted array', t => {
  t.is(sortedLegs[0].fares[0].total, 500);
  t.is(sortedLegs[1].fares[0].total, 1000);
});
