;(function() {
    var Assertion = expect.Assertion,
        flags = expect.flags;

    flags.be.push('called');
    flags['called'] = ['once', 'twice', 'thrice'];

    Assertion.prototype.spy = function() {
        var o = this.obj;
        this.assert(
            o && o.getCall,
            function() { return 'expected ' + this.obj + ' to be a spy' },
            function() { return 'expected ' + this.obj + ' not to be a spy' });
    };

    Assertion.prototype.called = function() {
        expect(this.obj).to.be.spy();

        this.assert(
            this.obj.called,
            function() { return 'expected ' + this.obj + ' to be called' },
            function() { return 'expected ' + this.obj + ' not to be called' });
        return this;
    };

    Assertion.prototype.match = function() {
        expect(this.obj).to.be.spy();
        needCalledFlag(this);
        var a = Array.prototype.join.call(arguments, ',');

        this.assert(
            this.obj.calledWithMatch.apply(this.obj, arguments),
            function() { return 'expected ' + this.obj + ' to be called match "' + a + '"' },
            function() { return 'expected ' + this.obj + ' not to be called match "' + a + '"' });
    };

    Assertion.prototype.with = function() {
        expect(this.obj).to.be.spy();
        needCalledFlag(this);
        var a = Array.prototype.join.call(arguments, ',');

        var arr = ['once', 'twice', 'thrice'];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (this.flags[arr[i]]) {
                var method = 'called' + capitalize(arr[i]);
                this.assert(
                    this.obj.withArgs
                        .apply(this.obj, arguments)[method],
                    function() { return 'expected ' + this.obj + ' to be called with "' + a + '" ' + arr[i] },
                    function() { return 'expected ' + this.obj + ' not to be called with "' + a + '" ' + arr[i] });
                return;
            }
        }

        this.assert(
            this.obj.calledWith.apply(this.obj, arguments),
            function() { return 'expected ' + this.obj + ' to be called with "' + a + '"' },
            function() { return 'expected ' + this.obj + ' not to be called with "' + a + '"' });
    };

    var arr = ['once', 'twice', 'thrice'];
    for (var i = 0, l = arr.length; i < l; i++) {
        (function(times) {
            Assertion.prototype[times] = function() {
                expect(this.obj).to.be.spy();
                needCalledFlag(this);

                this.assert(
                    this.obj['called' + capitalize(times)],
                    function() { return 'expected ' + this.obj + ' to be called ' + times },
                    function() { return 'expected ' + this.obj + ' not to be called ' + times });
            };
        })(arr[i]);
    }

    Assertion.prototype.count = function(num) {
        expect(this.obj).to.be.spy();
        needCalledFlag(this);

        this.assert(
            this.obj.callCount === num,
            function() { return 'expected ' + this.obj + ' to be called ' + num + ' times"' },
            function() { return 'expected ' + this.obj + ' not to be called ' + num + ' times"' })
    };

    Assertion.prototype.before = function(spy) {
        expect(this.obj).to.be.spy();
        needCalledFlag(this);

        this.assert(
            this.obj.calledBefore.apply(this.obj, arguments),
            function() { return 'expected ' + this.obj + ' to be called before ' + spy },
            function() { return 'expected ' + this.obj + ' not to be called before' + spy })

    };

    Assertion.prototype.after = function(spy) {
        expect(this.obj).to.be.spy();
        needCalledFlag(this);

        this.assert(
            this.obj.calledAfter.apply(this.obj, arguments),
            function() { return 'expected ' + this.obj + ' to be called after' + spy },
            function() { return 'expected ' + this.obj + ' not to be called after ' + spy })

    };

    Assertion.prototype.returned = function(value) {
        expect(this.obj).to.be.spy();

        this.assert(
            this.obj.returned.apply(this.obj, arguments),
            function() { return 'expected ' + this.obj + ' to be returned ' + value },
            function() { return 'expected ' + this.obj + ' not to be return ' + value })
    };

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

})();

