import * as fs from 'fs';
import genDiff from '../src/index';

const pathToFixture = (filename) => `${__dirname}/fixtures/${filename}`;

const expectedData = {};

beforeAll(() => {
  expectedData.plain = fs.readFileSync(pathToFixture('resultPlain.txt'), 'utf8');
  expectedData.json = fs.readFileSync(pathToFixture('resultJsonFormat.txt'), 'utf8');
  expectedData.pretty = fs.readFileSync(pathToFixture('resultPretty.txt'), 'utf8');
});

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('%s', (extension) => {
  const before = pathToFixture(`before.${extension}`);
  const after = pathToFixture(`after.${extension}`);
  expect(genDiff(before, after, 'pretty')).toEqual(expectedData.pretty);
  expect(genDiff(before, after, 'plain')).toEqual(expectedData.plain);
  expect(genDiff(before, after, 'json')).toEqual(expectedData.json);
});
