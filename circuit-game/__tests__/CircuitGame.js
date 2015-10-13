jest.autoMockOff();

describe('CircuitGame initialization', function() {

  var CircuitGame, gameInstance;

  beforeEach(function() {
    CircuitGame = require('../CircuitGame');
    gameInstance = new CircuitGame('container-id', 321, 123);
  });

  it('adds a canvas to the document', function() {
    var dummyContainer = document.createElement('div');
    dummyContainer.id = 'container-id';
    document.getElementById = jest.genMockFunction().mockReturnValueOnce(dummyContainer);
    gameInstance.init();
    var createdCanvas = dummyContainer.getElementsByTagName('canvas');
    expect(createdCanvas.length).toBe(1); // it's an array of elements at this point
    createdCanvas = createdCanvas[0];
    expect(createdCanvas.width).toBe(321);
    expect(createdCanvas.height).toBe(123);
  });

  it('alerts the client if container cannot be found', function() {
    document.getElementById = jest.genMockFunction().mockReturnValueOnce(undefined);
    expect(gameInstance.init).toThrow();
  });
});
