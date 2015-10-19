jest.autoMockOff();

jest.mock('../SceneGenerator');

describe('CircuitGame playthrough', function() {

  var CircuitGame, GateType, MockGames, VisualizerMock, visualizerSetSceneFunc,
    visualizerUpdateFunc, StateManager, SceneGenerator;

  beforeEach(function() {
    visualizerSetSceneFunc = jest.genMockFunction();
    visualizerUpdateFunc = jest.genMockFunction();
    VisualizerMock = jest.genMockFunction().mockImplementation(function() {
      this.init = jest.genMockFunction();
      this.setScene = visualizerSetSceneFunc;
      this.update = visualizerUpdateFunc;
    });
    jest.setMock('../Visualizer', VisualizerMock);

    CircuitGame = require('../CircuitGame');
    GateType = require('../GateType');
    MockGames = require('./MockGames');
    StateManager = require('../StateManager');
    SceneGenerator = require('../SceneGenerator');
  });
  it('can handle a simple game', function() {
    var mockGame = MockGames[0];
    StateManager.genInitialGateTypes = jest.genMockFunction().mockImplementation(function() {
      return mockGame.initialGateTypes;
    });
    SceneGenerator.generate = jest.genMockFunction().mockImplementation(function() {
      return mockGame.scene;
    });

    var game = new CircuitGame();
    expect(VisualizerMock).toBeCalled();
    expect(visualizerSetSceneFunc).toBeCalledWith(mockGame.scene, mockGame.expectedInitialState);
    game.changeGateType(2, GateType.AND);
    expect(visualizerUpdateFunc).toBeCalledWith(mockGame.expectedStateWithAndGate);
  });
});
