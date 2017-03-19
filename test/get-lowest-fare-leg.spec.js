'use strict';

import test from 'ava';
import fn from '../lib/get-lowest-fare-leg';

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
let cheapeastLeg;

test.beforeEach(() => {
  cheapeastLeg = fn(legs);
});

test('it should return the cheapest leg', t => {
  t.is(cheapeastLeg.fares[0].total, 500);
});
