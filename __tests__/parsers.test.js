import getParser from '../src/parsers.js';

const json1 = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;

const yaml1 = `host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false`;

const ini1 = `host = hexlet.io
timeout = 50
proxy = 123.234.53.22
follow = false`;

const expected1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('json', () => {
  const parser = getParser('json');
  expect(parser.parse(json1)).toEqual(expected1);
});

test('yaml', () => {
  const parser = getParser('yaml');
  expect(parser.parse(yaml1)).toEqual(expected1);
});

test('ini', () => {
  const parser = getParser('ini');
  expect(parser.parse(ini1)).toEqual(expected1);
});
