import _ from 'lodash';


const render = (node, path = '') => {
  const {
    name, type, children,
    removed, added, value,
  } = node;
  if (type === 'dualSource') {
    return children
      .map((child) => render(child, name ? path.concat(`${name}.`) : path))
      .filter((mappedChild) => mappedChild)
      .join('\n');
  }
  switch (type) {
    case 'added': {
      const addedValueText = (_.isObject(value)) ? '[complex value]' : `'${value}'`;
      return `Property '${path}${name}' was added with value: ${addedValueText}`;
    }
    case 'removed': return `Property '${path}${name}' was deleted`;
    case 'changed': {
      const deletedValueText = (_.isObject(removed)) ? '[complex value]' : `'${removed}'`;
      const addedValueText = (_.isObject(added)) ? '[complex value]' : `'${added}'`;
      return `Property '${path}${name}' was changed from ${deletedValueText} to ${addedValueText}`;
    }
    case 'equal': return '';
    default: throw new Error(`Unexpected node type: ${type}`);
  }
};

export default render;
