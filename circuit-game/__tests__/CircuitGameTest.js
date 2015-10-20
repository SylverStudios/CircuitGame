jest.dontMock('../CircuitGame');

var VisualizerMocker = require('./util/VisualizerMocker');

describe('CircuitGame type checking', function() {

  var CircuitGame, _, game, SceneGenerator;

  beforeEach(function() {
    CircuitGame = require('../CircuitGame');
    _ = require('underscore');
    game = new CircuitGame();
    SceneGenerator = require('../SceneGenerator');
  });

  it('throws on bad premadeGameIndex in startNewGame', function() {
    expect(_.partial(game.startNewGame, -2)).toThrow('invalid premadeGameIndex: -2');
  });

  it('throws if there is no current scene in changeGateType', function() {
    expect(_.partial(game.changeGateType, 0, 0)).toThrow('cannot change gate type, no current scene');
  });

  it('throws on bad gateIndex in changeGateType', function() {
    game.scene = {};
    expect(_.partial(game.changeGateType, -2)).toThrow('invalid gateIndex: -2');
  });

  it('throws on bade gateType in changeGateType', function() {
    game.scene = {gateNodeIds: [0]};
    expect(_.partial(game.changeGateType, 0, -2)).toThrow('invalid gateType: -2');
  });
});

describe('CircuitGame game orchestration', function() {

  var CircuitGame, _, PremadeScenes, visualizerMock, SceneGenerator, StateManager, GateType;

  beforeEach(function() {
    visualizerMock = VisualizerMocker.doMock();
    CircuitGame = require('../CircuitGame');
    _ = require('underscore');
    PremadeScenes = require('../PremadeScenes');
    SceneGenerator = require('../SceneGenerator');
    StateManager = require('../StateManager');
    GateType = require('../GateType');
  });

  it('constructs Visualizer with correct parameters on instantiation', function() {
    var game = new CircuitGame('container-id', 123, 321);
    expect(visualizerMock.constructor).toBeCalledWith('container-id', 123, 321, _.size(PremadeScenes), game.startNewGame, game.changeGateType);
  });

  it('calls Visualizer::setScene on startNewGame with scene and state', function() {
    var game = new CircuitGame();
    var mockScene = {"i am": "a scene"};
    var mockState = {"i am": "a state"};
    SceneGenerator.generate.mockReturnValue(mockScene);
    StateManager.computeState.mockReturnValue(mockState)
    game.startNewGame();
    expect(visualizerMock.setScene).toBeCalledWith(mockScene, mockState);
  });

  it('calls Visualizer::update on changeGateType with state', function() {
    var game = new CircuitGame();
    game.scene = {gateNodeIds: [0]};
    game.state = {gateTypes: {0: GateType.OR}};
    var mockState = {"i am": "a state"};
    StateManager.computeState.mockReturnValue(mockState);
    game.changeGateType(0, GateType.AND);
    expect(visualizerMock.update).toBeCalledWith(mockState);
  });
});
