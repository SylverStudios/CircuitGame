var CircuitGame = require('../../circuit-game/CircuitGame');

var containerId = 'game-container';

var game = new CircuitGame(containerId, 800, 600);



function getRandomInt(minInclusive, maxExclusive) {
  return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
}
function startWithRandomMap() {
  var index = getRandomInt(0, 3);
  game.startNewGame(index);
  console.log("Starting game with map : "+index);
}

document.getElementById('start-button').onclick = startWithRandomMap;



