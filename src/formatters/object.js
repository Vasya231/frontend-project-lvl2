import _ from 'lodash';

const offsetInc = 4;
const prefixLength = 2;

const displayValue = (value, offset) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const offsetStr = ' '.repeat(offset + prefixLength);
  const nextOffset = offset + offsetInc;
  const nestedOffsetStr = ' '.repeat(nextOffset + prefixLength);
  const props = keys.map((key) => `${key}: ${displayValue(value[key], nextOffset)}`);
  const movedProps = props.map((str) => nestedOffsetStr.concat(str)).join('\n');
  return '{\n'.concat(movedProps, '\n', offsetStr, '}');
};

const renderDualSourceNode = (diffObj, currentPos) => {
  const { name, children } = diffObj;
  const nestedPos = currentPos + offsetInc;
  const regularPrefix = ' '.repeat(currentPos > 0 ? currentPos : 0).concat('  ');
  const prefixForClosingQuote = ' '.repeat(currentPos + prefixLength);
  const nestedPrefix = ' '.repeat(nestedPos);
  const childrenStr = children.reduce(
    (acc, child) => {
      switch (child.type) {
        case 'added': return acc.concat('\n', `${nestedPrefix}+ ${child.name}: ${displayValue(child.value, nestedPos)}`);
        case 'removed': return acc.concat('\n', `${nestedPrefix}- ${child.name}: ${displayValue(child.value, nestedPos)}`);
        case 'changed': return acc
          .concat('\n', `${nestedPrefix}- ${child.name}: ${displayValue(child.removed, nestedPos)}`)
          .concat('\n', `${nestedPrefix}+ ${child.name}: ${displayValue(child.added, nestedPos)}`);
        case 'equal': return acc.concat('\n', `${nestedPrefix}  ${child.name}: ${displayValue(child.value, nestedPos)}`);
        case 'dualSource': return acc.concat('\n', renderDualSourceNode(child, nestedPos));
        default: throw new Error(`Unexpected node type: ${child.type}`);
      }
    },
    '',
  );
  const nameStr = name ? regularPrefix.concat(name, ': ') : '';
  return nameStr.concat('{', childrenStr, '\n', prefixForClosingQuote, '}');
};

export default renderDualSourceNode;
