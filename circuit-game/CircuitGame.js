var Visualizer = require('./Visualizer');
var StateManager = require('./StateManager');
var SceneGenerator = require('./SceneGenerator');

var CircuitGame = function(containerId, width, height) {
  var self = this;

  this.startNewGame = function() {
    self.scene = SceneGenerator.generate();
    var initialGateTypes = StateManager.genInitialGateTypes(self.scene);
    self.state = StateManager.computeState(self.scene, initialGateTypes);
    self.visualizer.setScene(self.scene, self.state);
  };

  this.changeGateType = function(gateIndex, gateType) {
    var gateTypes = self.state.gateTypes;
    gateTypes[gateIndex] = gateType;
    self.state = StateManager.computeState(self.scene, gateTypes);
    self.visualizer.update(self.state);
  };

  this.visualizer = new Visualizer(containerId, width, height, this.changeGateType);
  this.startNewGame();
};

module.exports = CircuitGame;
