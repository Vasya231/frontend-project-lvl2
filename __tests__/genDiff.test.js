import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const pathToFixture = (filename) => `${__dirname}/fixtures/${filename}`;

const beforeFlat = pathToFixture('beforeFlat.json');
const afterFlat = pathToFixture('afterFlat.json');
const expectedFlat = pathToFixture('resultFlat.txt');

const beforeEmpty = pathToFixture('beforeEmpty.json');
const afterEmpty = pathToFixture('afterEmpty.json');
const expectedEmpty = pathToFixture('resultEmpty.txt');

const beforeYml = pathToFixture('before.yml');
const afterYml = pathToFixture('after.yml');
const expectedYml = pathToFixture('resultYml.txt');

test.each([
  ['test flat', beforeFlat, afterFlat, expectedFlat],
  ['test empty', beforeEmpty, afterEmpty, expectedEmpty],
  ['test yml', beforeYml, afterYml, expectedYml],
])('%s', (testname, before, after, expected) => {
  const expectedData = fs.readFileSync(expected, 'utf8');
  expect(genDiff(before, after)).toEqual(expectedData);
});
