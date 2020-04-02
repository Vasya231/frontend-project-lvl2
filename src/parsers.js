import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
};

export default (format) => ({ parse: parsers[format] });
