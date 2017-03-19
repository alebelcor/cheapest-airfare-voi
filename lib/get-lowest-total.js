'use strict';

const getLowestFareLeg = require('./get-lowest-fare-leg');
const getLowestFare = require('./get-lowest-fare');

module.exports = data => {
  const outboundLegs = data.outbound;
  const inboundLegs = data.inbound;
  const chepeastOutboundFare = getLowestFare(getLowestFareLeg(outboundLegs));

  if (!Array.isArray(inboundLegs) || inboundLegs.length === 0) {
    return chepeastOutboundFare;
  }

  return chepeastOutboundFare + getLowestFare(getLowestFareLeg(inboundLegs));
};
