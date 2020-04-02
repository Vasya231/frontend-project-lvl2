all: install

install: 
	npm install

start:
	node bin/sandbox.js

publish:
	npm publish --dry-run

build:
	rm -rf dist
	npx babel src --out-dir dist --source-maps inline

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

test:
	npm test

coverage:
	npm test --coverage