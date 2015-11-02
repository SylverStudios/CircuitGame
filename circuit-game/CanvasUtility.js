var _ = require('underscore');

var CanvasUtility = function(canvas) {
  var self = this;

  // Public methods
  this.drawNode = function(node, type) {
    // TODO: swap this out with real shit
    var gateType = "green";
    if (type != null) {
      gateType = type;
    }

    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(node.x, node.y, 10, 0, 2*Math.PI);
    context.fillStyle = gateType;
    context.fill();
    context.closePath();
  };

  this.connectNodes = function(node1, node2) {
    if (node1.y != node2.y) {
      multiLineWire(node1, node2);
    } else {
      singleLineWire(node1, node2);
    }
  };

  this.drawMapOfNodes = function(nodeMap) {
    _.each(nodeMap, function(node) {
        var firstNode = node;
        self.drawNode(node);

        _.each(firstNode.outs, function(outID) {
          var secondNode = nodeMap[outID];
          self.connectNodes(firstNode, secondNode);
        });

      }); 
  };

  // Private methods
  var singleLineWire = function(node1, node2) {
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(node1.x, node1.y);
    context.lineTo(node2.x, node2.y);
    context.stroke();
    context.closePath();
  };

  var multiLineWire = function(node1, node2) {
    var context = canvas.getContext('2d');
    var distanceBetween = Math.abs(node1.x - node2.x);

    context.beginPath();
    context.moveTo(node1.x , node1.y);
    context.lineTo(node1.x + (distanceBetween/2), node1.y);
    context.lineTo(node1.x + (distanceBetween/2) , node2.y);
    context.lineTo(node2.x , node2.y);

    context.stroke();
    context.closePath();
  };
};

module.exports = CanvasUtility;