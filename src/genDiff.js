import * as fs from 'fs';
import path from 'path';
import parse from './parsers';
import createNode from './nodes';
import render from './render';

const generateDiffList = (objBefore, objAfter) => createNode('', objBefore, objAfter);


// const render = (diffObj) => diffObj.render(-2);

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
  const objBefore = parse(getFormat(firstConfigFullPath), fileData1);
  const objAfter = parse(getFormat(secondConfigFullPath), fileData2);
  const diffObj = generateDiffList(objBefore, objAfter);
  const diffText = render(diffObj, -2);
  return diffText;
};

export default genDiff;
