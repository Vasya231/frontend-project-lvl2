import getParser from '../src/parsers.js';

const json1 = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;
const jsonExpected1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const yaml1 = `host: hexlet.io
timeout: 50
format: yaml`;
const yamlExpected1 = {
  host: 'hexlet.io',
  timeout: 50,
  format: 'yaml',
};

test('json', () => {
  const parser = getParser('json');
  expect(parser.parse(json1)).toEqual(jsonExpected1);
});

test('yaml', () => {
  const parser = getParser('yaml');
  expect(parser.parse(yaml1)).toEqual(yamlExpected1);
});
