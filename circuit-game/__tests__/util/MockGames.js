/**
 * Provides expectations for PremadeScenes.
 */

var PremadeScenes = require('../../PremadeScenes');
var GateType = require('../../GateType');

var MockGames = {
  0: {
    scene: PremadeScenes[0],
    expectedInitialState: {
      gateTypes: {2: GateType.OR},
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
  },
  1: {
    scene: PremadeScenes[1],
    expectedInitialState: {
      gateTypes: {3: GateType.NOR, 4: GateType.XNOR},
      objectives: {
        0: {
          nodes: {0: false, 1: false, 2: false, 3: true, 4: false, 5: false},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        },
        1: {
          nodes: {0: false, 1: false, 2: true, 3: true, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        2: {
          nodes: {0: false, 1: true, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        3: {
          nodes: {0: false, 1: true, 2: true, 3: false, 4: false, 5: false},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        4: {
          nodes: {0: true, 1: false, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        5: {
          nodes: {0: true, 1: false, 2: true, 3: false, 4: false, 5: false},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        6: {
          nodes: {0: true, 1: true, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        7: {
          nodes: {0: true, 1: true, 2: true, 3: false, 4: false, 5: false},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        }
      },
      playerHasWon: false
    },
    expectedStateWithGatesXORandXNOR: {
      gateTypes: {3: GateType.XOR, 4: GateType.XNOR},
      objectives: {
        0: {
          nodes: {0: false, 1: false, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        1: {
          nodes: {0: false, 1: false, 2: true, 3: false, 4: false, 5: false},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        },
        2: {
          nodes: {0: false, 1: true, 2: false, 3: true, 4: false, 5: false},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        },
        3: {
          nodes: {0: false, 1: true, 2: true, 3: true, 4: true, 5: true},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        },
        4: {
          nodes: {0: true, 1: false, 2: false, 3: true, 4: false, 5: false},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        },
        5: {
          nodes: {0: true, 1: false, 2: true, 3: true, 4: true, 5: true},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        },
        6: {
          nodes: {0: true, 1: true, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        7: {
          nodes: {0: true, 1: true, 2: true, 3: false, 4: false, 5: false},
          outputNodeSatisfaction: {5: false},
          satisfied: false
        }
      },
      playerHasWon: false
    },
    expectedFinalState: {
      gateTypes: {3: GateType.XOR, 4: GateType.NAND},
      objectives: {
        0: {
          nodes: {0: false, 1: false, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        1: {
          nodes: {0: false, 1: false, 2: true, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        2: {
          nodes: {0: false, 1: true, 2: false, 3: true, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        3: {
          nodes: {0: false, 1: true, 2: true, 3: true, 4: false, 5: false},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        4: {
          nodes: {0: true, 1: false, 2: false, 3: true, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        5: {
          nodes: {0: true, 1: false, 2: true, 3: true, 4: false, 5: false},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        6: {
          nodes: {0: true, 1: true, 2: false, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        },
        7: {
          nodes: {0: true, 1: true, 2: true, 3: false, 4: true, 5: true},
          outputNodeSatisfaction: {5: true},
          satisfied: true
        }
      },
      playerHasWon: true
    }
  },
  2: {
    scene: PremadeScenes[2],
    expectedInitialState: {
      gateTypes: {3: GateType.OR, 4: GateType.NAND},
      objectives: {
        0: {
          nodes: {0: false, 1: false, 2: false, 3: false, 4: true, 5: false, 6: true},
          outputNodeSatisfaction: {5: false, 6: false},
          satisfied: false
        },
        1: {
          nodes: {0: false, 1: false, 2: true, 3: false, 4: true, 5: false, 6: true},
          outputNodeSatisfaction: {5: false, 6: true},
          satisfied: false
        },
        2: {
          nodes: {0: false, 1: true, 2: false, 3: true, 4: true, 5: true, 6: true},
          outputNodeSatisfaction: {5: false, 6: false},
          satisfied: false
        },
        3: {
          nodes: {0: false, 1: true, 2: true, 3: true, 4: false, 5: true, 6: false},
          outputNodeSatisfaction: {5: false, 6: true},
          satisfied: false
        },
        4: {
          nodes: {0: true, 1: false, 2: false, 3: true, 4: true, 5: true, 6: true},
          outputNodeSatisfaction: {5: false, 6: false},
          satisfied: false
        },
        5: {
          nodes: {0: true, 1: false, 2: true, 3: true, 4: false, 5: true, 6: false},
          outputNodeSatisfaction: {5: false, 6: true},
          satisfied: false
        },
        6: {
          nodes: {0: true, 1: true, 2: false, 3: true, 4: true, 5: true, 6: true},
          outputNodeSatisfaction: {5: false, 6: false},
          satisfied: false
        },
        7: {
          nodes: {0: true, 1: true, 2: true, 3: true, 4: false, 5: true, 6: false},
          outputNodeSatisfaction: {5: false, 6: true},
          satisfied: false
        }
      },
      playerHasWon: false
    }
  }
};

module.exports = MockGames;
