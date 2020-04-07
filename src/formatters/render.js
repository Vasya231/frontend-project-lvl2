import plainRender from './plain';
import objectRender from './object';

const renders = {
  plain: plainRender,
  object: (diffObj) => objectRender(diffObj, -2),
  json: (diffObj) => JSON.stringify(diffObj, null, 2),
};

export default (diffObj, format) => renders[format](diffObj);