import _ from 'lodash';

const prefixes = {
  added: '+ ',
  deleted: '- ',
  regular: '  ',
};

const getPrefix = (type) => prefixes[type];

const render = (diffObj, currentPos, offsetInc = 4) => {
  const {
    name, children, value, type,
  } = diffObj;
  if (type === 'diff') {
    const { before: nodeBefore, after: nodeAfter } = diffObj;
    const strBefore = nodeBefore ? render(nodeBefore, currentPos, offsetInc) : [];
    const strAfter = nodeAfter ? render(nodeAfter, currentPos, offsetInc) : [];
    return _.flatten([strBefore, strAfter]).join('\n');
  }
  const offsetStr = ' '.repeat(currentPos > 0 ? currentPos : 0);
  const prefix = getPrefix(type);
  const nameStr = name ? `${offsetStr}${prefix}${name}: ` : '';
  if (value !== undefined) return nameStr.concat(`${value}`);
  const childrenStr = children.reduce(
    (acc, child) => acc.concat('\n', render(child, currentPos + offsetInc, offsetInc)),
    '',
  );
  const closingStr = name ? `${offsetStr}  }` : '}';
  return nameStr.concat(
    '{',
    childrenStr,
    '\n',
    closingStr,
  );
};

export default render;
