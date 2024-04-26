const isObject = require('./is-object');

function mergeObjects(target, source) {
  const merged = { ...target };

  Object.keys(source).forEach(key => {
    if (isObject(source[key]) && isObject(target[key])) {
      merged[key] = mergeObjects(target[key], source[key]);
    } else if (isObject(source[key])) {
      merged[key] = mergeObjects({}, source[key]);
    } else {
      merged[key] = undefined;
    }
  });

  return merged;
}
function getLocalesStructure(locales) {
  return locales.reduce((structure, locale) => mergeObjects(structure, locale), {});
}

module.exports = getLocalesStructure;

