function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

module.exports = isObject;
