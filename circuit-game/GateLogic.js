/**
 * Performs boolean logic on an array of booleans according to input GateType.
 */

var _ = require('underscore');
var GateType = require('./GateType');

function and(booleans) {
  return !_.contains(booleans, false);
}

function or(booleans) {
  return _.contains(booleans, true);
}

function xor(booleans) {
  return _.filter(booleans, function(boolean) {
    return boolean;
  }).length === 1;
}

var GateLogic = function(booleans, gateType) {

  // check boolean array
  if (!_.isArray(booleans)) {
    throw 'booleans input is not array.';
  }
  if (booleans.length === 0) {
    throw 'booleans input is empty.';
  }
  if (booleans.length === 1) {
    throw 'booleans input only has one element: ' + booleans[0];
  }

  // check boolean types
  var nonBooleans = _.filter(booleans, function(boolean) {
    return !_.isBoolean(boolean);
  });
  if (nonBooleans.length > 0) {
    throw 'non-booleans found: ' + nonBooleans.toString();
  }
  
  switch (gateType) {
    case GateType.AND:
      return and(booleans);
      break;
    case GateType.OR:
      return or(booleans);
      break;
    case GateType.NAND:
      return !and(booleans);
      break;
    case GateType.NOR:
      return !or(booleans);
      break;
    case GateType.XOR:
      return xor(booleans);
      break;
    case GateType.XNOR:
      return !xor(booleans);
        break;
    default:
      throw 'invalid gateType: ' + gateType;
  }
};

module.exports = GateLogic;
