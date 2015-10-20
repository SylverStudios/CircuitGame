/**
 * Entry point for circuit game app.
 */

var _ = require('underscore');

var Visualizer = require('./Visualizer');
var StateManager = require('./StateManager');
var SceneGenerator = require('./SceneGenerator');
var PremadeScenes = require('./PremadeScenes');
var GateType = require('./GateType');

var CircuitGame = function(containerId, width, height) {
  var self = this;

  this.startNewGame = function(premadeGameIndex) {
    if (premadeGameIndex === undefined) {
      self.scene = SceneGenerator.generate();
    } else if (_.contains(_.keys(PremadeScenes), '' + premadeGameIndex)){
      self.scene = PremadeScenes[premadeGameIndex];
    } else {
      throw 'invalid premadeGameIndex: ' + premadeGameIndex;
    }
    self.state = StateManager.computeState(self.scene);
    self.visualizer.setScene(self.scene, self.state);
  };

  this.changeGateType = function(gateIndex, gateType) {
    if (!_.contains(self.scene.gateNodeIds, gateIndex)) {
      throw 'invalid gateIndex: ' + gateIndex;
    }
    if (!_.contains(GateType, gateType)) {
      throw 'invalid gateType: ' + gateType;
    }
    var gateTypes = self.state.gateTypes;
    gateTypes[gateIndex] = gateType;
    self.state = StateManager.computeState(self.scene, gateTypes);
    self.visualizer.update(self.state);
  };

  this.visualizer = new Visualizer(containerId, width, height, _.size(PremadeScenes), this.startNewGame, this.changeGateType);
};

module.exports = CircuitGame;
