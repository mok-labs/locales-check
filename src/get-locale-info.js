function getBaseLanguage(fileName) {
  const nameWithoutExt = fileName.replace(/\.json$/, '');
  if (nameWithoutExt.length > 2) {
    return nameWithoutExt.substring(0, 2).toLowerCase();
  }
  
  return nameWithoutExt.toLowerCase();
}

function isBaseLocale(fileName) {
  const nameWithoutExt = fileName.replace(/\.json$/, '');
  return nameWithoutExt.length === 2;
}

module.exports = {
  getBaseLanguage,
  isBaseLocale,
};
