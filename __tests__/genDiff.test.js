import genDiff from '../src/genDiff.js';

const before1 = `${__dirname}/fixtures/before1.json`;
const after1 = `${__dirname}/fixtures/after1.json`;
const expected1 = [
  '  host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- follow: false',
  '+ verbose: true',
  /- timeout: 50\n\+ timeout: 20|\+ timeout: 50\n- timeout: 20/,
];
const before2 = `${__dirname}/fixtures/before2.json`;
const after2 = `${__dirname}/fixtures/after2.json`;
const expected2 = '+ host: hexlet.io';

test('one level', () => {
  const diff1 = genDiff(before1, after1);
  expected1.forEach((str) => expect(diff1).toMatch(str));

  const diff2 = genDiff(before2, after2);
  expect(diff2).toMatch(expected2);
});
