var canvasUtility = require('./CanvasUtility');

var canvas = "a real canvas somehow";
var pen = new canvasUtility(canvas);

var workingNode = {x:200,y:200};
var badNode = {x:9999,y:9999};

describe('CanvasUtility Test', function() {

  var CircuitGame, _, game, SceneGenerator;


  beforeEach(function() {
    var todo = "Should probs build the canvasUtility and canvas";
  });

  it('throws on node location outside of canvas bounds', function() {
    expect(pen.drawNode(badNode)).toThrow("Some sort of exception.");
  });



  // TODO 

  it('throws if there is no current scene in changeGateType', function() {
    expect(_.partial(game.changeGateType, 0, 0)).toThrow('cannot change gate type, no current scene');
  });

  it('throws on bad gateIndex in changeGateType', function() {
    game.scene = {};
    expect(_.partial(game.changeGateType, -2)).toThrow('invalid gateIndex: -2');
  });

  it('throws on bade gateType in changeGateType', function() {
    game.scene = {gateNodeIds: [0]};
    expect(_.partial(game.changeGateType, 0, -2)).toThrow('invalid gateType: -2');
  });
});