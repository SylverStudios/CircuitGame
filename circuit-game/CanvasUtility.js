var _ = require('underscore');
var GateType = require('./GateType');

var CanvasUtility = function(canvas) {
  var self = this;
  var context = canvas.getContext('2d');
  var objective;

  // Public methods
  this.drawNode = function(node) {
    drawGate(node);
  };

  this.connectNodes = function(node1, node2, currentObjective) {
    if (node1.y != node2.y) {
      multiLineWire(node1, node2, currentObjective);
    } else {
      singleLineWire(node1, node2, currentObjective);
    }
  };

  this.drawMapOfNodes = function(nodeMap, currentObjective) {
    objective = currentObjective;
    _.each(nodeMap, function(node) {
        var firstNode = node;
        self.drawNode(node);

        _.each(firstNode.outs, function(outID) {
          var secondNode = nodeMap[outID];
          self.connectNodes(firstNode, secondNode, currentObjective);
        });

      }); 
  };

  this.clear = function() {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Private methods
  var singleLineWire = function(node1, node2) {
    var target = (node1.x < node2.x) ? node2 : node1;
    var start = (node1.x < node2.x) ? node1 : node2;

    context.beginPath();
    context.strokeStyle = (objective.nodes[start.id]) ? "#33CC33" : "#CC0000";
    context.lineWidth = 6;
    context.moveTo(node1.x+18, node1.y);
    context.lineTo(node2.x-10, node2.y);
    context.stroke();

    context.beginPath();
    context.moveTo(node1.x+18, node1.y);
    context.lineTo(node2.x-10, node2.y);
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.stroke();
  };

  var multiLineWire = function(node1, node2) {
    var distanceBetween = Math.abs(node1.x - node2.x);
    var target = (node1.x < node2.x) ? node2 : node1;
    var start = (node1.x < node2.x) ? node1 : node2;

    var isTargetLower = target.y > start.y;
    var yTargetOffset = (isTargetLower) ? -5 : 5;
    var xStartOffset = (start.ins.length == 0) ? -8 : 0;

    if (target.outs.length == 0) {
      yTargetOffset = 0;
    }

    context.beginPath();
    context.moveTo(start.x+18 + xStartOffset , start.y);
    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2), start.y);
    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2) , target.y+yTargetOffset);
    context.lineTo(target.x-10 , target.y+yTargetOffset);
    context.strokeStyle = (objective.nodes[start.id]) ? "#33CC33" : "#CC0000";
    context.lineWidth = 6;
    context.stroke();

    context.beginPath();
    context.moveTo(start.x+18 + xStartOffset , start.y);
    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2), start.y);
    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2) , target.y+yTargetOffset);
    context.lineTo(target.x-10 , target.y+yTargetOffset);
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.stroke();
  };

// Nodes all have the same base dimensions
// Front Assesories: Not Symbol -or- Exit Wire
// Rear Assesories: Exclusive Symbol
  function drawStateNode(node) {
    var gateColor = (node.state) ? "#33CC33" : "#CC0000";

    context.beginPath();
    context.arc(node.x, node.y, 10, 0, 2*Math.PI);
    context.fillStyle = gateColor;
    context.fill();
    context.closePath();
  }

  function drawAnd(node) {
    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.moveTo(node.x, node.y+10);
    context.lineTo(node.x-10, node.y+10);
    context.lineTo(node.x-10, node.y-10);
    context.lineTo(node.x, node.y-10);
    context.stroke();

    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.arc(node.x, node.y, 10, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();
  }

  function drawOr(node) {
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.ellipse(node.x-15, node.y, 25, 10, 0, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();

    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.ellipse(node.x-15, node.y, 5, 10, 0, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();
  }

  function drawNand(node) {
    drawAnd(node);
    drawNot(node);
  }

  function drawNor(node) {
    drawOr(node);
    drawNot(node);
  }

  function drawXor(node) {
    drawOr(node);
    drawNot(node);
  }

  function drawXnor(node) {
    drawOr(node);
    drawExclusive(node);
    drawNot(node);
  }

//_________________________________________________________________________________________Accessories
  function drawNot(node) {
    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.arc(node.x+14, node.y, 4, 0, Math.PI*2, false);
    context.stroke();
  }

  function drawExclusive(node) {
    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.ellipse(node.x-19, node.y, 4, 10, 0, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();
  }

  function drawExitWire(node) {
    context.beginPath();
    context.strokeStyle = (objective.nodes[node.id]) ? "#33CC33" : "#CC0000";
    context.lineWidth = 6;
    context.moveTo(node.x+10, node.y);
    context.lineTo(node.x+18, node.y);
    context.stroke();

    context.beginPath();
    context.strokeStyle = '#550000';
    context.lineWidth = 2;
    context.moveTo(node.x+10, node.y);
    context.lineTo(node.x+18, node.y);
    context.stroke();
  }

  var drawGate = function(node) {
    switch (node.gateType) {
      case GateType.AND:
        drawAnd(node);
        drawExitWire(node);
        break;

      case GateType.OR:
        drawOr(node);
        drawExitWire(node);
        break;

      case GateType.NAND:
        drawAnd(node);
        drawNot(node);
        break;

      case GateType.NOR:
        drawOr(node);
        drawNot(node);
        break;

      case GateType.XOR:
        drawOr(node);
        drawExclusive(node);
        drawExitWire(node);
        break;

      case GateType.XNOR:
        drawOr(node);
        drawExclusive(node);
        drawNot(node);
        break;

      case "" || undefined:
        drawStateNode(node);
        break;

      default:
        console.log("OH GAWD!!! IT WASN'T A GATE TYPE!!!");
    }
  };
}

module.exports = CanvasUtility;