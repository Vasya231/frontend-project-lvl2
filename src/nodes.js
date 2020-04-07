import _ from 'lodash';

const createSimpleNode = (name, type, value) => ({
  name,
  type,
  value,
});

const createDiffNode = (name, valueBefore, valueAfter) => ({
  name,
  type: 'diff',
  deleted: valueBefore,
  added: valueAfter,
});

const createDualSourceNode = (name, objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);
  const children = allKeys.reduce(
    (acc, key) => {
      const valueBefore = objBefore[key];
      const valueAfter = objAfter[key];
      if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
        return [...acc, createDualSourceNode(key, valueBefore, valueAfter)];
      }
      if (valueBefore === valueAfter) {
        return [...acc, createSimpleNode(key, 'regular', valueBefore)];
      }
      return [...acc, createDiffNode(key, valueBefore, valueAfter)];
    },
    [],
  );
  return {
    name,
    type: 'regular',
    children,
  };
};


export default createDualSourceNode;
