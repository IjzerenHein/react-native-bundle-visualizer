#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const execa = require('execa');
const open = require('open');
const { explore } = require('source-map-explorer');
const pkgJSON = JSON.parse(fs.readFileSync('./package.json'));

function sanitizeString(str) {
  return str ? str.replace(/[^\w]/gi, '') : str;
}

function getAppName() {
  if (pkgJSON.name) return sanitizeString(pkgJSON.name);
  try {
    const appJSON = JSON.parse(fs.readFileSync('./app.json'));
    return (
      sanitizeString(appJSON.name) ||
      sanitizeString(appJSON.expo.name) ||
      'UnknownApp'
    );
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

function getReactNativeBin() {
  const localBin = './node_modules/.bin/react-native';
  if (fs.existsSync(localBin)) return localBin;
  try {
    const reactNativeDir = path.dirname(
      require.resolve('react-native/package.json')
    );
    return path.join(reactNativeDir, './cli.js');
  } catch (e) {
    console.error(
      chalk.red.bold(
        `React-native binary could not be located. Please report this issue with environment info to:\n`
      ),
      chalk.blue.bold(`-> ${require('../package.json').bugs}`)
    );
  }
}

// Get (default) arguments
const baseDir = path.join(os.tmpdir(), 'react-native-bundle-visualizer');
const tmpDir = path.join(baseDir, getAppName());
const outDir = path.join(tmpDir, 'output');
const entryFile = argv['entry-file'] || getEntryPoint();
const platform = argv.platform || 'ios';
const expoTargetDeprecated = argv.expo || '';
const dev = argv.dev || false;
const verbose = argv.verbose || false;
const resetCache = argv['reset-cache'] || false;
const bundleOutput =
  argv['bundle-output'] || path.join(tmpDir, platform + '.bundle');
const bundleOutputSourceMap = bundleOutput + '.map';
const format = argv.format || 'html';
const bundleOutputExplorerFile = path.join(outDir, 'explorer.' + format);
const onlyMapped = !!argv['only-mapped'] || false;

// Make sure the temp dir exists
fs.ensureDirSync(baseDir);
fs.ensureDirSync(tmpDir);

// Try to obtain the previous file size
let prevBundleSize;
if (fs.existsSync(bundleOutput)) {
  const stats = fs.statSync(bundleOutput);
  prevBundleSize = stats.size;
}

// Bundle
console.log(chalk.green.bold('Generating bundle...'));
const commands = [
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
  bundleOutputSourceMap,
];
if (resetCache) {
  commands.push('--reset-cache');
  commands.push(resetCache);
}

// Warn about `--expo` deprecation
if (expoTargetDeprecated) {
  console.error(
    chalk.red.bold(
      'The "--expo" command is no longer needed for Expo SDK 41 or higher. When using Expo SDK 40 or lower, please use `react-native-bundle-visualizer@2`.'
    )
  );
}

const reactNativeBin = getReactNativeBin();
const bundlePromise = execa(reactNativeBin, commands);
bundlePromise.stdout.pipe(process.stdout);

// Upon bundle completion, run `source-map-explorer`
bundlePromise
  .then(
    () => {
      // Log bundle-size
      const stats = fs.statSync(bundleOutput);

      // Log increase or decrease since last run
      let deltaSuffix = '';
      if (prevBundleSize) {
        const delta = stats.size - prevBundleSize;
        if (delta > 0) {
          deltaSuffix = chalk.yellow(
            ' (+++ has increased with ' + delta + ' bytes since last run)'
          );
        } else if (delta < 0) {
          deltaSuffix = chalk.green.bold(
            ' (--- has decreased with ' + (0 - delta) + ' bytes since last run)'
          );
        } else {
          deltaSuffix = chalk.green(' (unchanged since last run)');
        }
      }
      console.log(
        chalk.green.bold(
          'Bundle is ' +
            Math.round((stats.size / (1024 * 1024)) * 100) / 100 +
            ' MB in size'
        ) + deltaSuffix
      );

      // Make sure the explorer output dir is removed
      fs.removeSync(outDir);
      return explore(
        {
          code: bundleOutput,
          map: bundleOutputSourceMap,
        },
        {
          onlyMapped,
          output: {
            format,
            filename: bundleOutputExplorerFile,
          },
        }
      );
    }

    // Log info and open output file
  )
  .then((result) => {
    if (verbose) {
      result.bundles.forEach((bundle) => {
        Object.keys(bundle.files).forEach((file) => {
          console.log(
            chalk.green(file + ', size: ' + bundle.files[file] + ' bytes')
          );
        });
      });
    }

    // Log any errors
    if (result.errors) {
      result.errors.forEach((error) => {
        if (error.isWarning) {
          console.log(chalk.yellow.bold(error.message));
        } else {
          console.log(chalk.red.bold(error.message));
        }
      });
    }

    // Open output file
    return open(bundleOutputExplorerFile);
  });
