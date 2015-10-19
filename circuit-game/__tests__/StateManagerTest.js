jest.dontMock('../StateManager')
  .dontMock('../GateLogic');

describe('StateManager::computeState with first mock game', function() {

  var StateManager, MockGames, GateType;

  beforeEach(function() {
    StateManager = require('../StateManager');
    MockGames = require('./MockGames');
    GateType = require('../GateType');
  });

  it('does not change input scene', function() {
    var scene = JSON.parse(JSON.stringify(MockGames[0].scene));
    StateManager.computeState(scene, MockGames[0].initialGateTypes);
    expect(scene).toEqual(MockGames[0].scene);
  });

  it('does not change input gateTypes', function() {
    var inputGateTypes = JSON.parse(JSON.stringify(MockGames[0].initialGateTypes));
    StateManager.computeState(MockGames[0], inputGateTypes);
    expect(inputGateTypes).toEqual(MockGames[0].initialGateTypes);
  });

  it('returns the input gateTypes', function() {
    var state = StateManager.computeState(MockGames[0], MockGames[0].initialGateTypes);
    expect(state.gateTypes).toEqual(MockGames[0].initialGateTypes);
  });

  it('computes correct initial state', function() {
    var state = StateManager.computeState(MockGames[0].scene, MockGames[0].initialGateTypes);
    expect(state).toEqual(MockGames[0].expectedInitialState);
  });

  it('computes correct final state', function() {
    var state = StateManager.computeState(MockGames[0].scene, {2: GateType.AND});
    expect(state).toEqual(MockGames[0].expectedStateWithAndGate);
  });
});
