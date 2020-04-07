import _ from 'lodash';

const render = (diffObj) => {
  const renderWithPath = (path, node) => {
    const {
      name, type, children,
    } = node;
    if (type === 'diff') {
      const { before: nodeBefore, after: nodeAfter } = node;
      if (!nodeBefore) {
        const addedValue = (_.isObject(nodeAfter.value) || _.has(nodeAfter, 'children')) ? '[complex value]' : `'${nodeAfter.value}'`;
        return [`Property '${path}.${nodeAfter.name}' was added with value: ${addedValue}`];
      }
      if (!nodeAfter) {
        return [`Property '${path}.${nodeBefore.name}' was deleted`];
      }
      const addedValue = (_.isObject(nodeAfter.value) || _.has(nodeAfter, 'children')) ? '[complex value]' : `'${nodeAfter.value}'`;
      const deletedValue = (_.isObject(nodeBefore.value) || _.has(nodeBefore, 'children')) ? '[complex value]' : `'${nodeBefore.value}'`;
      return [`Property '${path}.${name}' was changed from ${deletedValue} to ${addedValue}`];
    }
    if (children) {
      return children
        .map((child) => renderWithPath(path.concat(`.${name}`), child))
        .filter((child) => child)
        .join('\n');
    }
    return '';
  };
  return renderWithPath('', diffObj);
};

export default render;
