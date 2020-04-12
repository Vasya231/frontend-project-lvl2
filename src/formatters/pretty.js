import _ from 'lodash';

const offsetInc = 4;
const prefixLength = 2;

const displayValue = (value, nestingDepth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const closingQuoteStr = `${' '.repeat(nestingDepth * offsetInc)}}`;
  const nestedOffsetStr = ' '.repeat((nestingDepth + 1) * offsetInc - prefixLength);
  const props = keys.map((key) => `  ${key}: ${displayValue(value[key], nestingDepth + 1)}`);
  const movedProps = props.map((str) => `${nestedOffsetStr}${str}`).join('\n');
  return ['{', movedProps, closingQuoteStr].join('\n');
};

const renderNodes = (nodes, nestingDepth = 0) => {
  const namesOffsetStr = ' '.repeat((nestingDepth + 1) * offsetInc - prefixLength);
  const closingQuoteStr = `${' '.repeat(nestingDepth * offsetInc)}}`;
  const renderedNodes = nodes.map((node) => {
    const { name, type } = node;
    switch (type) {
      case 'added': {
        const { value } = node;
        return `${namesOffsetStr}+ ${name}: ${displayValue(value, nestingDepth + 1)}`;
      }
      case 'removed': {
        const { value } = node;
        return `${namesOffsetStr}- ${name}: ${displayValue(value, nestingDepth + 1)}`;
      }
      case 'unchanged': {
        const { value } = node;
        return `${namesOffsetStr}  ${name}: ${displayValue(value, nestingDepth + 1)}`;
      }
      case 'changed': {
        const { valueBefore, valueAfter } = node;
        const strForRemoved = `${namesOffsetStr}- ${name}: ${displayValue(valueBefore, nestingDepth + 1)}`;
        const strForAdded = `${namesOffsetStr}+ ${name}: ${displayValue(valueAfter, nestingDepth + 1)}`;
        return `${strForRemoved}\n${strForAdded}`;
      }
      case 'complex': return `${namesOffsetStr}  ${name}: ${renderNodes(node.children, nestingDepth + 1)}`;
      default: throw new Error(`Unexpected node type: ${node.type}`);
    }
  });
  return ['{', ...renderedNodes, closingQuoteStr].join('\n');
};

export default (nodes) => renderNodes(nodes, 0);
