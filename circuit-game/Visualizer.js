var _ = require('underscore');
var pen = require('./CanvasUtility');

var Visualizer = function(containerId, width, height) {
  var canvas;

  this.init = function(id, width, height) {
    var container = document.getElementById(containerId);
    if (!container) {
      throw 'Cannot find container with id ' + containerId;
    }

    // create canvas
    canvas = document.createElement(id);
    canvas.height = height;
    canvas.width = width;
    canvas.style.background = 'white';
    container.appendChild(canvas);
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
      {id: 3, ins: [], outs: [6]},
      {id: 4, ins: [0, 1], outs: [5]},
      {id: 5, ins: [2, 4], outs: [6, 7]},
      {id: 6, ins: [3, 5], outs: [8]},
      {id: 7, ins: [5], outs: []},
      {id: 8, ins: [6], outs: []}
      ];

      var map = mapByID(nodes);

      solveInputLayer(map, canvas);

      _.each(board.getOutputNodes(), function(node) {
        solveNode(node, map);
      });

      updateXLocationOfNodes(map, canvas);
      updateOutputNodes(board.getOutputNodes(), map);

      console.log(printer.getMapLocations(map));
      console.log(map[5]);

      pen.drawMapOfNodes(canvas, map);
    }


    //___________________UTILITY FXNS____________________________
    var solveInputLayer = function(nodeMap, canvas) {
      // O(nodes in Map)
      var inputNodes = [];
      
      _.each(nodeMap, function(node) {
        if (node.ins.length === 0) {
          inputNodes.push(node);
        }
      });

      var yInterval = canvas.height/(inputNodes.length+1);

      for(var i = 0; i < inputNodes.length; i++) {
        var node = inputNodes[i];
        node.layer = 1;
        node.metaScore = 1;
        node.y = yInterval*i;
        nodeMap[node.id] = node;
      }
    }

    var updateOutputNodes = function(outputNodes, nodeMap) {
      var xPosition = 0;
      _.each(outputNodes, function(node) {
        xPosition = (node.x > xPosition) ? node.x : xPosition;
      });

      var yInterval = canvas.height/(outputNodes.length+1);

      for (var i = 0; i < outputNodes.length; i++) {
        outputNodes[i].x = xPosition;
        outputNodes[i].y = yInterval*i;
        nodeMap[outputNodes[i].id] = outputNodes[i];
      }
    }

    var updateXLocationOfNodes = function(nodeMap, canvas) {
      // O(nodes in Map)
      var xInterval = canvas.width/(getHighestLayer(nodeMap)+2);
      //xInterval += canvas.offsetLeft;

      _.each(nodeMap, function(node) {
        node.x = node.layer*xInterval;
        nodeMap[node.id] = node;
      });
    }

    var getHighestLayer = function(nodeMap) {
      // O(nodes in Map)
      var highestLayer = 0;
      _.each(nodeMap, function(inputNode) {
        highestLayer = (inputNode.layer > highestLayer) ? inputNode.layer : highestLayer;
      });
      return highestLayer;
    }

    var solveNode = function(node, nodeMap) {
      var currentNode = node;
      var text = "SolveNode: "+currentNode.id;

      // base cases - input or already solved
      if (node.layer != undefined) {
        console.log(text+" - node already solved with layer: "+currentNode.layer);
        return currentNode;
      }

      // Find inputs to this node.
      _.each(currentNode.ins, function(nodeID) {
        var inputNode = solveNode(nodeMap[nodeID], nodeMap);

        currentNode.y = (currentNode.y) ? currentNode.y + (inputNode.y/2) : inputNode.y/2;

        currentNode.layer = (currentNode.layer) ? currentNode.layer : 0;
        currentNode.layer = (inputNode.layer > currentNode.layer) ? inputNode.layer : currentNode.layer;

        currentNode.metaScore  = (currentNode.metaScore) ? (currentNode.metaScore + inputNode.metaScore) : inputNode.metaScore;
      });

      currentNode.metaScore++;
      currentNode.layer++;

      nodeMap[currentNode.id] = currentNode;
      console.log(text+" - solved with layer: "+currentNode.layer);
      return currentNode;
    }

    var getNodesByID = function(map, nodeIDs) {
      var nodeInputs = [];
      _.each(nodeIDs, function(nodeID) {
        var node = map[nodeID];
        if (node) {
          nodeInputs.push(node);
        }
      });
      return nodeInputs;
    }

    var mapByID = function(nodeArray) {
      var nodeMap = {};
      _.each(nodeArray, function(node) {
        nodeMap[node.id] = node;
      })
      return nodeMap;
    }

    //___________________________________________________________________PRINT
    var printer = {
      getArrayIDs : function(array) {
        var text = "Array contains [";
        _.each(array, function(element) {
          text = text+" Element ID: "+element.id;
        })
        return text+"]";
      },

      getArrayLocations : function(array) {
        var text = "Array contains [";
        _.each(array, function(element) {
          text = text+" Element ID: "+element.id+" X: "+element.x+" Y: "+element.y;
        });
        return text+"]";
      },

      printLayerArrayIDs : function(layerArray) {
        var text = "\nLayer Array contents -> ";
        _.each(layerArray, function(array) {
          text += "\n";
          text += printer.getArrayIDs(array);
        });
        text += "Layer Array ends here. \n\n";
        return text;
      },

      printLayerArrayLocations : function(layerArray) {
        var text = "\nLayer Array contents -> ";
        _.each(layerArray, function(array) {
          text += "\n";
          text += printer.getArrayLocations(array);
        });
        text += "Layer Array ends here. \n\n";
        return text;
      },

      getMapIDs : function(map) {
        var text = "\n";
        _.each(map, function(value, key) {
          text += "Map ID: "+key+" and node ins is : "+value.ins+"\n";
        });
        return text;
      },

      getMapLocations : function(map) {
        var text = "";
        _.each(map, function(value, key) {
          text += "\nMap ID: "+key+" and X: "+value.x+" Y: "+value.y;
        });
        return text;
      }
    };

    testFunction();

  }
}

module.exports = Visualizer;
