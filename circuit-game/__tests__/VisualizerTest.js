jest.dontMock('../Visualizer');

describe('Visualizer initialization', function() {

  var Visualizer, visualizerInstance;

  beforeEach(function() {
    Visualizer = require('../Visualizer');
    visualizerInstance = new Visualizer('container-id', 321, 123);
  });

  it('adds a canvas to the document', function() {
    var dummyContainer = createDummyContainer();
    visualizerInstance.init();
    var createdCanvasArray = dummyContainer.getElementsByTagName('canvas');
    expect(createdCanvasArray.length).toBe(1); // it's an array of elements at this point, need to make sure there's one element
    var createdCanvas =  createdCanvasArray[0];
    expect(createdCanvas.width).toBe(321);
    expect(createdCanvas.height).toBe(123);
  });

  it('alerts the client if container cannot be found', function() {
    document.getElementById = jest.genMockFunction().mockReturnValueOnce(undefined);
    expect(visualizerInstance.init).toThrow();
  });
});

describe('Visualizer rendering', function() {
  it('updates number of inputs based on board', function() {
    var Visualizer = require('../Visualizer');
    var dummyContainer = createDummyContainer();
    var visualizerInstance = new Visualizer('container-id', 321, 123);
    var fakeCanvass = document.createElement('canvas');
    document.createElement = jest.genMockFunction().mockReturnValueOnce(fakeCanvass);
    var fakeContext = {fillText: jest.genMockFunction()};
    fakeCanvass.getContext = jest.genMockFunction().mockReturnValueOnce(fakeContext);
    visualizerInstance.init();
    visualizerInstance.update({numInputs: 4});
    expect(fakeContext.fillText.mock.calls[0][0]).toBe('number of inputs: 4');
  });
})

function createDummyContainer() {
  var dummyContainer = document.createElement('div');
  dummyContainer.id = 'container-id';
  document.getElementById = jest.genMockFunction().mockReturnValueOnce(dummyContainer);
  return dummyContainer;
}
