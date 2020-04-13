import * as fs from 'fs';
import genDiff from '../src/index';

const pathToFixture = (filename) => `${__dirname}/fixtures/${filename}`;

const beforeEmpty = pathToFixture('beforeEmpty.json');
const afterEmpty = pathToFixture('afterEmpty.json');

const beforeYml = pathToFixture('before.yml');
const afterYml = pathToFixture('after.yml');

const beforeJson = pathToFixture('before.json');
const afterJson = pathToFixture('after.json');

const beforeIni = pathToFixture('before.ini');
const afterIni = pathToFixture('after.ini');

const expectedData = {};

beforeAll(() => {
  expectedData.empty = fs.readFileSync(pathToFixture('resultEmpty.txt'), 'utf8');
  expectedData.ini = fs.readFileSync(pathToFixture('resultIni.txt'), 'utf8');
  expectedData.plainFormat = fs.readFileSync(pathToFixture('resultPlain.txt'), 'utf8');
  expectedData.jsonFormat = fs.readFileSync(pathToFixture('resultJsonFormat.txt'), 'utf8');
  expectedData.prettyFormat = fs.readFileSync(pathToFixture('resultPretty.txt'), 'utf8');
});

test.each([
  ['test empty', beforeEmpty, afterEmpty, 'empty', 'pretty'],
  ['test yml, plain formatting', beforeYml, afterYml, 'plainFormat', 'plain'],
  ['test json, pretty formatting', beforeJson, afterJson, 'prettyFormat', 'pretty'],
  ['test ini', beforeIni, afterIni, 'ini', 'pretty'],
  ['test json formatting', beforeJson, afterJson, 'jsonFormat', 'json'],
])('%s', (testname, before, after, expected, format) => {
  expect(genDiff(before, after, format)).toEqual(expectedData[expected]);
});
