jest.dontMock('../GateLogic');

describe('GateLogic type checking', function() {

  var GateLogic, _;

  beforeEach(function() {
    GateLogic = require('../GateLogic');
    _ = require('underscore');
  });

  it('throws on bad boolean array input', function() {
    var invalidBooleanArrays = [
      {}, true, false, null, undefined, 0, 1, '', 'aString',
      [], [true], [false],
      [{}, true, false], [[], true], [0, true]
    ];

    _.each(invalidBooleanArrays, function(invalidBooleanArray) {
      expect(_.partial(GateLogic, invalidBooleanArray)).toThrow();
    });
  });

  it('throws on bad gate type input', function() {
    var invalidGateTypes = [{}, true, false, null, undefined, -1, '', 'aString'];

    _.each(invalidGateTypes, function(invalidGateType) {
      expect(_.partial(GateLogic, [true, false, false], invalidGateType)).toThrow();
    });
  });
});

describe('GateLogic with 2 inputs', function() {

  var GateLogic, _, GateType;

  beforeEach(function() {
    GateLogic = require('../GateLogic');
    _ = require('underscore');
    GateType = require('../GateType');
  });

  it('performs "and" logic', function() {
    testWithGateTypeAndExpecteds(GateType.AND, [false, false, false, true]);
  });

  it('performs "or" logic', function() {
    testWithGateTypeAndExpecteds(GateType.OR, [false, true, true, true]);
  });

  it('performs "nand" logic', function() {
    testWithGateTypeAndExpecteds(GateType.NAND, [true, true, true, false]);
  });

  it('performs "nor" logic', function() {
    testWithGateTypeAndExpecteds(GateType.NOR, [true, false, false, false]);
  });

  it('performs "xor" logic', function() {
    testWithGateTypeAndExpecteds(GateType.XOR, [false, true, true, false]);
  });

  it('performs "xnor" logic', function() {
    testWithGateTypeAndExpecteds(GateType.XNOR, [true, false, false, true]);
  });

  function testWithGateTypeAndExpecteds(gateType, expecteds) {
    var tests = [
      {booleans: [false, false], expected: expecteds[0]},
      {booleans: [false, true], expected: expecteds[1]},
      {booleans: [true, false], expected: expecteds[2]},
      {booleans: [true, true], expected: expecteds[3]}
    ];
    _.each(tests, function(test) {
      expect(GateLogic(test.booleans, gateType)).toEqual(test.expected);
    });
  }

});

describe('GateLogic with 3 inputs', function() {

  var GateLogic, _, GateType;

  beforeEach(function() {
    GateLogic = require('../GateLogic');
    _ = require('underscore');
    GateType = require('../GateType');
  });

  it('performs "and" logic', function() {
    testWithGateTypeAndExpecteds(GateType.AND, [false, false, false, false, false, false, false, true]);
  });

  it('performs "or" logic', function() {
    testWithGateTypeAndExpecteds(GateType.OR, [false, true, true, true, true, true, true, true]);
  });

  it('performs "nand" logic', function() {
    testWithGateTypeAndExpecteds(GateType.NAND, [true, true, true, true, true, true, true, false]);
  });

  it('performs "nor" logic', function() {
    testWithGateTypeAndExpecteds(GateType.NOR, [true, false, false, false, false, false, false, false]);
  });

  it('performs "xor" logic', function() {
    testWithGateTypeAndExpecteds(GateType.XOR, [false, true, true, false, true, false, false, false]);
  });

  it('performs "xnor" logic', function() {
    testWithGateTypeAndExpecteds(GateType.XNOR, [true, false, false, true, false, true, true, true]);
  });

  function testWithGateTypeAndExpecteds(gateType, expecteds) {
    var tests = [
      {booleans: [false, false, false], expected: expecteds[0]},
      {booleans: [false, false, true], expected: expecteds[1]},
      {booleans: [false, true, false], expected: expecteds[2]},
      {booleans: [false, true, true], expected: expecteds[3]},
      {booleans: [true, false, false], expected: expecteds[4]},
      {booleans: [true, false, true], expected: expecteds[5]},
      {booleans: [true, true, false], expected: expecteds[6]},
      {booleans: [true, true, true], expected: expecteds[7]}
    ];
    _.each(tests, function(test) {
      expect(GateLogic(test.booleans, gateType)).toEqual(test.expected);
    });
  }
});



