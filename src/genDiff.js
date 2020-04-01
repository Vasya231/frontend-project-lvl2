import * as fs from 'fs';
import _ from 'lodash';

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
  return ['{', log, '}'];
};


const genDiff = (pathToFile1, pathToFile2) => {
  const fileData1 = fs.readFileSync(pathToFile1, 'utf8');
  const fileData2 = fs.readFileSync(pathToFile2, 'utf8');
  const obj1 = JSON.parse(fileData1);
  const obj2 = JSON.parse(fileData2);
  const diffObj = generateDiffList(obj1, obj2);
  const diffText = generateText(diffObj);
  return diffText.join('\n');
};

export default genDiff;
