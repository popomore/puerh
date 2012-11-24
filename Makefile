test: test-node test-browser

install:
	@echo "start install"
	rm -rf support
	mkdir support
	rm -rf lib/vendor/sinon.js
	curl -o lib/vendor/sinon.js http://sinonjs.org/releases/sinon-1.5.0.js
	npm install
	ln -s ../node_modules/mocha/mocha.css support/mocha.css
	ln -s ../node_modules/mocha/mocha.js support/mocha.js

test-node:
	@echo "start test node"
	@./node_modules/.bin/mocha

test-browser:
	@echo "start test browser"
	@./node_modules/.bin/mocha-phantomjs test/runner.html

build:
	@cat lib/vendor/expect.js lib/puerh.js > puerh.js
