var GateType = require('../GateType');

var MockGames = [
  {
    scene: {
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
      inputNodeIds: [0, 1],
      gateNodeIds: [2],
      outputNodeIds: [3]
    },
    initialGateTypes: {
      2: GateType.OR
    },
    expectedInitialState: {
      gateTypes: {
        2: GateType.OR
      },
      objectives: {
        0: {
          nodes: {0: false, 1: false, 2: false, 3: false},
          outputNodeSatisfaction: {3: true},
          satisfied: true
        },
        1: {
          nodes: {0: false, 1: true, 2: true, 3: true},
          outputNodeSatisfaction: {3: false},
          satisfied: false
        },
        2: {
          nodes: {0: true, 1: false, 2: true, 3: true},
          outputNodeSatisfaction: {3: false},
          satisfied: false
        },
        3: {
          nodes: {0: true, 1: true, 2: true, 3: true},
          outputNodeSatisfaction: {3: true},
          satisfied: true
        }
      },
      playerHasWon: false
    },
    expectedStateWithAndGate: {
      gateTypes: {
        2: GateType.AND
      },
      objectives: {
        0: {
          nodes: {0: false, 1: false, 2: false, 3: false},
          outputNodeSatisfaction: {3: true},
          satisfied: true
        },
        1: {
          nodes: {0: false, 1: true, 2: false, 3: false},
          outputNodeSatisfaction: {3: true},
          satisfied: true
        },
        2: {
          nodes: {0: true, 1: false, 2: false, 3: false},
          outputNodeSatisfaction: {3: true},
          satisfied: true
        },
        3: {
          nodes: {0: true, 1: true, 2: true, 3: true},
          outputNodeSatisfaction: {3: true},
          satisfied: true
        }
      },
      playerHasWon: true
    }
  }
];

module.exports = MockGames;
