all: install

install: 
	npm install

start:
	node bin/sandbox.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

lintfix:
	npx eslint . --fix