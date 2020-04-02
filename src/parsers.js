const parsers = {
  json: JSON.parse,
};

export default (type) => ({ parse: parsers[type] });
