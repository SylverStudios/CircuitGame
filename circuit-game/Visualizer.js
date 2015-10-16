var _ = require('underscore');
var pen = require('./CanvasUtility');
var controller = require('./Controller');

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

      var nodes = [
      {id: 0, ins: [], outs: [4]},
      {id: 1, ins: [], outs: [4]},
      {id: 2, ins: [], outs: [5]},
      {id: 3, ins: [], outs: [6]},
      {id: 4, ins: [0, 1], outs: [5]},
      {id: 5, ins: [2, 4], outs: [6, 7]},
      {id: 6, ins: [3, 5], outs: [8]},
      {id: 7, ins: [5], outs: []},
      {id: 8, ins: [6], outs: []}
    ];

      turnNodeArrayIntoLayerArray(nodes);

    }


    //___________________UTILITY FXNS____________________________

    // LOCATION SERVICE

    // 1)
    // location of each node is based on
    // X = layerNumber / layerTotal
    // Y = avgY(all inputs)
    // need to build an [] of []s 
    var turnNodeArrayIntoLayerArray = function(arrayOfNodes) {
      // when controller is working
      // var inputs = controller.getInputNodes();
      // var outputs = controller.getOutputNodes();
      layerArray = [];

      var solved = _.filter(arrayOfNodes, function(node) {
        return node.ins.length === 0;
      });

      var unsolved = _.filter(arrayOfNodes, function(node) {
        return node.ins.length != 0;
      });

      layerArray.push(solved);

      while (unsolved.length) {
        var currentLayer = getNextLayer(solved, unsolved);
        unsolved = removeNodesFromArrayById(unsolved, currentLayer);
        solved = solved.concat(currentLayer);

        layerArray.push(currentLayer);
      }

      printLayerArray(layerArray);
    }

    var removeNodesFromArrayById = function(arrayToModify, elementsToRemove) {
      elementsToRemove.forEach(function(element) {
        var index = indexOfObjectById(arrayToModify, element);
        console.log("Index of element: "+element.id+" is "+index);
        arrayToModify.splice(index, 1);
      });

      return arrayToModify;
    }

    var getNextLayer = function(solvedNodes, unsolvedNodes) {
      // Return an array of the next layer.
      return _.filter(unsolvedNodes, function(element) {
        return inputNodesInArray(solvedNodes, element);
      });

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

    var indexOfObjectById = function(array, node) {
      for (var i=0; i<array.length; i++) {
        if(array[i].id == node.id) {
          return i;
        }
      }
    }

    var determineInputLocations = function(canvas, numberOfInputs) {
      var yAxisInterval = canvas.height/numberOfInputs;
      var xAxisInterval = canvas.width/numberOfLayers;
    }

    // Printing methods
    var printLayer = function(arrayOfNodes) {
      var text = "Array contains [";
      arrayOfNodes.forEach(function(element) {
        text = text+" Element ID: "+element.id;
      })
      console.log(text+"]");
    }

    var printLayerArray = function(layerArray) {
      console.log("LayerArray contains : ");
      for(var i=0; i<layerArray.length;i++) {
        console.log("Layer #"+i);
        printLayer(layerArray[i]);
      }
    }

    pen.canvasTest(context);
    testFunction();
  }
}

module.exports = Visualizer;
