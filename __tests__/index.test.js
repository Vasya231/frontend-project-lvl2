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
  expectedData.plainFormat = fs.readFileSync(pathToFixture('resultPlain.txt'), 'utf8');
  expectedData.jsonFormat = fs.readFileSync(pathToFixture('resultJsonFormat.txt'), 'utf8');
  expectedData.prettyFormat = fs.readFileSync(pathToFixture('resultPretty.txt'), 'utf8');
});

describe('Test pretty formatting', () => {
  test.each([
    ['test yml', beforeYml, afterYml],
    ['test json', beforeJson, afterJson],
    ['test ini', beforeIni, afterIni],
  ])('%s', (testname, before, after) => {
    expect(genDiff(before, after, 'pretty')).toEqual(expectedData.prettyFormat);
  });
});

describe('Test plain formatting', () => {
  test.each([
    ['test yml', beforeYml, afterYml],
    ['test json', beforeJson, afterJson],
    ['test ini', beforeIni, afterIni],
  ])('%s', (testname, before, after) => {
    expect(genDiff(before, after, 'plain')).toEqual(expectedData.plainFormat);
  });
});

describe('Test json formatting', () => {
  test.each([
    ['test yml', beforeYml, afterYml],
    ['test json', beforeJson, afterJson],
    ['test ini', beforeIni, afterIni],
  ])('%s', (testname, before, after) => {
    expect(genDiff(before, after, 'json')).toEqual(expectedData.jsonFormat);
  });
});
