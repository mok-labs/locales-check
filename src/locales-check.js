const getLocalesFiles = require('./get-locales-files');
const getLocalesStructure = require('./get-locales-structure');
const getLocalesMissingKeys = require('./get-locales-missing-keys');
const logLocalesMissingKeys = require('./log-locales-missing-keys');

function localesCheck(path, ci = false) {
  const localesFiles = getLocalesFiles(path);
  const localesStructure = getLocalesStructure(Object.values(localesFiles));
  const missingKeys = getLocalesMissingKeys(localesStructure, localesFiles);
  if (Object.keys(missingKeys).length > 0) {
    logLocalesMissingKeys(missingKeys);
    if(ci) { process.exit(1) };
  }
}

module.exports = localesCheck;
