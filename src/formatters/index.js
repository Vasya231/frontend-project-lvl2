import plainRender from './plain';
import objectRender from './pretty';

export default (diffObj, format) => {
  switch (format) {
    case 'plain': return plainRender(diffObj);
    case 'pretty': return objectRender(diffObj, -2);
    case 'json': return JSON.stringify(diffObj, null, 2);
    default: throw new Error(`Wrong format: ${format}`);
  }
};
