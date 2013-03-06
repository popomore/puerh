if (typeof require !== 'undefined') {
  sinon = require('sinon');
  puerh = require('../lib/puerh.js');
  expect = puerh.use('expect');
} else {
  puerh.use('expect');
}

describe('Puerh spy', function() {
  it('should be a spy', function() {
    var spy = sinon.spy();
    expect(spy).to.be.spy();

    expect(null).not.to.be.spy();
    expect(undefined).not.to.be.spy();
    expect(1).not.to.be.spy();
    expect('a').not.to.be.spy();
    expect([1, 2]).not.to.be.spy();
    expect({a: '1'}).not.to.be.spy();
    expect(Date).not.to.be.spy();
  });

  it('should be called', function() {
    var spy = sinon.spy();
    spy();
    expect(spy).to.be.called();
    spy();
    expect(spy).to.be.called();
  });

  it('should not be called', function() {
    var spy = sinon.spy();
    expect(spy).not.to.be.called();
    expect(spy).to.be.notCalled();
  });

  it('should be called count', function() {
    var spy = sinon.spy();
    spy();
    spy();
    expect(spy).to.be.called.count(2);
    expect(spy).to.be.callCount(2);
    spy();
    spy();
    expect(spy).to.be.called.count(4);
    expect(spy).to.be.callCount(4);
  });

  it('should be call order', function() {
    var spy1 = sinon.spy();
    var spy2 = sinon.spy();
    var spy3 = sinon.spy();
    spy1();
    spy2();
    spy3();
    expect(spy1).to.be.called.before(spy2);
    expect(spy1).to.be.called.before(spy3);
    expect(spy2).to.be.called.after(spy1);
    expect(spy3).to.be.called.after(spy1);
  });

  it('should be called on', function() {
    var a = {
      func: function() {}
    };
    var global = {};
    sinon.spy(a, 'func');
    a.func();
    a.func.call(global);
    expect(a.func).to.be.called.on(a);
    expect(function() {
      expect(a.func).always.to.be.called.on(a);
    }).to.throwException();
    expect(a.func).to.be.calledOn(a);
    expect(function() {
      expect(a.func).to.be.alwaysCalledOn(a);
    }).to.throwException();
  });

  it('should be called with args', function() {
    var spy = sinon.spy();
    spy('a');
    spy(['a', 'b']);
    expect(spy).to.be.called.withArgs('a');
    expect(spy).to.be.called.withArgs(['a', 'b']);
    expect(spy).not.always.to.be.called.withArgs('a');
  });

  it('should not be called with args', function() {
    var spy = sinon.spy();
    spy('a');
    spy(['a', 'b']);
    expect(spy).not.to.be.called.withArgs('b');
  });

  it('should not be called with match args', function() {
    var spy = sinon.spy();
    spy('a');
    spy('b');
    spy('1');
    spy({a: 1, b: 2});
    expect(spy).to.be.called.match(/^[ab]/);
    expect(spy).to.be.called.match({a: 1});
    expect(spy).to.be.called.match(1);
    expect(spy).not.always.to.be.called.match(/^[ab]/);
  });

  it('should be called some times', function() {
    var spy1 = sinon.spy();
    spy1('a');
    expect(spy1).to.be.called.once();
    expect(spy1).not.to.be.called.twice();

    var spy2 = sinon.spy();
    spy2('a');
    spy2('b');
    expect(spy2).to.be.called.twice();
    expect(spy2).not.to.be.called.once();

    var spy3 = sinon.spy();
    spy3('a');
    spy3('b');
    spy3('c');
    spy3('c');
    spy3('c');
    expect(spy3).to.be.called.once.withArgs('a');
    expect(spy3).to.be.called.once.withArgs('b');
    expect(spy3).not.to.be.called.twice.withArgs('b');
    expect(spy3).to.be.called.thrice.withArgs('c');
  });

  it('should be called four times', function() {
    var spy = sinon.spy();
    spy();
    spy();
    spy();
    spy();
    expect(spy).to.be.called.count(4);
  });

  it('should be returned', function() {
    function func1() {
      return 1;
    }
    var spy1 = sinon.spy(func1);
    spy1();
    spy1();
    expect(spy1).to.be.returned(1);
    expect(spy1).always.to.be.returned(1);

    function func2(boolean) {
      if (boolean) {
        return 1;
      } else {
        return 2;
      }
    }
    var spy2 = sinon.spy(func2);
    spy2(true);
    spy2(false);
    expect(spy2).to.be.returned(1);
    expect(spy2).not.always.to.be.returned(1);
  });
});
