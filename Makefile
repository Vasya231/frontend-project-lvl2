all: install

install: 
	npm install

start:
	node bin/sandbox.js

publish:
	npm publish --dry-run

build:
  npx babel src --out-dir dist

lint:
	npx eslint .

lintfix:
	npx eslint . --fix