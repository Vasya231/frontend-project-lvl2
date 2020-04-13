import * as fs from 'fs';
import path from 'path';
import parse from './parsers';
import compareObjects from './treeBuilder';
import render from './formatters';

const getFormat = (pathToFile) => {
  const extName = path.extname(pathToFile);
  if (extName === '.json') return 'json';
  if (extName === '.yml') return 'yaml';
  if (extName === '.ini') return 'ini';
  throw new Error(`Failed to identify file format: ${pathToFile}`);
};


const genDiff = (pathToFile1, pathToFile2, format = 'pretty') => {
  const firstConfigFullPath = path.resolve(process.cwd(), pathToFile1);
  const secondConfigFullPath = path.resolve(process.cwd(), pathToFile2);
  const fileData1 = fs.readFileSync(firstConfigFullPath, 'utf8');
  const fileData2 = fs.readFileSync(secondConfigFullPath, 'utf8');
  const objBefore = parse(getFormat(firstConfigFullPath), fileData1);
  const objAfter = parse(getFormat(secondConfigFullPath), fileData2);
  const diffs = compareObjects(objBefore, objAfter);
  const diffText = render(diffs, format);
  return diffText;
};

export default genDiff;
