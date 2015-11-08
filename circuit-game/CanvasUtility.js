var _ = require('underscore');
var GateType = require('./GateType');

var CanvasUtility = function(canvas) {
  var self = this;
  var context = canvas.getContext('2d');
  context.lineWidth = 2;
  context.strokeStyle = '#550000';

  // Public methods
  this.drawNode = function(node) {
    drawGate(node);
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

  this.clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Private methods
  var singleLineWire = function(node1, node2) {
    context.beginPath();
    context.moveTo(node1.x+18, node1.y);
    context.lineTo(node2.x-10, node2.y);
    context.stroke();
    context.closePath();
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

    context.stroke();
    context.closePath();
  };

  // I want all of the gates to be the same size, which unfortunately means they will
  // each have to be resized depending on whether they have the NOT symbol or the Exclusive
  // Symbol.
  // They should all take space from:
  // X:    [node.x-10, node.x+18]
  // Y:    [node.y-10, node.y+10]
  // Not Symbols will have width 8
  // Exclusive will take up width 4

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
    context.moveTo(node.x, node.y+10);
    context.lineTo(node.x-10, node.y+10);
    context.lineTo(node.x-10, node.y-10);
    context.lineTo(node.x, node.y-10);
    context.stroke();

    context.beginPath();
    context.arc(node.x, node.y, 10, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();
  }

  function drawNand(node) {
    drawAnd(node);
    drawNot(node);
  }

  function drawOr(node) {
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    context.beginPath();
    context.ellipse(node.x-15, node.y, 25, 10, 0, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();

    context.beginPath();
    context.ellipse(node.x-15, node.y, 5, 10, 0, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();
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

//_________________________________________________________________________________________Assesory 
  function drawNot(node) {
    context.beginPath();
    context.arc(node.x+14, node.y, 4, 0, Math.PI*2, false);
    context.stroke();
  }

  function drawExclusive(node) {
    context.beginPath();
    context.ellipse(node.x-19, node.y, 4, 10, 0, Math.PI*1.5, Math.PI*.5, false);
    context.stroke();
  }

  function drawExitWire(node) {
    context.beginPath();
    context.moveTo(node.x+10, node.y);
    context.lineTo(node.x+18, node.y);
    context.stroke();
    context.closePath();
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