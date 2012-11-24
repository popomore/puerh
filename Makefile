download:
	curl -o lib/vendor/expect.js https://raw.github.com/popomore/expect.js/0.2.0/expect.js
	curl -o lib/vendor/sinon.js http://sinonjs.org/releases/sinon-1.5.0.js
	curl -o assets/mocha.css https://raw.github.com/visionmedia/mocha/1.7.0/mocha.css
	curl -o assets/mocha.js https://raw.github.com/visionmedia/mocha/1.7.0/mocha.js

test: test-node

test-node:
	@./node_modules/.bin/mocha
