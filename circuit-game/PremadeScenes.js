/**
 * Premade scenes, as opposed to randomly generated scenes.
 * Higher indices means more difficult.
 */

var GateType = require('./GateType');

var PremadeScenes = {
  0: {
    nodes: {
      0: {id: 0, ins: [], outs: [2]},
      1: {id: 1, ins: [], outs: [2]},
      2: {id: 2, ins: [0, 1], outs: [3]},
      3: {id: 3, ins: [2], outs: []}
    },
    objectives: {
      0: {
        inputNodeStates: {0: false, 1: false},
        outputNodeStates: {3: false}
      },
      1: {
        inputNodeStates: {0: false, 1: true},
        outputNodeStates: {3: false}
      },
      2: {
        inputNodeStates: {0: true, 1: false},
        outputNodeStates: {3: false}
      },
      3: {
        inputNodeStates: {0: true, 1: true},
        outputNodeStates: {3: true}
      }
    },
    initialGateTypes: {
      2: GateType.OR // AND
    },
    inputNodeIds: [0, 1],
    gateNodeIds: [2],
    outputNodeIds: [3]
  }
};

module.exports = PremadeScenes;
