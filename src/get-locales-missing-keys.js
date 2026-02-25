const isObject = require('./is-object');
const { isBaseLocale } = require('./get-locale-info');
const getLocalesStructure = require('./get-locales-structure');

function getObjectPaths(initialObject) {
  const stack = [{ obj: initialObject, path: [] }];
  const paths = [];

  while (stack.length > 0) {
    const { obj, path } = stack.pop();
    if (isObject(obj)) {
      Object.entries(obj).forEach(([key, value]) =>
        stack.push({ obj: value, path: [...path, key] }));
    } else {
      paths.push(path.join('.'));
    }
  }

  return paths;
}

function findMissingKeys(baseObj, compareObj, path = '') {
  const missingKeys = [];

  function addMissingKeys(base, compare, currentPath) {
    Object.keys(base).forEach((key) => {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      if (!compare.hasOwnProperty(key)) {
        if (isObject(base[key])) {
          const nestedKeys = getObjectPaths(base[key]);
          nestedKeys.forEach((nestedKey) => {
            const newNestedPath = `${newPath}.${nestedKey}`;
            missingKeys.push(newNestedPath);
          });
        } else {
          missingKeys.push(newPath);
        }
      } else if (isObject(base[key]) && isObject(compare[key])) {
        addMissingKeys(base[key], compare[key], newPath);
      }
    });
  }

  addMissingKeys(baseObj, compareObj, path);

  return missingKeys;
}

function getLocalesMissingKeys(mergedStructure, objects) {
  const baseLocales = {};
  for (const [fileName, content] of Object.entries(objects)) {
    if (isBaseLocale(fileName)) {
      baseLocales[fileName] = content;
    }
  }

  const result = {};

  if (Object.keys(baseLocales).length > 0) {
    const baseLocalesArray = Object.values(baseLocales);
    const mergedBaseStructure = getLocalesStructure(baseLocalesArray);

    for (const [fileName, content] of Object.entries(baseLocales)) {
      const missingKeys = findMissingKeys(mergedBaseStructure, content);
      if (missingKeys.length > 0) {
        result[fileName] = missingKeys;
      }
    }
  } else {
    for (const [fileName, content] of Object.entries(objects)) {
      const missingKeys = findMissingKeys(mergedStructure, content);
      if (missingKeys.length > 0) {
        result[fileName] = missingKeys;
      }
    }
  }

  return result;
}

module.exports = getLocalesMissingKeys;
