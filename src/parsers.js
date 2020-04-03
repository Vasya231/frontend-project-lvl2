import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: (data) => {
    const dataObj = ini.parse(data);
    const normalizedPairs = _.toPairs(dataObj).map(([key, value]) =>[key, Number(value) || value]);
    return _.fromPairs(normalizedPairs);
  },
};

export default (format) => ({ parse: parsers[format] });
