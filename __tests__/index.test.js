import * as fs from 'fs';
import genDiff from '../src/index';

const pathToFixture = (filename) => `${__dirname}/fixtures/${filename}`;

const beforeEmpty = pathToFixture('beforeEmpty.json');
const afterEmpty = pathToFixture('afterEmpty.json');
const expectedEmpty = pathToFixture('resultEmpty.txt');

const beforeYml = pathToFixture('before.yml');
const afterYml = pathToFixture('after.yml');

const beforeJson = pathToFixture('before.json');
const afterJson = pathToFixture('after.json');

const beforeIni = pathToFixture('before.ini');
const afterIni = pathToFixture('after.ini');
const expectedIni = pathToFixture('resultIni.txt');

const expectedPlainFormat = pathToFixture('resultPlain.txt');
const expectedJsonFormat = pathToFixture('resultJsonFormat.txt');
const expectedPrettyFormat = pathToFixture('resultPretty.txt');

test.each([
  ['test empty', beforeEmpty, afterEmpty, expectedEmpty, 'pretty'],
  ['test yml, plain formatting', beforeYml, afterYml, expectedPlainFormat, 'plain'],
  ['test json, pretty formatting', beforeJson, afterJson, expectedPrettyFormat, 'pretty'],
  ['test ini', beforeIni, afterIni, expectedIni, 'pretty'],
  ['test json formatting', beforeJson, afterJson, expectedJsonFormat, 'json'],
])('%s', (testname, before, after, expected, format) => {
  const expectedData = fs.readFileSync(expected, 'utf8');
  expect(genDiff(before, after, format)).toEqual(expectedData);
});
