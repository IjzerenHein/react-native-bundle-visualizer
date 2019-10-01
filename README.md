# react-native-bundle-visualizer

See what's inside of your react-native bundle 📦

![bundle-visualizer-animation](./react-native-bundle-visualizer.gif)

Uses the awesome [webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer) and [haul](https://github.com/callstack-io/haul) bundler.

## Purpose

Sometimes, importing a single javascript library can drastically increase your bundle size. This package helps you to identify such a library, so you can keep the bundle size low and loading times fast.

## Usage

*Make sure you have node 8 or higher installed.*

Depending on your react-native version, install the appropriate package as a dev dependency:

| RN version  | Install react-native-bundle-visualizer |
|-------------|------------|
| >= 0.57     | `yarn add --dev react-native-bundle-visualizer` | 
| 0.49 - 0.56 | `yarn add --dev react-native-bundle-visualizer@1.3.5` |
| <= 0.48     | `yarn add --dev react-native-bundle-visualizer@1.1.0` |
	
And run it:

	yarn run react-native-bundle-visualizer

*or when using npm:*

	npm install --save-dev react-native-bundle-visualizer
	./node_modules/.bin/react-native-bundle-visualizer

### Gitignore output files

Additionally, add the haul generated files & folders to your `.gitignore` file:

```
# Haul bundler
/assets
stats.html
index.ios.bundle
index.ios.bundle.map
haul-debug.log
```

## Disclaimer

The sizes reported are an indication rather than the exact byte size in your bundle. This is because the Haul packager returns different bundles compared to the react-native Metro bundler. Also, due to limitations in webpack's stats, the "actual" (minified) numbers reported here are approximate, but they should be pretty close.

## License

[MIT](./LICENSE.txt)

