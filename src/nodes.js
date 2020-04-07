import _ from 'lodash';

const createSimpleNode = (name, type, value) => ({
  name,
  type,
  value,
});

const createSingleSourceNode = (name, type, value) => {
  if (!_.isPlainObject(value)) {
    return createSimpleNode(name, type, value);
  }
  const entries = Object.entries(value);
  const children = entries.reduce(
    (acc, [key, val]) => [...acc, (_.isPlainObject(val) ? createSingleSourceNode(key, 'regular', val)
      : createSimpleNode(key, 'regular', val))],
    [],
  );
  return {
    name,
    type,
    children,
  };
};

const createDiffNode = (name, valueBefore, valueAfter) => {
  const branchBefore = (valueBefore !== undefined) ? createSingleSourceNode(name, 'deleted', valueBefore) : undefined;
  const branchAfter = (valueAfter !== undefined) ? createSingleSourceNode(name, 'added', valueAfter) : undefined;
  return {
    name,
    type: 'diff',
    before: branchBefore,
    after: branchAfter,
  };
};

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
        return [...acc, createSingleSourceNode(key, 'regular', valueBefore)];
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
