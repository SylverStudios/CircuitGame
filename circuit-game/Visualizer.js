var _ = require('underscore');
var pen = require('./CanvasUtility');
<<<<<<< HEAD

var Visualizer = function(containerId, width, height, sizeOfPremadeScenes, startGameCallback, changeGateTypeCallback) {
  var canvas, nodeMap, inputNodes;

  var sizeScenes = sizeOfPremadeScenes;
  var startFunction = startGameCallback;
  var changeFunction = changeGateTypeCallback;

  var createCanvas = function(containerId, width, height) {
=======

var Visualizer = function(containerId, width, height) {
  var canvas;

  this.init = function(id, width, height) {
>>>>>>> e4e31239ce0914eb9302a3199d65855a7c27212d
    var container = document.getElementById(containerId);
    if (!container) {
      throw 'Cannot find container with id ' + containerId;
    }

<<<<<<< HEAD
    canvas = document.createElement("canvas");
=======
    // create canvas
    canvas = document.createElement(id);
>>>>>>> e4e31239ce0914eb9302a3199d65855a7c27212d
    canvas.height = height;
    canvas.width = width;
    canvas.style.background = 'white';
    container.appendChild(canvas);
<<<<<<< HEAD
  }

  createCanvas(containerId, width, height);

// main functions - available on export

  // Create the canvas on the page and initial map computations
  this.setScene = function(scene, state) {
    nodeMap = scene.nodes;
    setValuesOnInputNodes(nodeMap, canvas);

    _.each(mapUtility.getOutputNodes(nodeMap), function(node) {
      solveNode(node, nodeMap);
    });

    setXLocationOfNodes(nodeMap, canvas);
    setValuesOnOutputNodes(mapUtility.getOutputNodes(nodeMap), nodeMap);

    console.log(printer.printArrayContents(nodeMap));

    pen.drawMapOfNodes(canvas, nodeMap);

    setCanvasOnClick(nodeMap);
  }



  // Compares the new state to the current one and updates
  this.update = function(state) {

    //TODO

  }

  this.test = function() {
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

    var nodeMap = {
    0 : {id: 0, ins: [], outs: [4]},
    1 : {id: 1, ins: [], outs: [4]},
    2 : {id: 2, ins: [], outs: [5]},
    3 : {id: 3, ins: [], outs: [6]},
    4 : {id: 4, ins: [0, 1], outs: [5]},
    5 : {id: 5, ins: [2, 4], outs: [6, 7]},
    6 : {id: 6, ins: [3, 5], outs: [8]},
    7 : {id: 7, ins: [5], outs: []},
    8 : {id: 8, ins: [6], outs: []}
    };

    var map = mapUtility.mapByID(nodes);

    setValuesOnInputNodes(map, canvas);

    _.each(mapUtility.getOutputNodes(map), function(node) {
      solveNode(node, map);
    });

    setXLocationOfNodes(map, canvas);
    setValuesOnOutputNodes(mapUtility.getOutputNodes(map), map);

    console.log(printer.getMapLocations(map));
    console.log(map[5]);

    console.log(canvas);

    pen.drawMapOfNodes(canvas, map);
  }


// Private helper functions

  // Must be done before map is completed.
  var setValuesOnInputNodes = function(nodeMap, canvas) {
    var inputNodes = mapUtility.getInputNodes(nodeMap);

    var yInterval = canvas.height/(inputNodes.length+2);

    for(var i = 0; i < inputNodes.length; i++) {
      var node = inputNodes[i];
      node.layer = 1;
      node.metaScore = 1;
      node.y = yInterval*(i+1);
      nodeMap[node.id] = node;
    }
  }

  // Can't be done until the map has been completed.
  var setValuesOnOutputNodes = function(outputNodes, nodeMap) {
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

  // This must be done after solving the map, but before setting the output nodes.
  var setXLocationOfNodes = function(nodeMap, canvas) {
    // O(nodes in Map)
    var xInterval = canvas.width/(mapUtility.getHighestLayer(nodeMap)+2);

    _.each(nodeMap, function(node) {
      node.x = node.layer*xInterval;
      nodeMap[node.id] = node;
    });
  }

  // Recursive: Sets layer and metaScore
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

  var setCanvasOnClick = function(nodeMap) {
    var nodeRadius = 10;

    canvas.addEventListener('click', function(event) {
      var x = event.pageX + canvas.offsetLeft,
          y = event.pageY + canvas.offsetTop;

      console.log("Clicked at x: "+x+" and y: "+y);

      var clickedNode = mapUtility.getNodeByCoord(x, y);
      if (clickedNode) {
        console.log("We just clicked a node.");
      }

    }, false);
=======
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

>>>>>>> e4e31239ce0914eb9302a3199d65855a7c27212d
  }

//_____________________________________________________________________MapUtility
  var mapUtility = {
    getNodesByID : function(nodeMap, ids) {
      var nodeInputs = [];
      _.each(nodeIDs, function(nodeID) {
        var node = nodeMap[nodeID];
        if (node) {
          nodeInputs.push(node);
        }
      });
      return nodeInputs;
    },

    getInputNodes : function(nodeMap) {
      var inputNodes = [];
      
      _.each(nodeMap, function(node) {
        if (node.ins.length === 0) {
          inputNodes.push(node);
        }
      });
      return inputNodes;
    },

    getOutputNodes : function(nodeMap) {
      var outputNodes = [];
      
      _.each(nodeMap, function(node) {
        if (node.outs.length === 0) {
          outputNodes.push(node);
        }
      });
      return outputNodes;
    },

    mapByID : function(array) {
      var nodeMap = {};
      _.each(array, function(node) {
        nodeMap[node.id] = node;
      })
      return nodeMap;
    },

    getHighestLayer : function(nodeMap) {
      var highestLayer = 0;
      _.each(nodeMap, function(inputNode) {
        highestLayer = (inputNode.layer > highestLayer) ? inputNode.layer : highestLayer;
      });
      return highestLayer;
    },

    getNodeByCoord : function(x, y) {
      var node;
      var isWithinX;
      var isWithinY;

      _.each(nodeMap, function(currentNode) {
        
        isWithinX = (x > currentNode.x-10 && x < currentNode.x+10);
        isWithinY = (y > currentNode.y-10 && y < currentNode.y+10);
        
        if (isWithinX && isWithinY) {
          console.log("IsNodeWithinX ["+(node.x-10)+" < "+x+" < "+(node.x+10)+"] - "+isWithinX);
          console.log("IsNodeWithinY ["+(node.y-10)+" < "+y+" < "+(node.y+10)+"] - "+isWithinY);
          node = currentNode;
        }

      });

      return node;
    }
  };

  //___________________________________________________________________PRINTER
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
    },

    printArrayContents : function(array) {
      var text = "\n[";
      _.each(array, function(value, key) {
        text += "\nID: "+key;
        if (value.x && value.y) {
          text += " X: "+value.x+" Y: "+value.y;
        }
      });
      return text;
    }
  };
}

module.exports = Visualizer;
