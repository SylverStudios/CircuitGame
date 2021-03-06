/**
 * App-wide integration tests to simulate playing entire games.
 * From perspective of Visualizer.
 */

jest.autoMockOff();

var VisualizerMocker = require('./util/VisualizerMocker');

jest.mock('../SceneGenerator');

describe('CircuitGame playthrough', function() {

  var CircuitGame, GateType, MockGames, StateManager, SceneGenerator, visualizerMock;

  beforeEach(function() {
    visualizerMock = VisualizerMocker.doMock();
    CircuitGame = require('../CircuitGame');
    GateType = require('../GateType');
    MockGames = require('./util/MockGames');
    StateManager = require('../StateManager');
    SceneGenerator = require('../SceneGenerator');
  });

  it('--- first premade game', function() {
    var mockGame = MockGames[0];
    var game = new CircuitGame();
    game.startNewGame(0);
    expect(visualizerMock.setScene).toBeCalledWith(mockGame.scene, mockGame.expectedInitialState);
    game.changeGateType(2, GateType.AND);
    expect(visualizerMock.update).toBeCalledWith(mockGame.expectedStateWithAndGate);
  });

  it('--- second premade game', function() {
    var mockGame = MockGames[1];
    var game = new CircuitGame();
    game.startNewGame(1);
    expect(visualizerMock.setScene).toBeCalledWith(mockGame.scene, mockGame.expectedInitialState);
    game.changeGateType(3, GateType.XOR);
    expect(visualizerMock.update).toBeCalledWith(mockGame.expectedStateWithGatesXORandXNOR);
    visualizerMock.update.mockClear();
    game.changeGateType(4, GateType.NAND);
    expect(visualizerMock.update).toBeCalledWith(mockGame.expectedFinalState);
  });

  it('--- third premade game', function() {
    var mockGame = MockGames[2];
    var game = new CircuitGame();
    game.startNewGame(2);
    expect(visualizerMock.setScene).toBeCalledWith(mockGame.scene, mockGame.expectedInitialState);
    game.changeGateType(3, GateType.NOR);
    expect(visualizerMock.update).toBeCalledWith(mockGame.expectedStateWithGatesNORandNAND);
    visualizerMock.update.mockClear();
    game.changeGateType(4, GateType.AND);
    expect(visualizerMock.update).toBeCalledWith(mockGame.expectedFinalState);
  });
});
