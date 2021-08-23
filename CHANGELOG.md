# [Unreleased]

# [3.0.0](https://github.com/IjzerenHein/react-native-bundle-visualizer/compare/v2.3.0...v3.0.0) (2021-08-23)

### Bug Fixes

- Fixes `@expo/metro-config` resolving to old dependencies, causing problems with newer Expo SDK versions (removes this depenendency entirely).

### Breaking changes

- Removes the `-expo` command line option. As of Expo SDK 41 this option is no longer needed. Use `react-native-bundle-visualizer@2` for Expo SDK 40 or lower.

# [2.3.0](https://github.com/IjzerenHein/react-native-bundle-visualizer/compare/v2.2.1...v2.3.0) (2021-08-03)

- Fix `unknownApp` name for Expo apps
- Drop support for Node 10
- Updated dependencies to their latest versions
- Added tests for react-native 0.64 and Expo SDK 42
- Expo apps using SDK 41 or higher no longer require `--expo bare/managed`

# [2.2.1](https://github.com/IjzerenHein/react-native-bundle-visualizer/compare/v2.1.1...v2.2.1) (2020-07-07)

- Add `--expo [bare|managed]` option to generate Expo accurate bundles and handle `.expo` files correctly
- Add `--format [html|json|tsv]` option to output as json or tsv files (thanks [wilau2](https://github.com/wilau2)!)
- Add `--only-mapped` option for excluding "unmapped" bytes from the output (thanks [wilau2](https://github.com/wilau2)!)
- Updated dependencies to their latest versions

# [2.1.1](https://github.com/IjzerenHein/react-native-bundle-visualizer/compare/v2.0.4...v2.1.1) (2019-12-10)

- Fixed build error when app-name contains special characters (Thanks! @ofiron01)
- Added tests for RN61 and Expo35
- Added CI support through Travis
- Updated all dependencies to their latest versions
- Removed all non-essential files from NPM package

# [2.0.4](https://github.com/IjzerenHein/react-native-bundle-visualizer/compare/v1.4.2...v2.0.4) (2019-10-01)

This version switches to using the awesome `source-map-explorer` package which can visualize the output from the Metro bundler directly. This means that the Haul bundler is no longer used and it should therefore result in less build errors and more accurate results. The source-map-explorer package also provides an interactive User interface which allows you to navigate deeper into the source code.
Additionally, you can now run this version directly using npx without having to install any dependencies.

To use, just run `npx react-native-bundle-visualizer`

## Command line arguments

All command-line arguments are optional. By default a production build will be created for the `ios` platform.

| Option          | Description                                                   | Example                           |
| --------------- | ------------------------------------------------------------- | --------------------------------- |
| `platform`      | Platform to build (default is **ios**)                        | `--platform android`              |
| `dev`           | Dev or production build (default is **false**)                | `--dev false`                     |
| `entry-file`    | Entry-file (when omitted tries to auto-resolve it)            | `--entry-file ./index.android.js` |
| `bundle-output` | Output bundle-file (default is **tmp**)                       | `--bundle-output ./myapp.bundle`  |
| `verbose`       | Dumps additional output to the console (default is **false**) | `--verbose`                       |
| `reset-cache`   | Removes cached react-native files (default is **false**)      | `--reset-cache`                   |

# [1.4.2](https://github.com/IjzerenHein/react-native-bundle-visualizer/compare/v1.4.1...v1.4.2) (2019-07-31)

- Fixed `Can't resolve 'node_modules/expo/AppEntry.js'` error when using expo
- Fixed certain expo-libs giving errors because they were not transpiled

# [1.4.1](https://github.com/IjzerenHein/react-native-bundle-visualizer/releases/tag/v1.4.1) (2019-03-20)

- Fixed `react-hot-loader` missing dependency issue with latest haul
- Fixed new @react-native-community libs not transpiled correctly
- 