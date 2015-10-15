var _ = require('underscore');
var pen = require('./CanvasUtility');

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

    var left = canvas.offsetLeft;
    var right = canvas.offsetTop;

    var testFunction = function() {
      var node = {
        id : 1,
        ins : [2, 3, 4]
      }

      var arrayOfNodes = [];
      arrayOfNodes.push({
        id: 2
      });
      arrayOfNodes.push({
        id: 3
      });
      arrayOfNodes.push({
        id: 5
      });

      for (var i = 0; i < node.ins.length; i++) {
        console.log("node Ids @ "+i+": "+ node.ins[i]);
      }

      console.log("inputNodesInArray should be false now: "+inputNodesInArray(arrayOfNodes, node));
      console.log("\n");

      arrayOfNodes.push({
        id: 4
      });

      console.log("inputNodesInArray should be true now: "+inputNodesInArray(arrayOfNodes, node));
      console.log("\n");
    }


    //___________________UTILITY FXNS____________________________

    // LOCATION SERVICE

    // 1)
    // location of each node is based on
    // X = layerNumber / layerTotal
    // Y = avgY(all inputs)
    // need to build an [] of []s 
    var determineNodeLocation = function(canvas, controller) {
      var inputs = controller.getInputNodes();
      var outputs = controller.getOutputNodes();

      var solvedNodes = controller.getInputNodes();
      var unsolvedNodes = controller.getGates();
    }

    var inputNodesInArray = function(arrayOfNodes, node) {
      for (var i = 0; i < node.ins.length; i++) {
        _id = node.ins[i];
        if (!idInNodeArray(arrayOfNodes, _id)) return false;
      }

      return true;
    }

    var idInNodeArray = function(arrayOfNodes, id) {
      if (!_.find(arrayOfNodes, function(node) {
        return node.id == id;
      })) { 
        return false 
      };
      
      return true;
    }

    var determineInputLocations = function(canvas, numberOfInputs) {
      var yAxisInterval = canvas.height/numberOfInputs;
      var xAxisInterval = canvas.width/numberOfLayers;
    }

    pen.canvasTest(context);
    testFunction();
  }
}

module.exports = Visualizer;
