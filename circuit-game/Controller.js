var _ = require('underscore');

var Controller = function() {
  this.init = function() {};
  this.createBoard = function() { // perhaps should be in a separate board generation module (will be lots of logic)
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
    var getInputNodes = function() {
      return _.filter(nodes, function(node) {
        return node.ins.length === 0;
      })
    };
    var getOutputNodes = function() {
      return _.filter(nodes, function(node) {
        return node.outs.length === 0;
      });
    };
    var getGates = function() {
      return _.filter(nodes, function(node) {
        return node.ins.length > 0 && node.outs.length > 0;
      });
    };
    var getInsAsNodes = function(originalNode) {
      return _.filter(nodes, function(node) {
        return _.contains(originalNode.ins, node.id);
      });
    };
    var getOutsAsNodes = function(originalNode) {
      return _.filter(nodes, function(node) {
        return _.contains(originalNode.outs, node.id);
      });
    };
    return {
      nodes: nodes,
      getInputNodes: getInputNodes,
      getOutputNodes: getOutputNodes,
      getGates: getGates,
      getInsAsNodes: getInsAsNodes,
      getOutsAsNodes: getOutsAsNodes
    };
  };
};

module.exports = Controller;
