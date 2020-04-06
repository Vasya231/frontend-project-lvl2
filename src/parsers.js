import yaml from 'js-yaml';
import _ from 'lodash';
import ini from 'ini';

const formatStrValue = (str) => {
  const strWithoutComment = str.split(';')[0];
  if (Number.isNaN(Number(strWithoutComment))) {
    return strWithoutComment;
  }
  if (strWithoutComment.slice(0, 1) !== '0') {
    return Number(strWithoutComment);
  }
  if (!strWithoutComment.includes('.')) {
    return strWithoutComment;
  }
  if (strWithoutComment.slice(0, 2) === '00') {
    return strWithoutComment;
  }
  return Number(strWithoutComment);
};

const customIniParse = (data) => {
  const parsedData = ini.parse(data);
  const transform = (obj) => _.mapValues(
    obj,
    (value) => {
      if (_.isString(value)) {
        return formatStrValue(value);
      }
      return (_.isArrayLikeObject(value) ? transform(value) : value);
    },
  );
  return transform(parsedData);
};

const parsers = {
  json: JSON.parse,
  yaml: (data) => yaml.safeLoad(data) || {},
  ini: customIniParse,
};

export default (format, data) => (parsers[format](data));
