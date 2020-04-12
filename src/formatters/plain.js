const render = (nodes, path = '') => {
  const renderNode = (node, innerPath) => {
    const { name, type } = node;
    switch (type) {
      case 'complex': {
        const { children } = node;
        return render(children, `${innerPath}${name}.`);
      }
      case 'added': {
        const { value } = node;
        const addedValueText = (typeof value === 'object') ? '[complex value]' : `'${value}'`;
        return `Property '${innerPath}${name}' was added with value: ${addedValueText}`;
      }
      case 'removed': return `Property '${innerPath}${name}' was deleted`;
      case 'changed': {
        const { valueBefore, valueAfter } = node;
        const deletedValueText = (typeof valueBefore === 'object') ? '[complex value]' : `'${valueBefore}'`;
        const addedValueText = (typeof valueAfter === 'object') ? '[complex value]' : `'${valueAfter}'`;
        return `Property '${innerPath}${name}' was changed from ${deletedValueText} to ${addedValueText}`;
      }
      case 'unchanged': return '';
      default: throw new Error(`Unexpected node type: ${type}`);
    }
  };

  return nodes
    .map((node) => renderNode(node, path))
    .filter((renderedNode) => renderedNode)
    .join('\n');
};

export default (nodes) => render(nodes);
