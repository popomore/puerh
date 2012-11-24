install:
	rm -rf support lib/vendor
	mkdir support lib/vendor
	npm install
	ln -s ../node_modules/mocha/mocha.css support/mocha.css
	ln -s ../node_modules/mocha/mocha.js support/mocha.js
	curl -o lib/vendor/expect.js https://raw.github.com/popomore/expect.js/0.2.0/expect.js
	curl -o lib/vendor/sinon.js http://sinonjs.org/releases/sinon-1.5.0.js

test: install test-node

test-node:
	@./node_modules/.bin/mocha
