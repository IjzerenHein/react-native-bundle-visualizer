const fs = require('fs');

function readPackageJSON() {
	return JSON.parse(fs.readFileSync('./package.json'));
}

function getEntryPoint() {
	const pkgJSON = readPackageJSON();
	return pkgJSON.main || './index.js';
}

module.exports = {
	getEntryPoint,
};