var _ = require('underscore');
var canvasUtil = require('./CanvasUtility');
var GateType = require('./GateType');

var Visualizer = function(containerId, width, height, sizeOfPremadeScenes, startGameCallback, changeGateTypeCallback) {
  var canvas, nodeMap, inputNodes, pen, initialScene, ImprovedGateType, currentState, currentObjective;

  var sizeScenes = sizeOfPremadeScenes;
  var startFunction = startGameCallback;
  var changeFunction = changeGateTypeCallback;

  createCanvas(containerId, width, height);

  pen = new canvasUtil(canvas);

// This is a fuckin mess...solve it another way
// TODO
  ImprovedGateType = {
    AND: {id: 1,
          name: 'GATETYPE_AND'},
    OR: {id: 2,
          name: 'GATETYPE_OR'},
    NAND: {id: 3,
          name: 'GATETYPE_NAND'},
    NOR: {id : 4,
          name: 'GATETYPE_NOR'},
    XOR: {id: 5,
          name: 'GATETYPE_XOR'},
    XNOR: {id: 6,
          name: 'GATETYPE_XNOR'}
  }
  ImprovedGateType['AND'].next = ImprovedGateType['OR'];
  ImprovedGateType['OR'].next = ImprovedGateType['NAND'];
  ImprovedGateType['NAND'].next = ImprovedGateType['NOR'];
  ImprovedGateType['NOR'].next = ImprovedGateType['XOR'];
  ImprovedGateType['XOR'].next = ImprovedGateType['XNOR'];
  ImprovedGateType['XNOR'].next = ImprovedGateType['AND'];


  // Create the canvas on the page and initial map computations
  this.setScene = function(scene, state) {
    currentState = state;
    initialScene = scene;
    nodeMap = scene.nodes;

    createObjectiveChart(state);

    setValuesOnInputNodes();

    _.each(mapUtility.getOutputNodes(nodeMap), function(node) {
      solveNode(node, nodeMap);
    });

    setXLocationOfNodes();

    setValuesOnOutputNodes();

    setInitialGateTypes();

    //console.log(getPropValuesFromArrayObjects(nodeMap, ["id", "x", "y"]));

    determineCurrentObjective();

    setOutputStatesForCurrentObjective();

    pen.drawMapOfNodes(nodeMap, currentObjective);
  }

  // Compares the new state to the current one and updates
  this.update = function(state) {
    console.log(state);
    currentState = state;

    _.each(state.gateTypes, function(type, key) {
      if (nodeMap[key].gateType != type) {
        console.log("The state of node "+key+" has changed from "+nodeMap[key].gateType+" to "+type);
        nodeMap[key].gateType = type;
      }
    });

    pen.clear();

    determineCurrentObjective();
    setOutputStatesForCurrentObjective();
    pen.drawMapOfNodes(nodeMap, currentObjective);

    if (state.playerHasWon) {
      alert("YOU JUST FUCKING WON!!!");
    }

  }

// Private helper functions

  // Must be done before map is completed.
  var setValuesOnInputNodes = function() {
    var inputNodes = mapUtility.getInputNodes(nodeMap);

    var yInterval = canvas.height/(inputNodes.length+2);

    for(var i = 0; i < inputNodes.length; i++) {
      var node = inputNodes[i];
      node.state = true;
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

    // Set y to be the same as the input
    for (var i = 0; i < outputNodes.length; i++) {
      outputNodes[i].x = xPosition;
      var myInputID = outputNodes[i].ins[0];
      outputNodes[i].y = nodeMap[myInputID].y
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
    if (currentNode.layer != undefined) {
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

  var setInitialGateTypes = function() {
    _.each(initialScene.initialGateTypes, function(gate, key) {
      nodeMap[key].gateType = gate;
      console.log("Set gate @ "+key+" with type "+gate);
    });
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

  function setCanvasOnClick() {
    // There needs to be a recusive solve map for determining the output nodes state

    canvas.addEventListener('click', function(event) {
      coords = canvas.relMouseCoords(event);
      console.log("Clicked at x: "+coords.x+" and y: "+coords.y);

      var clickedNode = mapUtility.getNodeByCoord(nodeMap, coords.x, coords.y);
      
      if (clickedNode && clickedNode.gateType) {
        var improvedGate = _.findWhere(ImprovedGateType, {name: clickedNode.gateType});
        changeGateTypeCallback(clickedNode.id, improvedGate.next.name);

      } else if (clickedNode && initialScene.inputNodeIds.indexOf(clickedNode.id) != -1) {
        console.log("Input Node.");
        nodeMap[clickedNode.id].state = !clickedNode.state;
        
        determineCurrentObjective();

        setOutputStatesForCurrentObjective();

        pen.clear();
        pen.drawMapOfNodes(nodeMap, currentObjective);
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

  var determineCurrentObjective = function() {

    _.each(currentState.objectives, function(objective, key) {
      if (objectiveMatchesCurrentScene(objective)) {
        currentObjective = objective;
        console.log(currentObjective);
      }
    });
  }

  var objectiveMatchesCurrentScene = function(objective) {
    var nonMatches = 0;

    _.each(initialScene.inputNodeIds, function(id, key) {
      if (nodeMap[id].state != objective.nodes[id]) {
        nonMatches++;
      }
    })
    return (nonMatches == 0);
  }

  var setOutputStatesForCurrentObjective = function() {
    var outputNodes = mapUtility.getOutputNodes(nodeMap);

    _.each(outputNodes, function(value) {
      nodeMap[value.id].state = currentObjective.nodes[value.id];
    });
  }

  var createObjectiveChart = function(state) {

    console.log("create chart.");

    var chart = "<table style='width:100%'>";
    chart += createHeader();

    _.each(state.objectives, function(objective, key) {
      chart += "<tr>";

      chart += createTableData(objective, initialScene.inputNodeIds);
      chart += createTableData(objective, initialScene.outputNodeIds);

      chart += "</tr>";
    });

    chart += "</table>";

    document.write(chart);

  }

  var createTableData = function(objective, arrayOfIds) {
    var elements = "";

    _.each(arrayOfIds, function(id, key) {
        var gateColor = (objective.nodes[id]) ? "#33CC33" : "#CC0000";
        var textColor = (objective.nodes[id]) ? "black" : "white";
          
        elements += "<td bgcolor=";
        elements += gateColor;
        elements += "><font color=";
        elements += textColor;
        elements += ">";
        elements += objective.nodes[id];
        elements += "</font></td>";
      });

    return elements;
  }

  var createHeader = function() {
    var header = "<tr id='header'>";
    _.each(initialScene.inputNodeIds, function(id, key) {
      header += "<td>Input ";
      header += id;
      header += "</td>"
    });

    _.each(initialScene.outputNodeIds, function(id, key) {
      header += "<td>Output ";
      header += id;
      header += "</td>"
    });

    header += "</tr>";
    return header;
  }

}

module.exports = Visualizer;
