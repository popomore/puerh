test: test-node test-browser test-seajs

install:
	@npm install
	@echo "start install"
	@spm install
	@rm -rf support
	@mkdir support
	@rm -rf lib/vendor/sinon.js
	@curl -o lib/vendor/sinon.js http://sinonjs.org/releases/sinon-1.6.0.js
	@curl -o lib/vendor/expect.js https://raw.github.com/popomore/expect.js/0.2.0/expect.js
	@ln -s ../node_modules/mocha/mocha.css support/mocha.css
	@ln -s ../node_modules/mocha/mocha.js support/mocha.js

test-node:
	@echo "start test node"
	@./node_modules/.bin/mocha

test-browser:
	@echo "start test browser"
	@./node_modules/.bin/mocha-phantomjs test/runner.html

test-seajs:
	@echo "start test seajs"
	@./node_modules/.bin/mocha-phantomjs test/runner-seajs.html

build:
	@cat lib/vendor/expect.js lib/puerh.js > puerh.js
	@echo "build normal done"
	@grunt
	@echo "build cmd done"
