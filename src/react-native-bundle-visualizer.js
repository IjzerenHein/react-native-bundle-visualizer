#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const argv = require('minimist')(process.argv.slice(2));
const execa = require('execa');
const rimraf = require('rimraf');
const open = require('open');
const { explore } = require('source-map-explorer');
const pkgJSON = JSON.parse(fs.readFileSync('./package.json'));

function getAppName() {
  if (pkgJSON.name) return pkgJSON.name;
  try {
    const appJSON = JSON.parse(fs.readFileSync('./app.json'));
    return appJSON.name || appJSON.expo.name || 'UnknownApp';
  } catch (err) {
    return 'UnknownApp';
  }
}

function getEntryPoint() {
  let entry = pkgJSON.main || 'index.js';
  if (entry[0] !== '.' && entry[0] !== '/' && entry[0] !== '\\') {
    entry = './' + entry;
  }
  return entry;
}

// Get (default) arguments
const baseDir = os.tmpdir() + '/react-native-bundle-visualizer';
const tmpDir = baseDir + '/' + getAppName();
const entryFile = argv['entry-file'] || getEntryPoint();
const platform = argv.platform || 'ios';
const dev = argv.dev || false;
const verbose = argv.verbose || false;
const bundleOutput =
  argv['bundle-output'] || tmpDir + '/' + platform + '.bundle';
const bundleOutputSourceMap = bundleOutput + '.map';
const bundleOutputExplorerHTML = tmpDir + '/output/explorer.html';

// Make sure output dir exists
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
if (fs.existsSync(tmpDir)) rimraf.sync(tmpDir);
fs.mkdirSync(tmpDir);

// Bundle
console.log(chalk.green.bold('Generating bundle...'));
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

// Upon bundle completion, run `source-map-explorer`
bundlePromise
  .then(
    () => {
      const stats = fs.statSync(bundleOutput);
      console.log(
        chalk.green.bold(
          'Bundle is ' +
            Math.round((stats.size / (1024 * 1024)) * 10) / 10 +
            ' MB in size'
        )
      );
      return explore(
        {
          code: bundleOutput,
          map: bundleOutputSourceMap
        },
        {
          output: {
            format: 'html',
            filename: bundleOutputExplorerHTML
          }
        }
      );
    }

    // Log info and open html file
  )
  .then(result => {
    if (verbose) {
      result.bundles.forEach(bundle => {
        Object.keys(bundle.files).forEach(file => {
          console.log(
            chalk.green(file + ', size: ' + bundle.files[file] + ' bytes')
          );
        });
      });
    }

    // Log any errors
    if (result.errors) {
      result.errors.forEach(error => {
        if (error.isWarning) {
          console.log(chalk.yellow.bold(error.message));
        } else {
          console.log(chalk.red.bold(error.message));
        }
      });
    }

    // Open html file
    return open(bundleOutputExplorerHTML);
  });
