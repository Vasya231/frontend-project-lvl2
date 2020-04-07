import _ from 'lodash';

const createSimpleNode = (name, value) => ({
  name,
  type: 'regular',
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
        return [...acc, createSimpleNode(key, valueBefore)];
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
