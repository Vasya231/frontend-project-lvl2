import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumber = (str) => (str.search(/^-?(0|[1-9]+[0-9]*)(\.[0-9]+)?$/) !== -1);

const transformString = (str) => (isNumber(str) ? Number(str) : str);

const customIniParse = (data) => {
  const parsedData = ini.parse(data);
  const transform = (obj) => _.mapValues(
    obj,
    (value) => {
      if (_.isString(value)) {
        return transformString(value);
      }
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
