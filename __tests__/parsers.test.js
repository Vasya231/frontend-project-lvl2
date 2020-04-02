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

test('json', () => {
  const parser = getParser('json');
  expect(parser.parse(json1)).toEqual(jsonExpected1);
});
