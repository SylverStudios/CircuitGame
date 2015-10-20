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
  it('can handle first premade game', function() {
    var mockGame = MockGames[0];
    var game = new CircuitGame();
    expect(VisualizerMock).toBeCalled();
    game.startNewGame(0);
    expect(visualizerSetSceneFunc).toBeCalledWith(mockGame.scene, mockGame.expectedInitialState);
    game.changeGateType(2, GateType.AND);
    expect(visualizerUpdateFunc).toBeCalledWith(mockGame.expectedStateWithAndGate);
  });
});
