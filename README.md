# Pu-erh [![Build Status](https://secure.travis-ci.org/popomore/puerh.png)](https://travis-ci.org/popomore/puerh)

Pu-erh *( 普洱: pǔ'ěr )* is a sinonjs assertion wrapper for expect.

---

## Usage

```
var spy = sinon.spy();
expect(spy).to.be.spy();
```

### Node

Install puerh

```
$ npm install puerh
```

Require puerh and use it as expect

```
puerh = require('puerh');
expect = puerh.use('expect');
```

### Browser

Puerh has contained expectjs, you can use `https://github.com/popomore/puerh/blob/master/puerh.js`

    <script src="path/to/sinon.js"></script>
    <script src="path/to/puerh.js"></script>
    <script>puerh.use('expect');</script>
    <script src="path/to/spec.js"></script>
    
## API

Same as [sinon assertion](http://sinonjs.org/docs/#assertions)

### to.be.spy

### to.be.called

### not.to.be.called / to.be.notCalled

### to.be.called.count / to.be.callCount

### to.be.called.before

### to.be.called.after

### to.be.called.on / to.be.calledOn

### always.to.be.called.on / alwaysCalledOn

### to.be.called.withArgs / calledWith

### to.be.called.match / calledWithMatch

### to.be.called.once / to.be.calledOnce

### to.be.called.once.withArgs

### to.be.called.twice / to.be.calledTwice

### to.be.called.twice.withArgs

### to.be.called.thrice / to.be.calledThrice

### to.be.called.thrice.withArgs

### always.to.be.called.withArgs / alwaysCalledWith

### neverCalledWith

### calledWithExactly

### alwaysCalledWithExactly

### always.to.be.called.match / alwaysCalledWithMatch

### neverCalledWithMatch

### to.be.returned

### always.to.be.returned

### to.be.threw

### always.to.be.Threw / to.be.alwaysThrew

## Running tests 

Install dependencies

```
$ make install
```

### Node

```
$ make test-node
```

### Browser

```
$ make test-browser
```

## License

MIT

Copyright (c) 2012 Gao Haoliang <<sakura9515@gmail.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.