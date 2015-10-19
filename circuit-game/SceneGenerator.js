var MockGames = require('./__tests__/MockGames');

var SceneGenerator = {
  generate: function() {
    return MockGames[0];
  }
};

module.exports = SceneGenerator;
