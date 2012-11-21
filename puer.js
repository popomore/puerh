;(function() {
    var Assertion = expect.Assertion,
        flags = expect.flags;


    Assertion.prototype.spy = function() {
        var o = this.obj;
        this.assert(
            o && o.displayName === 'spy',
            function() { return 'expected ' + this.obj + ' to be a spy' },
            function() { return 'expected ' + this.obj + ' not to be a spy' });
    };

    Assertion.prototype.called = function() {
        expect(this.obj).to.be.spy();

        this.assert(
            this.obj.called,
            function() { return 'expected ' + this.obj + ' to be called' },
            function() { return 'expected ' + this.obj + ' not to be called' });
    };

    for (var i in Assertion.prototype) {
        if (Assertion.prototype.hasOwnProperty(i)) {
            Assertion.prototype.called[i] = Assertion.prototype[i];
        }
    }

    Assertion.prototype.calledWith = function() {
        expect(this.obj).to.be.spy();
        var a = Array.prototype.join.call(arguments, ',');

        this.assert(
            this.obj.calledWith.apply(this.obj, arguments),
            function() { return 'expected ' + this.obj + ' to be called with ' + a },
            function() { return 'expected ' + this.obj + ' not to be called with' + a });
    };

})();

