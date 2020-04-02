all: install

install: 
	npm ci

start:
	node dist/bin/gendiff.js

publish:
	npm publish --dry-run

build:
	npm run build

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

test:
	npm test

coverage:
	npx jest --coverage