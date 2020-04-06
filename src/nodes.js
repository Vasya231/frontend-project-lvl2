import _ from 'lodash';

const createSimpleNode = (name, type, value) => ({
  name,
  type,
  value,
});

const isObject = (value) => (
  ((value instanceof Object) && !(value instanceof Array))
);

const createSingleSourceNode = (name, type, value) => {
  if (!isObject(value)) {
    return createSimpleNode(name, type, value);
  }
  const entries = Object.entries(value);
  const children = entries.reduce(
    (acc, [key, val]) => [...acc, (isObject(val) ? createSingleSourceNode(key, 'regular', val)
      : createSimpleNode(key, 'regular', val))],
    [],
  );
  return {
    name,
    type,
    children,
  };
};

const createDiffNodes = (name, valueBefore, valueAfter) => {
  const branchBefore = (valueBefore !== undefined) ? createSingleSourceNode(name, 'deleted', valueBefore) : [];
  const branchAfter = (valueAfter !== undefined) ? createSingleSourceNode(name, 'added', valueAfter) : [];
  return _.flatten([branchBefore, branchAfter]);
};

const createDualSourceNode = (name, objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);
  const children = allKeys.reduce(
    (acc, key) => {
      const valueBefore = objBefore[key];
      const valueAfter = objAfter[key];
      if (isObject(valueBefore) && isObject(valueAfter)) {
        return [...acc, createDualSourceNode(key, valueBefore, valueAfter)];
      }
      if (valueBefore === valueAfter) {
        return [...acc, createSingleSourceNode(key, 'regular', valueBefore)];
      }
      return [...acc, ...createDiffNodes(key, valueBefore, valueAfter)];
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
