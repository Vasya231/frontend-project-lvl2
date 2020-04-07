import _ from 'lodash';


const render = (node, path = '') => {
  const {
    name, type, children,
  } = node;
  if (type === 'diff') {
    const { before: nodeBefore, after: nodeAfter } = node;
    if (!nodeBefore) {
      const addedValue = (_.isObject(nodeAfter.value) || _.has(nodeAfter, 'children')) ? '[complex value]' : `'${nodeAfter.value}'`;
      return [`Property '${path}${nodeAfter.name}' was added with value: ${addedValue}`];
    }
    if (!nodeAfter) {
      return [`Property '${path}${nodeBefore.name}' was deleted`];
    }
    const addedValue = (_.isObject(nodeAfter.value) || _.has(nodeAfter, 'children')) ? '[complex value]' : `'${nodeAfter.value}'`;
    const deletedValue = (_.isObject(nodeBefore.value) || _.has(nodeBefore, 'children')) ? '[complex value]' : `'${nodeBefore.value}'`;
    return [`Property '${path}${name}' was changed from ${deletedValue} to ${addedValue}`];
  }
  if (children) {
    return children
      .map((child) => render(child, name ? path.concat(`${name}.`) : path))
      .filter((child) => child)
      .join('\n');
  }
  return '';
};

export default render;
