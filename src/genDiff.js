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
  return null;
};


const genDiff = (pathToFile1, pathToFile2) => {
  const fileData1 = fs.readFileSync(pathToFile1, 'utf8');
  const fileData2 = fs.readFileSync(pathToFile2, 'utf8');
  const parser = getParser(getFormat(pathToFile1));
  const obj1 = parser.parse(fileData1);
  const obj2 = parser.parse(fileData2);
  const diffObj = generateDiffList(obj1, obj2);
  const diffText = generateText(diffObj);
  return diffText.join('\n');
};

export default genDiff;
