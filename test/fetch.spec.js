'use strict';

import test from 'ava';
import sinon from 'sinon';
import 'sinon-as-promised'; // eslint-disable-line import/no-unassigned-import
import got from 'got';
import moment from 'moment';
import isPlainObj from 'is-plain-obj';

import constants from '../lib/constants';
import fn from '../lib/fetch';
import fixtures from './fixtures';

const today = moment();
const options = {
  originAirport: 'MEX',
  destinationAirport: 'LAX',
  departureDate: today.add(20, 'days').format(constants.DATETIME_DATE_FORMAT),
  returnDate: today.add(25, 'days').format(constants.DATETIME_DATE_FORMAT)
};

let post;

test.before(() => {
  post = sinon.stub(got, 'get').resolves({
    body: fixtures
  });
});

test.after(() => {
  post.restore();
});

test('it should return a promise', t => {
  t.true(typeof fn(options).then === 'function');
});

test('it should return an object', async t => {
  const data = await fn(options);

  t.true(isPlainObj(data));
});
