'use strict';

module.exports = rawLeg => {
  const adultFare = rawLeg.fares[0].passengerFares.find(item => {
    return item.passengerType === 'ADT';
  });

  return [{
    total: adultFare.fareAmount
  }];
};
