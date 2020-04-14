import _ from 'lodash';

const compareObjects = (objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter).sort();
  return allKeys.map((key) => {
    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];
    if (!_.has(objBefore, key)) {
      return { name: key, type: 'added', value: valueAfter };
    }
    if (!_.has(objAfter, key)) {
      return { name: key, type: 'removed', value: valueBefore };
    }
    if (valueBefore === valueAfter) {
      return { name: key, type: 'unchanged', value: valueBefore };
    }
    if (_.isPlainObject(valueBefore) && (_.isPlainObject(valueAfter))) {
      return { name: key, type: 'complex', children: compareObjects(valueBefore, valueAfter) };
    }
    return {
      name: key, type: 'changed', valueBefore, valueAfter,
    };
  });
};

export default compareObjects;
