/**
 * Mocks out Visualizer functionality.
 */

var VisualizerMocker = {
  doMock: function() {
    var setScene = jest.genMockFunction();
    var update = jest.genMockFunction();
    var constructor = jest.genMockFunction().mockImplementation(function() {
      this.setScene = setScene;
      this.update = update;
    });
    jest.setMock('../../Visualizer', constructor);
    return {
      constructor: constructor,
      setScene: setScene,
      update: update
    }
  }
};

module.exports = VisualizerMocker;
