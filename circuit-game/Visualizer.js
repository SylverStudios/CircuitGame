var Visualizer = function(containerId, width, height) {
  var canvas, context;

  this.init = function() {
    var container = document.getElementById(containerId);
    if (!container) {
      throw 'Cannot find container with id ' + containerId;
    }

    // create canvas
    canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    canvas.style.background = 'white';
    container.appendChild(canvas);
    context = canvas.getContext('2d');
  };

  this.update = function(board) {
    context.font = '20px Georgia';
    context.fillText('number of inputs: ' + board.numInputs, 10, 50);
  }
}

module.exports = Visualizer;
