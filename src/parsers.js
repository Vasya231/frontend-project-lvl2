import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumber = (str) => (str.search(/^-?(0|[1-9]+[0-9]*)(\.[0-9]+)?$/) !== -1);

const transformStr = (str) => (isNumber(str) ? Number(str) : str);

const customIniParse = (data) => {
  const parsedData = ini.parse(data);
  return _.cloneDeepWith(parsedData, (value) => (
    _.isString(value) ? transformStr(value) : undefined
  ));
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: customIniParse,
};

export default (format, data) => (parsers[format](data));
