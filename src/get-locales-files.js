const fs = require('fs');

function parseJsonFiles(path, fileNames) {
  const parsedFiles = {};
  fileNames.forEach((fileName) => {
    const fileData = fs.readFileSync(`${path}/${fileName}`, 'utf8');
    const parsedData = JSON.parse(fileData);
    parsedFiles[fileName] = parsedData;
  });

  return parsedFiles;
}

function getLocalesFiles(path) {
  const localesFileNames = fs.readdirSync(path);
  const jsonLocalesFileNames = localesFileNames.filter((fileName) => fileName.endsWith('.json'));

  return parseJsonFiles(path, jsonLocalesFileNames);
}

module.exports = getLocalesFiles;
