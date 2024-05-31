const isObject = require('./is-object');

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

function getLocalesMissingKeys(merged, objects) {
  const result = {};
  for (const [name, obj] of Object.entries(objects)) {
    const missingKeys = findMissingKeys(merged, obj);
    if (missingKeys.length > 0) {
      result[name] = missingKeys;
    }
  }

  return result;
}

module.exports = getLocalesMissingKeys;
