import yaml from 'js-yaml';
import ini from 'ini';
// import _ from 'lodash';

/* const formatStrValue = (str) => {
  if (_.isNaN(Number(str)) || !isFinite(str)) {
    return str;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

const customIniParse = (data) => {
  const parsedData = ini.parse(data);
  const transform = (obj) => _.mapValues(
    obj,
    (value) => {
      if (_.isString(value)) {
        return formatStrValue(value);
      }
      return (_.isPlainObject(value) ? transform(value) : value);
    },
  );
  return transform(parsedData);
}; */

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (format, data) => (parsers[format](data));
