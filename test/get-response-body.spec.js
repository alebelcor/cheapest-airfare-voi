'use strict';

import test from 'ava';
import fn from '../lib/get-response-body';

test('it should return the response body', t => {
  t.deepEqual({foo: 'bar'}, fn({body: {foo: 'bar'}}));
});
