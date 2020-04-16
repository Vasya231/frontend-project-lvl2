import _ from 'lodash';

const nestedOffset = 4;
const prefixLength = 2;

const prefixes = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value.toString();
  }
  const keys = Object.keys(value);
  const closingQuoteStr = `${' '.repeat(depth * nestedOffset)}}`;
  const nestedOffsetStr = ' '.repeat((depth + 1) * nestedOffset - prefixLength);
  const props = keys.map((key) => `${prefixes.unchanged}${key}: ${stringify(value[key], depth + 1)}`);
  const movedProps = props.map((str) => `${nestedOffsetStr}${str}`).join('\n');
  return ['{', movedProps, closingQuoteStr].join('\n');
};


const renderNodes = (nodes, depth) => {
  const namesOffset = ' '.repeat((depth + 1) * nestedOffset - prefixLength);
  const indentedClosingQuote = `${' '.repeat(depth * nestedOffset)}}`;
  const renderedNodes = nodes.map((node) => {
    const { name, type } = node;
    switch (type) {
      case 'added':
      case 'removed':
      case 'unchanged': {
        const { value } = node;
        return `${namesOffset}${prefixes[type]}${name}: ${stringify(value, depth + 1)}`;
      }
      case 'changed': {
        const { valueBefore, valueAfter } = node;
        const strForRemoved = `${namesOffset}${prefixes.removed}${name}: ${stringify(valueBefore, depth + 1)}`;
        const strForAdded = `${namesOffset}${prefixes.added}${name}: ${stringify(valueAfter, depth + 1)}`;
        return `${strForRemoved}\n${strForAdded}`;
      }
      case 'complex': return `${namesOffset}  ${name}: ${renderNodes(node.children, depth + 1)}`;
      default: throw new Error(`Unexpected node type: ${node.type}`);
    }
  });
  return ['{', ...renderedNodes, indentedClosingQuote].join('\n');
};

export default (nodes) => renderNodes(nodes, 0);
