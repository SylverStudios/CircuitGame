var _ = require('underscore');
var canvasUtil = require('./CanvasUtility');
var GateType = require('./GateType');

var Visualizer = function(containerId, width, height, sizeOfPremadeScenes, startGameCallback, changeGateTypeCallback) {
  var canvas, nodeMap, inputNodes, pen;

  // Somehow determine this based on height and width;
  var nodeRadius = 10;

  var sizeScenes = sizeOfPremadeScenes;
  var startFunction = startGameCallback;
  var changeFunction = changeGateTypeCallback;

  createCanvas(containerId, width, height);

  pen = new canvasUtil(canvas);


  // Create the canvas on the page and initial map computations
  this.setScene = function(scene, state) {
    nodeMap = scene.nodes;

    setValuesOnInputNodes();

    _.each(mapUtility.getOutputNodes(nodeMap), function(node) {
      solveNode(node, nodeMap);
    });

    setXLocationOfNodes();

    setValuesOnOutputNodes();

    console.log(getPropValuesFromArrayObjects(nodeMap, ["id", "x", "y"]));

    pen.drawMapOfNodes(nodeMap);
  }



  // Compares the new state to the current one and updates
  this.update = function(state) {

    //TODO
    // update map values
    // redraw

  }

// Private helper functions

  // Must be done before map is completed.
  var setValuesOnInputNodes = function() {
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
  var setValuesOnOutputNodes = function() {
    var outputNodes = mapUtility.getOutputNodes(nodeMap);
    var xPosition = 0;
    _.each(outputNodes, function(node) {
      xPosition = (node.x > xPosition) ? node.x : xPosition;
    });

    var yInterval = canvas.height/(outputNodes.length+1);

    for (var i = 0; i < outputNodes.length; i++) {
      outputNodes[i].x = xPosition;
      outputNodes[i].y = yInterval*(i+1);
      nodeMap[outputNodes[i].id] = outputNodes[i];
    }
  }

  // This must be done after solving the map, but before setting the output nodes.
  var setXLocationOfNodes = function() {
    var xInterval = canvas.width/(mapUtility.getHighestLayer(nodeMap)+2);

    _.each(nodeMap, function(node) {
      node.x = node.layer*xInterval;
      nodeMap[node.id] = node;
    });
  }

  var solveNode = function(currentNode) {
    // base cases - input or already solved
    if (node.layer != undefined) {
      console.log(text+" - node already solved with layer: "+currentNode.layer);
      return currentNode;
    }

    // Find inputs to this node.
    _.each(currentNode.ins, function(nodeID) {
      var inputNode = solveNode(nodeMap[nodeID]);

      currentNode.y = (currentNode.y) ? currentNode.y + (inputNode.y/2) : inputNode.y/2;

      currentNode.layer = (currentNode.layer) ? currentNode.layer : 0;
      currentNode.layer = (inputNode.layer > currentNode.layer) ? inputNode.layer : currentNode.layer;

      currentNode.metaScore  = (currentNode.metaScore) ? (currentNode.metaScore + inputNode.metaScore) : inputNode.metaScore;
    });

    currentNode.metaScore++;
    currentNode.layer++;

    nodeMap[currentNode.id] = currentNode;
    return currentNode;
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

    getNodeByCoord : function(nodeMap, x, y) {
      var node;
      var isWithinX;
      var isWithinY;

      _.each(nodeMap, function(currentNode) {
        
        isWithinX = (x > currentNode.x-10 && x < currentNode.x+10);
        isWithinY = (y > currentNode.y-10 && y < currentNode.y+10);
        
        if (isWithinX && isWithinY) {
          node = currentNode;
        }

      });

      return node;
    }
  };

  function createCanvas(containerId, width, height) {
    var container = document.getElementById(containerId);
    if (!container) {
      throw 'Cannot find container with id ' + containerId;
    }

    canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    canvas.style.background = 'white';
    container.appendChild(canvas);

    HTMLCanvasElement.prototype.relMouseCoords = function(event) {
      var canvasX = event.pageX - canvas.offsetLeft;
      var canvasY = event.pageY - canvas.offsetTop;

      return {x:canvasX, y:canvasY}
    };

    setCanvasOnClick();
  };

  var setCanvasOnClick = function() {

    canvas.addEventListener('click', function(event) {
      coords = canvas.relMouseCoords(event);
      console.log("Clicked at x: "+coords.x+" and y: "+coords.y);

      var clickedNode = mapUtility.getNodeByCoord(nodeMap, coords.x, coords.y);
      if (clickedNode) {
        console.log("Clicked Node : "+clickedNode.id);
        pen.drawNode(clickedNode, 'red');
      }

    }, false);
  }

  var getPropValuesFromArrayObjects = function(array, propNames) {
    var arrayContents = [];
    _.each(array, function(value, key) {
      var text = "ID: "+key+"-> ";
      text += getPropsOffObject(value, propNames);
      arrayContents.push(text);
    });
    return "[\n"+arrayContents.join("\n")+"\n]";
  };

  var getPropsOffObject = function(object, propNames) {
    var props = [];
    
    _.each(propNames, function(value) {
      props.push(value + " : " + object[value]);
    });

    return props.join();
  };

}

module.exports = Visualizer;
