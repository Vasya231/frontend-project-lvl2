import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const formatStrValue = (str) => {
  if (Number.isNaN(Number(str))) {
    return str;
  }
  if (str.slice(0, 1) !== '0') {
    return Number(str);
  }
  if (str.slice(1, 2) !== '.') {
    return str;
  }
  return Number(str);
};

const customIniParse = (data) => {
  const parsedData = ini.parse(data);
  const transform = (obj) => _.mapValues(
    obj,
    (value) => {
      if (_.isString(value)) {
        return formatStrValue(value);
      }
      console.log(_.isArrayLikeObject(value));
      return (_.isPlainObject(value) ? transform(value) : value);
    },
  );
  return transform(parsedData);
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: customIniParse,
};

export default (format, data) => (parsers[format](data));
