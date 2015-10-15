// NODE
// context.arc(x,y,r,sAngle,eAngle,counterclockwise);
var placeNode = function(context, node) {
  context.beginPath();
  context.arc(node.x, node.y, 20, 0, 2*Math.PI);
  // context.fillStyle='#4F2F4F'
  context.fillStyle = 'green';
  context.fill();
  context.closePath();
}

// WIRE
var connectNodes = function(context, node1, node2) {
  if (node1.y != node2.y) {
    multiLineWire(context, node1, node2);
  } else {
    singleLineWire(context, node1, node2);
  }
}

var singleLineWire = function(context, node1, node2) {
  context.beginPath();
  context.moveTo(node1.x, node1.y);
  context.lineTo(node2.x, node2.y);
  context.stroke();
  context.closePath();
}

var multiLineWire = function(context, node1, node2) {
  var distanceBetween = Math.abs(node1.x - node2.x);

  context.beginPath();
  context.moveTo(node1.x, node1.y);
  context.lineTo(node1.x + (distanceBetween/2), node1.y);
  context.lineTo(node1.x + (distanceBetween/2), node2.y);
  context.lineTo(node2.x, node2.y);
  context.stroke();
  context.closePath();
}

var displayTest = function(context) {
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

  placeNode(context, node1);
  placeNode(context, node2);
  placeNode(context, node3);

  connectNodes(context, node1, node2);
  connectNodes(context, node3, node2);
}

module.exports = {
  placeNodeOnCanvas : function(context, node) {
    placeNode(context, node);
  },

  connectNodesOnCanvas : function(context, node1, node2) {
    connectNodes(context, node1, node2);
  },

  canvasTest : function(context) {
    displayTest(context);
  }
}