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

### not.to

### to.be.spy

### to.be.called

### to.be.called.with

### always.to.be.called.with

### to.be.called.match

### always.to.be.called.match

### to.be.called.once

### to.be.called.once.with

### to.be.called.twice

### to.be.called.twice.with

### to.be.called.thrice

### to.be.called.thrice.with

### to.be.called.count

### to.be.called.before

### to.be.called.after

### to.be.called.on

### always.to.be.called.on

### to.be.returned

### always.to.be.returned


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