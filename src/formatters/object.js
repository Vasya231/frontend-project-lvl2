import _ from 'lodash';

const offsetInc = 4;
const prefixLength = 2;

const displayValue = (value, offset) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const offsetStr = ' '.repeat(offset);
  const nextOffset = offset + offsetInc;
  const nestedOffsetStr = ' '.repeat(nextOffset + prefixLength);
  const props = keys.map((key) => `${key}: ${displayValue(value[key], nextOffset)}`);
  const movedProps = props.map((str) => nestedOffsetStr.concat(str)).join('\n');
  return '{\n'.concat(movedProps, '\n', offsetStr, '  }');
};

const render = (diffObj, currentPos) => {
  const { children, value } = diffObj;
  if (_.has(diffObj, 'value')) {
    return displayValue(value, currentPos);
  }
  const regularPrefix = ' '.repeat(currentPos + offsetInc).concat('  ');
  const prefixForAdded = ' '.repeat(currentPos + offsetInc).concat('+ ');
  const prefixForDeleted = ' '.repeat(currentPos + offsetInc).concat('- ');
  const childrenStr = children.reduce(
    (acc, child) => {
      const nameStr = `${child.name}: `;
      if (child.type !== 'diff') {
        return acc.concat('\n', regularPrefix, nameStr, render(child, currentPos + offsetInc));
      }
      const addedStr = (child.added !== undefined) ? '\n'.concat(prefixForAdded, nameStr, displayValue(child.added, currentPos + offsetInc)) : '';
      const deletedStr = (child.deleted !== undefined) ? '\n'.concat(prefixForDeleted, nameStr, displayValue(child.deleted, currentPos + offsetInc)) : '';
      return acc.concat(deletedStr, addedStr);
    },
    '',
  );
  return '{'.concat(childrenStr, '\n', ' '.repeat(currentPos + prefixLength), '}');
};

export default render;
