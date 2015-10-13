jest.dontMock('../Controller');

describe('Controller', function() {
  it('returns an object', function() {
    expect(require('../Controller')).toBeDefined();
  });
});
