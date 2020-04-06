import _ from 'lodash';

function simpleRender(currentPosition) {
  return [`${' '.repeat(currentPosition)}${this.type}${this.name}: ${this.value}`];
}

function objectRender(currentPosition, offsetInc = 4) {
  const offsetStr = ' '.repeat(currentPosition > 0 ? currentPosition : 0);
  const openingStr = this.name ? `${this.type}${this.name}: {` : '{';
  const endingStr = (this.name !== '') ? offsetStr.concat('  }') : '}';
  const midStrs = this.children.reduce(
    (acc, childNode) => [...acc, ...childNode.render(currentPosition + offsetInc, offsetInc)],
    [],
  );
  return [offsetStr.concat(openingStr), ...midStrs, endingStr];
}

const createSimpleNode = (name, type, value) => ({
  name,
  type,
  value,
  render: simpleRender,
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
    render: objectRender,
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
      // console.log(`analyzing ${key}:`, valueBefore, valueAfter);
      if (isObject(valueBefore) && isObject(valueAfter)) {
        // console.log('Both objects, proceeding with dual source');
        return [...acc, createDualSourceNode(key, valueBefore, valueAfter)];
      }
      if (valueBefore === valueAfter) {
        // console.log('values equal, creating single source')
        return [...acc, createSingleSourceNode(key, 'regular', valueBefore)];
      }
      // console.log('creating diffs');
      return [...acc, ...createDiffNodes(key, valueBefore, valueAfter)];
    },
    [],
  );
  return {
    name,
    type: 'regular',
    children,
    render: objectRender,
  };
};


export default createDualSourceNode;
