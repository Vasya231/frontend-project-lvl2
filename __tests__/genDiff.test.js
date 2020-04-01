import genDiff from '../src/genDiff.js';

const before1 = `${__dirname}/fixtures/before1.json`;
const after1 = `${__dirname}/fixtures/after1.json`;
const expected1 = [
  '  host: hexlet.io',
  '- timeout: 50',
  '+ timeout: 20',
  '- proxy: 123.234.53.22',
  '- follow: false',
  '+ verbose: true',
];

test('simple', () => {
  const diff1 = genDiff(before1, after1);
  expected1.forEach((str) => expect(diff1).toMatch(str));
});
