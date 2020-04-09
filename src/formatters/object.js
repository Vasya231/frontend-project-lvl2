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

const renderSimpleNode = (node, currentPos, prefix) => {
  const prefixStr = ' '.repeat(currentPos).concat(prefix, ' ');
  // console.log(`rendering ${node.type} node with name ${node.name} and value ${node.value}`);
  return `${prefixStr}${node.name}: ${displayValue(node.value, currentPos)}`;
};

const renderNodeAsAdded = (node, currentPos) => renderSimpleNode(node, currentPos, '+');

const renderNodeAsRemoved = (node, currentPos) => renderSimpleNode(node, currentPos, '-');

const renderEqualNode = (node, currentPos) => renderSimpleNode(node, currentPos, ' ');

const renderDiffNode = (node, currentPos) => {
  const added = renderNodeAsAdded({ ...node, value: node.added }, currentPos);
  const removed = renderNodeAsRemoved({ ...node, value: node.removed }, currentPos);
  return `${removed}${'\n'}${added}`;
};

const renderDualSourceNode = (diffObj, currentPos) => {
  const { name, children } = diffObj;
  const nestedPos = currentPos + offsetInc;
  const regularPrefix = ' '.repeat(currentPos > 0 ? currentPos : 0).concat('  ');
  const prefixForClosingQuote = ' '.repeat(currentPos + prefixLength);
  const childrenStr = children.reduce(
    (acc, child) => {
      switch (child.type) {
        case 'added': return acc.concat('\n', renderNodeAsAdded(child, nestedPos));
        case 'removed': return acc.concat('\n', renderNodeAsRemoved(child, nestedPos));
        case 'changed': return acc.concat('\n', renderDiffNode(child, nestedPos));
        case 'equal': return acc.concat('\n', renderEqualNode(child, nestedPos));
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
