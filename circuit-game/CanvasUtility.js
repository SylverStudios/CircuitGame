var _ = require('underscore');
// NODE
// context.arc(x,y,r,sAngle,eAngle,counterclockwise);
var placeNode = function(canvas, node) {
  var context = canvas.getContext('2d');
  context.beginPath();
  context.arc(node.x+canvas.offsetLeft, node.y+canvas.offsetTop, 10, 0, 2*Math.PI);
  // context.fillStyle='#4F2F4F'
  context.fillStyle = 'green';
  context.fill();
  context.closePath();
}

// WIRE
var connectNodes = function(canvas, node1, node2) {
  if (node1.y != node2.y) {
    multiLineWire(canvas, node1, node2);
  } else {
    singleLineWire(canvas, node1, node2);
  }
}

var singleLineWire = function(canvas, node1, node2) {
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(node1.x+canvas.offsetLeft, node1.y+canvas.offsetTop);
  context.lineTo(node2.x+canvas.offsetLeft, node2.y+canvas.offsetTop);
  context.stroke();
  context.closePath();
}

var multiLineWire = function(canvas, node1, node2) {
  var context = canvas.getContext('2d');
  var distanceBetween = Math.abs(node1.x - node2.x);

  context.beginPath();
  context.moveTo(node1.x + canvas.offsetLeft, node1.y + canvas.offsetTop);
  context.lineTo(node1.x + (distanceBetween/2) + canvas.offsetLeft, node1.y + canvas.offsetTop);
  context.lineTo(node1.x + (distanceBetween/2) + canvas.offsetLeft, node2.y + canvas.offsetTop);
  context.lineTo(node2.x + canvas.offsetLeft, node2.y + canvas.offsetTop);
  context.stroke();
  context.closePath();
}

var displayTest = function(canvas) {

  var node1 = {
    x : 150,
    y : 50
  }

  var node2 = {
    x : 400,
    y : 100
  }

  var node3 = {
    x : 50,
    y : 150
  }

  placeNode(canvas, node1);
  placeNode(canvas, node2);
  placeNode(canvas, node3);

  connectNodes(canvas, node1, node2);
  connectNodes(canvas, node3, node2);
}

module.exports = {
  placeNodeOnCanvas : function(canvas, node) {
    placeNode(canvas, node);
  },

  connectNodesOnCanvas : function(canvas, node1, node2) {
    // console.log("Connecting nodes: \n");
    // console.log("outNode ID: "+node1.id+" X: "+node1.x+" Y: "+node1.y);
    // console.log("currentNode ID: "+node2.id+" X: "+node2.x+" Y: "+node2.y);
    connectNodes(canvas, node1, node2);
  },

  drawMapOfNodes : function(canvas, nodeMap) {
    _.each(nodeMap, function(node) {
        var firstNode = node;
        placeNode(canvas, node);

        _.each(firstNode.outs, function(outID) {
          var secondNode = nodeMap[outID];
          connectNodes(canvas, firstNode, secondNode);
        });

      }); 
  },

  canvasTest : function(canvas) {
    displayTest(canvas);
  }
}