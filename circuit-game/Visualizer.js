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
    canvas.style.background = 'white';
    container.appendChild(canvas);
    context = canvas.getContext('2d');
  };

  this.buildGameBoard = function(board) {
    console.log("Does nothing right now.");
  };

  this.update = function(board) {

    var testFunction = function() {

      var nodes = [
      {id: 0, ins: [], outs: [4]},
      {id: 1, ins: [], outs: [4]},
      {id: 2, ins: [], outs: [5]},
      {id: 7, ins: [5], outs: []},
      {id: 3, ins: [], outs: [6]},
      {id: 4, ins: [0, 1], outs: [5]},
      {id: 5, ins: [2, 4], outs: [6, 7]},
      {id: 6, ins: [3, 5], outs: [8]},
      {id: 8, ins: [6], outs: []}
    ];

      var layerArray = turnNodeArrayIntoLayerArray(board);

      determineNodePositions(layerArray);
      printLayerArrayNodeLocations(layerArray);

      drawLayerArray(layerArray, nodes);
    }


    //___________________UTILITY FXNS____________________________

    // LOCATION SERVICE
    var turnNodeArrayIntoLayerArray = function(board) {
      layerArray = [];
      var loopKiller = 0;

      var solved = board.getInputNodes();
      var unsolved = board.getGates().concat(board.getOutputNodes());

      layerArray.push(solved);

      while (unsolved.length) {
        loopKiller++;
        var currentLayer = getNextLayer(solved, unsolved);
        unsolved = removeNodesFromArrayById(unsolved, currentLayer);
        solved = solved.concat(currentLayer);

        layerArray.push(currentLayer);
        console.log("num iterations: "+loopKiller);

        if (loopKiller > 50) {
          console.log("unsolvedArray.length = "+unsolved.length);
          break;
          return;
          unsolved.length = false;
        }

      }

      printLayerArray(layerArray);
      return layerArray;
    }

    var determineNodePositions = function(layerArray) {
      var xIntervals = canvas.width/(layerArray.length+1);
      
      for (var i=0; i<layerArray.length; i++) {
        var currentArray = layerArray[i];
        
        for( var j=0; j<currentArray.length; j++) {
          currentArray[j].x = xIntervals*(i+1);
          currentArray[j].y = canvas.height/(currentArray.length+1)*(j+1);
        }

      }
    }

    var drawLayerArray = function(layerArray) {
      layerArray.forEach(function(nodeArray) {
        var currentArray = nodeArray;

        currentArray.forEach(function(node) {
          pen.placeNodeOnCanvas(context, node);
          var currentNode = node;

          currentNode.outs.forEach(function(nodeID) {
            // Problem area
            var outNode = findNodeInLayerArray(layerArray, nodeID);
            if (outNode) {
              pen.connectNodesOnCanvas(context, currentNode, outNode);
            }
          });
        });
      });
    }

    var getNextLayer = function(solvedNodes, unsolvedNodes) {
      // Return an array of the next layer.
      return _.filter(unsolvedNodes, function(element) {
        return inputNodesInArray(solvedNodes, element);
      });

    }

    //________________________________________________________________________OBJECT UTILITIES
    var removeNodesFromArrayById = function(arrayToModify, elementsToRemove) {
      elementsToRemove.forEach(function(element) {
        var index = indexOfObjectById(arrayToModify, element);
        arrayToModify.splice(index, 1);
      });

      return arrayToModify;
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
        return false;
      };
      
      return true;
    }

    var indexOfObjectById = function(array, nodeID) {
      for (var i=0; i<array.length; i++) {
        if(array[i].id == nodeID) {
          return i;
        }
      }
    }

    var findObjectById = function(array, nodeID) {
      for (var i=0; i<array.length; i++) {
        if(array[i].id == nodeID) {
          return array[i];
        }
      }
    }

    var findNodeInLayerArray = function(layerArray, nodeID) {
      console.log("findNodeInLayerArray with nodeID: "+nodeID);
      for(var i=0; i<layerArray.length;i++) {
        var foundNode = findObjectById(layerArray[i], nodeID);
        if (foundNode) {
          console.log("Search for node with ID: "+foundNode.id+" and found one with X: "+foundNode.x);
          return foundNode;
        }
      }
    }

    //___________________________________________________________________PRINT
    var printLayer = function(arrayOfNodes) {
      var text = "Array contains [";
      arrayOfNodes.forEach(function(element) {
        text = text+" Element ID: "+element.id;
      })
      console.log(text+"]");
    }

    var printLayerNodeLocations = function(arrayOfNodes) {
      var text = "Array contains [";
      arrayOfNodes.forEach(function(element) {
        text = text+" Element ID: "+element.id+" X: "+element.x+" Y: "+element.y;
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

    var printLayerArrayNodeLocations = function(layerArray) {
      console.log("LayerArray contains : ");
      for(var i=0; i<layerArray.length;i++) {
        console.log("Layer #"+i);
        printLayerNodeLocations(layerArray[i]);
      }
    }

    testFunction();
  }
}

module.exports = Visualizer;
