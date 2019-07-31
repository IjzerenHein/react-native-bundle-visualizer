const fs = require('fs');

function readPackageJSON() {
  return JSON.parse(fs.readFileSync('./package.json'));
}

function getEntryPoint() {
  const pkgJSON = readPackageJSON();
  let entry = pkgJSON.main || 'index.js';
  if (entry[0] !== '.' && entry[0] !== '/' && entry[0] !== '\\') {
    entry = './' + entry;
  }
  return entry;
}

module.exports = {
  getEntryPoint
};
