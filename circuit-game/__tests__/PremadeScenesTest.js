var _ = require('underscore');

describe('PremadeScenes', function() {
  it('--- all PremadeScenes are valid scenes', function() {
    var PremadeScenes = require('../PremadeScenes');
    _.each(PremadeScenes, function(scene) {
      expectAllNodesHaveValidIdInsAndOuts(scene);
      expectAllInputNodesHaveNoIns(scene);
      expectAllOutputNodesHaveNoOuts(scene);
      expectAllOutputNodesHaveOneIn(scene);
      expectNumObjectivesIs2ToTheNumInputNodes(scene);
      expectAllObjectivesAccountForAllOutputNodes(scene);
    });
  });

  function expectAllSceneFieldsValid(scene) {
    expect(_.isObject(scene.nodes)).toBe(true);
    expect(_.isObject(scene.objectives)).toBe(true);
    expect(_.isObject(scene.initialGateTypes)).toBe(true);
    expect(_.isArray(scene.inputNodeIds)).toBe(true);
    expect(_.isArray(scene.outputNodeIds)).toBe(true);
    expect(_.isArray(scene.gateNodeIds)).toBe(true);
    expect(_.size(scene)).toBe(6);
  }
  function expectAllNodesHaveValidIdInsAndOuts(scene) {
    _.each(scene.nodes, function(node, nodeId) {
      expect(_.isNumber(node.id)).toBe(true);
      expect(_.isArray(node.ins)).toBe(true);
      expect(_.isArray(node.outs)).toBe(true);
      expect('' + node.id).toBe(nodeId);
    });
  }
  function expectAllInputNodesHaveNoIns(scene) {
    _.each(scene.inputNodeIds, function(inputNodeId) {
      expect(scene.nodes[inputNodeId].ins.length).toBe(0);
    });
  }
  function expectAllOutputNodesHaveNoOuts(scene) {
    _.each(scene.outputNodeIds, function(outputNodeId) {
      expect(scene.nodes[outputNodeId].outs.length).toBe(0);
    });
  }
  function expectAllOutputNodesHaveOneIn(scene) {
    _.each(scene.outputNodeIds, function(outputNodeId) {
      expect(scene.nodes[outputNodeId].ins.length).toBe(1);
    });
  }
  function expectNumObjectivesIs2ToTheNumInputNodes(scene) {
    expect(_.size(scene.objectives)).toBe(Math.pow(2, _.size(scene.inputNodeIds)));
  }
  function expectAllObjectivesAccountForAllInputNodes(scene) {
    _.each(scene.objectives, function(objective) {
      expect(_.size(objective.inputNodeStates)).toBe(_.size(scene.inputNodeIds));
      _.each(scene.inputNodeIds, function(inputNodeId) {
        expect(_.keys(objective.inputNodeStates)).toContain('' + inputNodeId);
      });
    });
  }
  function expectAllObjectivesAccountForAllOutputNodes(scene) {
    _.each(scene.objectives, function(objective) {
      expect(_.size(objective.outputNodeStates)).toBe(_.size(scene.outputNodeIds));
      _.each(scene.outputNodeIds, function(outputNodeId) {
        expect(_.keys(objective.outputNodeStates)).toContain('' + outputNodeId);
      });
    });
  }
});
