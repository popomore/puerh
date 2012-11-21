describe('Puer', function() {
    describe('spy', function() {
        it('should be a spy', function() {
            var spy = sinon.spy();
            expect(spy).to.be.spy();
        });

        it('should not be a spy', function() {
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
        });

        it('should not be called', function() {
            var spy = sinon.spy();
            expect(spy).not.to.be.called();
        });

        it('should be called with args', function() {
            var spy = sinon.spy();
            spy('a');
            spy(['a', 'b']);
            expect(spy).to.be.calledWith('a');
            expect(spy).to.be.calledWith(['a', 'b']);
        });

        it('should not be called with args', function() {
            var spy = sinon.spy();
            spy('a');
            spy(['a', 'b']);
            expect(spy).not.to.be.calledWith('b');
        });
    });

    xit('to.be.called', function() {
        //var spy = sinon.spy();
        //expect(spy).to.be.spy();
        //expect(spy).to.be.called.with('a');
        //expect(spy).to.be.called.match('a');
        //expect(spy).to.be.called.once();
        //expect(spy).to.be.called.once.with('a');
        //expect(spy).to.be.called.count(3);
        //expect(spy).to.be.called.before(spy);
        //expect(spy).to.be.called.after(spy);
        //expect(spy).to.be.returned(3);
    });
});
