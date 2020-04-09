import _ from 'lodash';

const createSimpleNode = (name, type, value) => ({
  name,
  type,
  value,
});

const createDiffNode = (name, valueBefore, valueAfter) => ({
  name,
  type: 'changed',
  removed: valueBefore,
  added: valueAfter,
});

const createDualSourceNode = (name, objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const addedKeys = keysAfter.filter((key) => !keysBefore.includes(key));
  const removedKeys = keysBefore.filter((key) => !keysAfter.includes(key));
  const commonKeys = _.intersection(keysBefore, keysAfter);
  const objectKeys = commonKeys.filter(
    (key) => (_.isPlainObject(objBefore[key]) && (_.isPlainObject(objAfter[key]))),
  );
  const valueKeys = _.without(commonKeys, ...objectKeys);
  const addedChildren = addedKeys.map(
    (key) => createSimpleNode(key, 'added', objAfter[key]),
  );
  const removedChildren = removedKeys.map(
    (key) => createSimpleNode(key, 'removed', objBefore[key]),
  );
  const objectChildren = objectKeys.map(
    (key) => createDualSourceNode(key, objBefore[key], objAfter[key]),
  );
  const valueChildren = valueKeys.map(
    (key) => (objBefore[key] === objAfter[key]
      ? createSimpleNode(key, 'equal', objBefore[key])
      : createDiffNode(key, objBefore[key], objAfter[key])),
  );
  return {
    name,
    type: 'dualSource',
    children: [...addedChildren, ...removedChildren, ...objectChildren, ...valueChildren],
  };
};


export default createDualSourceNode;
