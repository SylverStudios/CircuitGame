describe('CircuitGame, the top-level module', function() {
  it('has a game controller', function() {
    expect(require('../src/CircuitGame').gameController).toBeDefined();
  });
});
