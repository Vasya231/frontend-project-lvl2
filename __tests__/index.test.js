import * as fs from 'fs';
import genDiff from '../src/index';

const pathToFixture = (filename) => `${__dirname}/fixtures/${filename}`;

const beforeEmpty = pathToFixture('beforeEmpty.json');
const afterEmpty = pathToFixture('afterEmpty.json');
const expectedEmpty = pathToFixture('resultEmpty.txt');

const beforeYml = pathToFixture('before.yml');
const afterYml = pathToFixture('after.yml');
const expectedYml = pathToFixture('resultYml.txt');

const beforeJson = pathToFixture('before.json');
const afterJson = pathToFixture('after.json');
const expectedJson = pathToFixture('resultJson.txt');

const beforeIni = pathToFixture('before.ini');
const afterIni = pathToFixture('after.ini');
const expectedIni = pathToFixture('resultIni.txt');

const expectedPlainFormat = pathToFixture('resultPlain.txt');
const expectedJsonFormat = pathToFixture('resultJsonFormat.txt');

test.each([
  ['test empty', beforeEmpty, afterEmpty, expectedEmpty],
  ['test yml', beforeYml, afterYml, expectedYml],
  ['test json', beforeJson, afterJson, expectedJson],
  ['test ini', beforeIni, afterIni, expectedIni],
])('%s', (testname, before, after, expected) => {
  const expectedData = fs.readFileSync(expected, 'utf8');
  expect(genDiff(before, after)).toEqual(expectedData);
});

test.each([
  ['test plain formatting', beforeJson, afterJson, expectedPlainFormat, 'plain'],
  ['test json formatting', beforeJson, afterJson, expectedJsonFormat, 'json'],
])('%s', (testname, before, after, expected, format) => {
  const expectedData = fs.readFileSync(expected, 'utf8');
  expect(genDiff(before, after, format)).toEqual(expectedData);
});