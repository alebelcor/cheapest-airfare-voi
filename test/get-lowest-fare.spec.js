'use strict';

import test from 'ava';
import fn from '../lib/get-lowest-fare';

const leg = {
  fares: [{
    total: 1000
  }, {
    total: 2000
  }]
};
let lowestFare;

test.beforeEach(() => {
  lowestFare = fn(leg);
});

test('it should return the lowest fare', t => {
  t.is(lowestFare, 1000);
});
