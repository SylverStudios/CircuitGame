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

      var layerArray = turnNodeArrayIntoLayerArray(board);

      // determineNodePositions(layerArray);
      // printLayerArrayNodeLocations(layerArray);

      // drawLayerArray(layerArray, nodes);

      var map = mapByID(nodes);

      solveInputLayer(map, canvas);

      _.each(board.getOutputNodes(), function(node) {
        solveNode(node, map);
      });

      updateXLocationOfNodes(map, canvas);
      updateOutputNodes(board.getOutputNodes(), map);

      console.log(printer.getMapLocations(map));
      console.log(map[5]);

      drawFromMap(map);

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

      printer.printLayerArrayIDs(layerArray);
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
          pen.placeNodeOnCanvas(canvas, node);
          var currentNode = node;

          currentNode.outs.forEach(function(nodeID) {
            // Problem area
            var outNode = findNodeInLayerArray(layerArray, nodeID);
            if (outNode) {
              pen.connectNodesOnCanvas(canvas, currentNode, outNode);
            }
          });
        });
      });
    }

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
      // O(nodes in Map)
      var currentNode = node;
      var text = "SolveNode: "+currentNode.id;

      // base cases - input or already solved
      if (node.layer != undefined) {
        console.log(text+" - node already solved with layer: "+currentNode.layer);
        return currentNode;
      }

      // Find inputs to this node.
      var nodeInputs = [];
      _.each(currentNode.ins, function(nodeID) {
        var inputNode = solveNode(nodeMap[nodeID], nodeMap);
        nodeInputs.push(inputNode);
      });

      // New Y should be between the Y of the two inputs
      var y = 0;
      console.log(nodeInputs);

      _.each(nodeInputs, function(inputNode) {
        y += inputNode.y;

        currentNode.layer = (currentNode.layer) ? currentNode.layer : 0;
        currentNode.layer = (inputNode.layer > currentNode.layer) ? inputNode.layer : currentNode.layer;

        currentNode.metaScore  = (currentNode.metaScore) ? (currentNode.metaScore + inputNode.metaScore) : inputNode.metaScore;
      });

      currentNode.y = y/2;
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

    var drawFromMap = function(nodeMap) {
      _.each(nodeMap, function(node) {
        var firstNode = node;
        pen.placeNodeOnCanvas(canvas, node);

        _.each(node.outs, function(outID) {
          var secondNode = nodeMap[outID];
          pen.connectNodesOnCanvas(canvas, firstNode, secondNode);
        });

      }); 
    }

    // for all nodes
    // layer = node.ins.largestLayer + 1;
    // x = layer * xInterval;
    // y = 

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
