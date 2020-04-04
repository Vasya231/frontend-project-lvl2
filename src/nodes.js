import _ from 'lodash';

function simpleRender(offset) {
  return [`${' '.repeat(offset)}${this.prefix}${this.name}: ${this.value}`];
}

function objectRender(offset) {
  const offsetStr = ' '.repeat(offset);
  const openingStr = this.name ? `${this.prefix}${this.name}: {` : '{';
  const endingStr = '}';
  const midStrs = this.children.reduce(
    (acc, childNode) => [...acc, ...childNode.render(offset + 2)],
    [],
  );
  return [offsetStr.concat(openingStr), ...midStrs, offsetStr.concat(endingStr)];
}

const createSimpleNode = (name, prefix, value) => ({
  name,
  prefix,
  value,
  render: simpleRender,
});

const isObject = (value) => (
  ((value instanceof Object) && !(value instanceof Array))
);

const createObjectNode = (name, prefix, objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);
  const children = allKeys.reduce(
    (acc, key) => {
      const valueBefore = _.get(objBefore, key);
      const valueAfter = _.get(objAfter, key);
      if (!isObject(valueBefore) && (valueBefore === valueAfter)) {
        return [...acc, createSimpleNode(key, '  ', valueBefore)];
      }
      if (!isObject(valueBefore) && (valueBefore !== undefined)) {
        acc.push(createSimpleNode(key, '- ', valueBefore));
      }
      if (isObject(valueBefore) && !isObject(valueAfter)) {
        acc.push(createObjectNode(key, '  ', valueBefore, {}));
      }
      if (isObject(valueBefore) && isObject(valueAfter)) {
        return [...acc, createObjectNode(key, '  ', valueBefore, valueAfter)];
      }
      if (!isObject(valueAfter) && (valueAfter !== undefined)) {
        return [...acc, createSimpleNode(key, '+ ', valueAfter)];
      }
      if (isObject(valueAfter)) {
        return [...acc, createObjectNode(key, '+ ', {}, valueAfter)];
      }
      return acc;
    },
    [],
  );
  return {
    name,
    prefix,
    children,
    render: objectRender,
  };
};


export default createObjectNode;
