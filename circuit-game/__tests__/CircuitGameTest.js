jest.dontMock('../CircuitGame');

var controllerMockInit = jest.genMockFunction();
var controllerMockCreateBoard = jest.genMockFunction();
var controllerMock = jest.genMockFunction().mockImplementation(function() {
  this.init = controllerMockInit;
  this.createBoard = jest.genMockFunction();
});
jest.setMock('../Controller', controllerMock);

var visualizerMockInit = jest.genMockFunction();
var visualizerMockUpdate = jest.genMockFunction();
var visualizerMock = jest.genMockFunction().mockImplementation(function() {
  this.init = visualizerMockInit;
  this.update = jest.genMockFunction();
});
jest.setMock('../Visualizer', visualizerMock);

describe('CircuitGame initialization', function() {
  it('initializes Controller and Visualizer', function() {
    var CircuitGame = require('../CircuitGame');
    gameInstance = new CircuitGame('container-id', 321, 123);
    expect(controllerMock).toBeCalled();
    expect(visualizerMock).toBeCalledWith('container-id', 321, 123);
    gameInstance.init();
    expect(controllerMockInit).toBeCalled();
    expect(visualizerMockInit).toBeCalled();
  });
});
