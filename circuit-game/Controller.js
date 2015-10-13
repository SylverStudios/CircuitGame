var Controller = function() {
  this.init = function() {};
  this.createBoard = function() { // perhaps should be in a separate board generation module (will be lots of logic)
    return {
      numInputs: 3 // dummy to test integration
    }
  }
}

module.exports = Controller;
