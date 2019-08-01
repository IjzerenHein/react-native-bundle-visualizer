#!/usr/bin/env node
const fs = require('fs');
const tmpdir = require('os').tmpdir() + '/react-native-bundle-visualizer';
const argv = require('minimist')(process.argv.slice(2));
const execa = require('execa');

function getEntryPoint() {
  const pkgJSON = JSON.parse(fs.readFileSync('./package.json'));
  let entry = pkgJSON.main || 'index.js';
  if (entry[0] !== '.' && entry[0] !== '/' && entry[0] !== '\\') {
    entry = './' + entry;
  }
  return entry;
}

// Get (default) arguments
const entryFile = argv['entry-file'] || getEntryPoint();
const platform = argv.platform || 'ios';
const dev = argv.dev || false;
const bundleOutput =
  argv['bundle-output'] || tmpdir + '/' + platform + '.bundle';
const bundleOutputSourceMap = bundleOutput + '.map';

// Make sure output dir exists
if (!fs.existsSync(tmpdir)) fs.mkdirSync(tmpdir);

// Start
const bundlePromise = execa('./node_modules/.bin/react-native', [
  'bundle',
  '--platform',
  platform,
  '--dev',
  dev,
  '--entry-file',
  entryFile,
  '--bundle-output',
  bundleOutput,
  '--sourcemap-output',
  bundleOutputSourceMap
]);
bundlePromise.stdout.pipe(process.stdout);
bundlePromise.then(() => {
  const explorerPromise = execa('./node_modules/.bin/source-map-explorer', [
    bundleOutput,
    bundleOutputSourceMap
  ]);
  explorerPromise.stdout.pipe(process.stdout);
});
