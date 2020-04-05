import * as fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import createNode from './nodes';

const generateDiffList = (objBefore, objAfter) => createNode('', objBefore, objAfter);


const render = (diffObj) => diffObj.render(-2, 4);

const getFormat = (pathToFile) => {
  const extName = path.extname(pathToFile);
  if (extName === '.json') return 'json';
  if (extName === '.yml') return 'yaml';
  if (extName === '.ini') return 'ini';
  return null;
};


const genDiff = (pathToFile1, pathToFile2) => {
  const firstConfigFullPath = path.resolve(process.cwd(), pathToFile1);
  const secondConfigFullPath = path.resolve(process.cwd(), pathToFile2);
  const fileData1 = fs.readFileSync(firstConfigFullPath, 'utf8');
  const fileData2 = fs.readFileSync(secondConfigFullPath, 'utf8');
  const { parse } = getParser(getFormat(firstConfigFullPath));
  const objBefore = parse(fileData1);
  const objAfter = parse(fileData2);
  const diffObj = generateDiffList(objBefore, objAfter);
  const diffText = render(diffObj);
  return diffText.join('\n');
};

export default genDiff;
