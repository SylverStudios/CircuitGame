var Controller = require('./Controller');
var Visualizer = require('./Visualizer');

var CircuitGame = function(containerId, width, height) {
  var controller = new Controller();
  var visualizer = new Visualizer(containerId, width, height);

  this.init = function() {
    controller.init();
    visualizer.init();

    var board = controller.createBoard();
    visualizer.update(board);
  };
}

module.exports = CircuitGame;
