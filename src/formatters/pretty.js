import _ from 'lodash';

const nestedOffset = 4;
const prefixLength = 2;

const prefixes = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const displayValue = (value, nestingDepth) => {
  if (!_.isPlainObject(value)) {
    return value.toString();
  }
  const keys = Object.keys(value);
  const closingQuoteStr = `${' '.repeat(nestingDepth * nestedOffset)}}`;
  const nestedOffsetStr = ' '.repeat((nestingDepth + 1) * nestedOffset - prefixLength);
  const props = keys.map((key) => `${prefixes.unchanged}${key}: ${displayValue(value[key], nestingDepth + 1)}`);
  const movedProps = props.map((str) => `${nestedOffsetStr}${str}`).join('\n');
  return ['{', movedProps, closingQuoteStr].join('\n');
};


const renderNodes = (nodes, nestingDepth) => {
  const namesOffsetStr = ' '.repeat((nestingDepth + 1) * nestedOffset - prefixLength);
  const closingQuoteStr = `${' '.repeat(nestingDepth * nestedOffset)}}`;
  const renderedNodes = nodes.map((node) => {
    const { name, type } = node;
    switch (type) {
      case 'added':
      case 'removed':
      case 'unchanged': {
        const { value } = node;
        return `${namesOffsetStr}${prefixes[type]}${name}: ${displayValue(value, nestingDepth + 1)}`;
      }
      case 'changed': {
        const { valueBefore, valueAfter } = node;
        const strForRemoved = `${namesOffsetStr}${prefixes.removed}${name}: ${displayValue(valueBefore, nestingDepth + 1)}`;
        const strForAdded = `${namesOffsetStr}${prefixes.added}${name}: ${displayValue(valueAfter, nestingDepth + 1)}`;
        return `${strForRemoved}\n${strForAdded}`;
      }
      case 'complex': return `${namesOffsetStr}  ${name}: ${renderNodes(node.children, nestingDepth + 1)}`;
      default: throw new Error(`Unexpected node type: ${node.type}`);
    }
  });
  return ['{', ...renderedNodes, closingQuoteStr].join('\n');
};

export default (nodes) => renderNodes(nodes, 0);
