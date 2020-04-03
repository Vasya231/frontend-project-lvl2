import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers.js';

const generateDiffList = (objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);
  // const changedKeys = allKeys.filter((key) => (objBefore[key] !== objAfter[key]));
  return allKeys.reduce(
    (acc, key) => ([
      ...acc,
      { key, before: objBefore[key], after: objAfter[key] },
    ]),
    [],
  );
};

const generateText = (diffObj) => {
  const log = diffObj.reduce(
    (acc, { key, before, after }) => {
      if (before === after) return [...acc, `  ${key}: ${before}`];
      const remLog = (before !== undefined) ? [`- ${key}: ${before}`] : [];
      const addLog = (after !== undefined) ? [`+ ${key}: ${after}`] : [];
      return acc.concat(remLog, addLog);
    },
    [],
  );
  return ['{', ...log, '}'];
};

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
  const diffText = generateText(diffObj);
  return diffText.join('\n');
};

export default genDiff;
