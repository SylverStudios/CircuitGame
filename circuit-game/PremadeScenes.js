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
  },
  1: {
    nodes: {
      0: {id: 0, ins: [], outs: [3]},
      1: {id: 1, ins: [], outs: [3]},
      2: {id: 2, ins: [], outs: [4]},
      3: {id: 3, ins: [0, 1], outs: [4]},
      4: {id: 4, ins: [2, 3], outs: [5]},
      5: {id: 5, ins: [4], outs: []}
    },
    objectives: {
      0: {
        inputNodeStates: {0: false, 1: false, 2: false},
        outputNodeStates: {5: true}
      },
      1: {
        inputNodeStates: {0: false, 1: false, 2: true},
        outputNodeStates: {5: true}
      },
      2: {
        inputNodeStates: {0: false, 1: true, 2: false},
        outputNodeStates: {5: true}
      },
      3: {
        inputNodeStates: {0: false, 1: true, 2: true},
        outputNodeStates: {5: false}
      },
      4: {
        inputNodeStates: {0: true, 1: false, 2: false},
        outputNodeStates: {5: true}
      },
      5: {
        inputNodeStates: {0: true, 1: false, 2: true},
        outputNodeStates: {5: false}
      },
      6: {
        inputNodeStates: {0: true, 1: true, 2: false},
        outputNodeStates: {5: true}
      },
      7: {
        inputNodeStates: {0: true, 1: true, 2: true},
        outputNodeStates: {5: true}
      }
    },
    initialGateTypes: {
      3: GateType.NOR, // XOR
      4: GateType.XNOR // NAND
    },
    inputNodeIds: [0, 1, 2],
    gateNodeIds: [3, 4],
    outputNodeIds: [5]
  },
  2: {
    nodes: {
      0: {id: 0, ins: [], outs: [3]},
      1: {id: 1, ins: [], outs: [3]},
      2: {id: 2, ins: [], outs: [4]},
      3: {id: 3, ins: [0, 1], outs: [4, 5]},
      4: {id: 4, ins: [2, 3], outs: [6]},
      5: {id: 5, ins: [3], outs: []},
      6: {id: 6, ins: [4], outs: []}
    },
    objectives: {
      0: {
        inputNodeStates: {0: false, 1: false, 2: false},
        outputNodeStates: {5: true, 6: false}
      },
      1: {
        inputNodeStates: {0: false, 1: false, 2: true},
        outputNodeStates: {5: true, 6: true}
      },
      2: {
        inputNodeStates: {0: false, 1: true, 2: false},
        outputNodeStates: {5: false, 6: false}
      },
      3: {
        inputNodeStates: {0: false, 1: true, 2: true},
        outputNodeStates: {5: false, 6: false}
      },
      4: {
        inputNodeStates: {0: true, 1: false, 2: false},
        outputNodeStates: {5: false, 6: false}
      },
      5: {
        inputNodeStates: {0: true, 1: false, 2: true},
        outputNodeStates: {5: false, 6: false}
      },
      6: {
        inputNodeStates: {0: true, 1: true, 2: false},
        outputNodeStates: {5: false, 6: false}
      },
      7: {
        inputNodeStates: {0: true, 1: true, 2: true},
        outputNodeStates: {5: false, 6: false}
      }
    },
    initialGateTypes: {
      3: GateType.OR, // NOR
      4: GateType.NAND // AND
    },
    inputNodeIds: [0, 1, 2],
    gateNodeIds: [3, 4],
    outputNodeIds: [5, 6]
  }
};

module.exports = PremadeScenes;
