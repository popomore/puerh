define(function(require){
  var expect = require('expect');
  var puerh = require('puerh');

  describe('Puerh seajs', function() {
    it('puerh function', function() {
      expect(puerh.Assertion.prototype.called).to.be.a('function');
    });

    it('expect function', function() {
      expect(puerh.Assertion.prototype.assert).to.be.a('function');
      expect(puerh.Assertion.prototype.ok).to.be.a('function');
    });
  });
});