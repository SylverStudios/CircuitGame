var GameController = require('./GameController');

var CircuitGame = function(containerId, width, height) {
  var containerId = containerId,
      width = width,
      height = height;
  var canvas;

  this.init = function() {
    var container = document.getElementById(containerId);
    if (!container) {
      throw 'Cannot find container with id ' + containerId;
    }

    // create canvas
    canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    container.appendChild(canvas);
  };
}

module.exports = CircuitGame;
