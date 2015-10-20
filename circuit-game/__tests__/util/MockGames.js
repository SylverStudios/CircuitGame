/**
 * Provides expectations for PremadeScenes.
 */

var PremadeScenes = require('../../PremadeScenes');
var GateType = require('../../GateType');

var MockGames = {
  0: {
    scene: PremadeScenes[0],
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
};

module.exports = MockGames;
