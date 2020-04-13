import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: (data) => yaml.safeLoad(data) || {},
  ini: ini.parse,
};

export default (format, data) => (parsers[format](data));
