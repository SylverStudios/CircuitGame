jest.dontMock('../StateManager')
  .dontMock('../GateLogic');

describe('StateManager::computeState with first mock game', function() {

  var StateManager, MockGames, GateType;

  beforeEach(function() {
    StateManager = require('../StateManager');
    MockGames = require('./util/MockGames');
    GateType = require('../GateType');
  });

  it('does not change input scene', function() {
    var scene = JSON.parse(JSON.stringify(MockGames[0].scene));
    StateManager.computeState(scene);
    expect(scene).toEqual(MockGames[0].scene);
  });

  it('computes correct initial state', function() {
    var state = StateManager.computeState(MockGames[0].scene);
    expect(state).toEqual(MockGames[0].expectedInitialState);
  });

  it('computes correct final state', function() {
    var state = StateManager.computeState(MockGames[0].scene, MockGames[0].expectedStateWithAndGate.gateTypes);
    expect(state).toEqual(MockGames[0].expectedStateWithAndGate);
  });
});
