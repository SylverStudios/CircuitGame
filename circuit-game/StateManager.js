/**
 * Performs operations pertaining to game state.
 */

var _ = require('underscore');
var GateLogic = require('./GateLogic');

function computeNodeStates(nodes, inputNodeIds, outputNodeIds, gateTypes, inputNodeStates) {
  var nodeStates = {};

  function computeNodeState(node) {
    var id = node.id;

    if (nodeStates[id] !== undefined) { // node state has been calculated before
      return nodeStates[id];
    }
    if (_.contains(inputNodeIds, id)) { // input node, state is in objective
      return inputNodeStates[id];
    }
    if (_.contains(outputNodeIds, id)) { // output node, state comes from sole in node (recursive)
      return computeNodeState(nodes[node.ins[0]]);
    }
    // gate node, return logical combination of all inputs according to gate type (recursive)
    var gateType = gateTypes[id];
    var inNodes = _.filter(nodes, function(potentialInNode) {
      return _.contains(node.ins, potentialInNode.id);
    });
    var inNodeStates = _.map(inNodes, function(inNode) {
      return computeNodeState(inNode);
    });
    return GateLogic(inNodeStates, gateType);
  }

  _.each(nodes, function(node, nodeId) {
    var nodeState = computeNodeState(node);
    nodeStates[nodeId] = nodeState;
  });

  return nodeStates;
}

function computeObjectiveState(scene, gateTypes, objective) {
  var objectiveState = {};

  objectiveState.nodes = computeNodeStates(scene.nodes, scene.inputNodeIds,
    scene.outputNodeIds, gateTypes, objective.inputNodeStates);

  objectiveState.outputNodeSatisfaction = {};
  _.each(scene.outputNodeIds, function(outputNodeId) {
    var outputNodeIsSatisfied = objectiveState.nodes[outputNodeId] === objective.outputNodeStates[outputNodeId];
    objectiveState.outputNodeSatisfaction[outputNodeId] = outputNodeIsSatisfied;
  });

  objectiveState.satisfied = !_.contains(_.values(objectiveState.outputNodeSatisfaction), false);

  return objectiveState;
}

var StateManager = {
  computeState: function(scene, gateTypes) {
    if (gateTypes === undefined) {
      gateTypes = scene.initialGateTypes;
    }

    var objectiveStates = {};

    _.each(scene.objectives, function(objective, objectiveId) {
      var objectiveState = computeObjectiveState(scene, gateTypes, objective);
      objectiveStates[objectiveId] = objectiveState;
    });

    var playerHasWon = !_.contains(_.pluck(_.values(objectiveStates), 'satisfied'), false);

    return {
      gateTypes: gateTypes,
      objectives: objectiveStates,
      playerHasWon: playerHasWon
    }
  }
};

module.exports = StateManager;
