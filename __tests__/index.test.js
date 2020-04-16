import * as fs from 'fs';
import genDiff from '../src/index';

const pathToFixture = (filename) => `${__dirname}/fixtures/${filename}`;

const beforeYml = pathToFixture('before.yml');
const afterYml = pathToFixture('after.yml');

const beforeJson = pathToFixture('before.json');
const afterJson = pathToFixture('after.json');

const beforeIni = pathToFixture('before.ini');
const afterIni = pathToFixture('after.ini');

const expectedData = {};

beforeAll(() => {
  expectedData.plain = fs.readFileSync(pathToFixture('resultPlain.txt'), 'utf8');
  expectedData.json = fs.readFileSync(pathToFixture('resultJsonFormat.txt'), 'utf8');
  expectedData.pretty = fs.readFileSync(pathToFixture('resultPretty.txt'), 'utf8');
});

test.each([
  ['plain'],
  ['pretty'],
  ['json'],
])('%s', (expectedFormat) => {
  const expected = expectedData[expectedFormat];
  expect(genDiff(beforeJson, afterJson, expectedFormat)).toEqual(expected);
  expect(genDiff(beforeYml, afterYml, expectedFormat)).toEqual(expected);
  expect(genDiff(beforeIni, afterIni, expectedFormat)).toEqual(expected);
});
