(function(callback) {
  if (typeof require === 'function') {
    callback(require, exports, module);
  } else {
    window.puerh = {};
    callback(undefined, puerh, {exports: puerh});
  }
})(function(require, exports, module) {
  var puerh = exports;

  if (require) {
    var expect = require('./vendor/expect');
    var sinon = require('sinon');
    module.exports = extendExpect(expect, sinon);
  } else {
    extendExpect(window.expect, window.sinon);
  }

  function extendExpect(expect, sinon) {
    var Assertion = expect.Assertion,
    flags = expect.flags;

    // to.be.called.once
    flags.be.push('called');
    flags['called'] = ['once', 'twice', 'thrice'];
    // always.to.be
    flags['always'] = ['to'];
    // not.always.to.be
    flags.not.push('always');

    Assertion.prototype.spy = function() {
      var o = this.obj;
      assert.apply(this, [
        o && o.getCall,
        'to be a spy'
      ]);
    };

    Assertion.prototype.called = function() {
      expect(this.obj).to.be.spy();

      assert.apply(this, [
        this.obj.called,
        'to be called at least once'
      ]);
      return this;
    };

    Assertion.prototype.on = function() {
      expect(this.obj).to.be.spy();
      needCalledFlag(this);
      var a = Array.prototype.join.call(arguments, ',');

      if (this.flags.always) {
        assert.apply(this, [
          this.obj.alwaysCalledOn.apply(this.obj, arguments),
          'always to be called on "' + a + '"'
        ]);
      } else {
        assert.apply(this, [
          this.obj.calledOn.apply(this.obj, arguments),
          'to be called on "' + a + '"'
        ]);
      }
    };


    Assertion.prototype.match = function() {
      expect(this.obj).to.be.spy();
      needCalledFlag(this);
      var a = Array.prototype.join.call(arguments, ',');

      if (this.flags.always) {
        assert.apply(this, [
          this.obj.alwaysCalledWithMatch.apply(this.obj, arguments),
          'always to be called match "' + a + '"'
        ]);
      } else {
        assert.apply(this, [
          this.obj.calledWithMatch.apply(this.obj, arguments),
          'to be called match "' + a + '"'
        ]);
      }
    };

    Assertion.prototype.withArgs = function() {
      expect(this.obj).to.be.spy();
      needCalledFlag(this);
      var a = Array.prototype.join.call(arguments, ',');

      var arr = ['once', 'twice', 'thrice'];
      for (var i = 0, l = arr.length; i < l; i++) {
        if (this.flags[arr[i]]) {
          var method = 'called' + capitalize(arr[i]);
          assert.apply(this, [
            this.obj.withArgs.apply(this.obj, arguments)[method],
            'to be called with "' + a + '" ' + arr[i]
          ]);
          return;
        }
      }

      if (this.flags.always) {
        assert.apply(this, [
          this.obj.alwaysCalledWith.apply(this.obj, arguments),
          'always to be called with "' + a + '"'
        ]);
      } else {
        assert.apply(this, [
          this.obj.calledWith.apply(this.obj, arguments),
          'to be called with "' + a + '"'
        ]);
      }

    };

    var arr = ['once', 'twice', 'thrice'];
    for (var i = 0, l = arr.length; i < l; i++) {
      (function(times) {
        Assertion.prototype[times] = function() {
          expect(this.obj).to.be.spy();
          needCalledFlag(this);

          assert.apply(this, [
            this.obj['called' + capitalize(times)],
            'to be called ' + times
          ]);
        };
      })(arr[i]);
    }

    Assertion.prototype.count = function(num) {
      expect(this.obj).to.be.spy();
      needCalledFlag(this);

      assert.apply(this, [
        this.obj.callCount === num,
        'to be called ' + num + ' times"'
      ]);
    };

    Assertion.prototype.before = function(spy) {
      expect(this.obj).to.be.spy();
      needCalledFlag(this);

      assert.apply(this, [
        this.obj.calledBefore.apply(this.obj, arguments),
        'to be called before ' + spy
      ]);
    };

    Assertion.prototype.after = function(spy) {
      expect(this.obj).to.be.spy();
      needCalledFlag(this);

      assert.apply(this, [
        this.obj.calledAfter.apply(this.obj, arguments),
        'to be called after ' + spy
      ]);
    };

    Assertion.prototype.returned = function(value) {
      expect(this.obj).to.be.spy();

      if (this.flags.always) {
        assert.apply(this, [
          this.obj.alwaysReturned.apply(this.obj, arguments),
          'always to be returned ' + value
        ]);
      } else {
        assert.apply(this, [
          this.obj.returned.apply(this.obj, arguments),
          'to be returned ' + value
        ]);
      }
    };


    // API is same as sinon
    var SINON_ASSERTION = [
      'notCalled',
      'calledOnce',
      'calledTwice',
      'calledThrice',
      'callCount',
      'calledOn',
      'alwaysCalledOn',
      'calledWith',
      'alwaysCalledWith',
      'neverCalledWith',
      'calledWithExactly',
      'alwaysCalledWithExactly',
      'calledWithMatch',
      'alwaysCalledWithMatch',
      'neverCalledWithMatch',
      'threw',
      'alwaysThrew'
    ];

    for (var j in SINON_ASSERTION) {
      (function(method) {
        Assertion.prototype[method] = function() {
          expect(this.obj).to.be.spy();
          Array.prototype.unshift.call(arguments, this.obj);
          if (this.flags.not) {
            var sinon_pass = false;
            try {
              sinon.assert[method].apply(null, arguments);
              sinon_pass = true;
            } catch(e) {}
            if (sinon_pass) {
              throw new Error(method + ' failed');
            }
          } else {
            sinon.assert[method].apply(null, arguments);
          }
          return this;
        };
      })(SINON_ASSERTION[j]);
    }

    return expect;
  }

  function needCalledFlag(assertion) {
    if (!assertion.flags.called) {
      throw new Error('Should be called first');
    }
  }

  function capitalize(str) {
    return str.replace(/^[a-z]/, function(a) {
      return a.toUpperCase();
    });
  }

  function assert(rule, msg) {
    this.assert(
      rule,
      function() { return 'expected ' + this.obj + ' ' + msg },
      function() { return 'expected ' + this.obj + ' not ' + msg }
    );
  }
});
