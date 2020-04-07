import _ from 'lodash';


const render = (node, path = '') => {
  const {
    name, type, children,
  } = node;
  if (type === 'diff') {
    const { deleted, added } = node;
    const addedValueText = (_.isObject(added)) ? '[complex value]' : `'${added}'`;
    const deletedValueText = (_.isObject(deleted)) ? '[complex value]' : `'${deleted}'`;
    if (!deleted) {
      return [`Property '${path}${name}' was added with value: ${addedValueText}`];
    }
    if (!added) {
      return [`Property '${path}${name}' was deleted`];
    }
    
    return [`Property '${path}${name}' was changed from ${deletedValueText} to ${addedValueText}`];
  }
  if (children) {
    return children
      .map((child) => render(child, name ? path.concat(`${name}.`) : path))
      .filter((mappedChild) => mappedChild)
      .join('\n');
  }
  return '';
};

export default render;
