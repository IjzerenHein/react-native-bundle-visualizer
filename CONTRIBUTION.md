# Contributing to React Native Bundle Visualizer

Thank you for helping out with **react-native-bundle-visualizer**. We'd like to make contributions as
pleasant as possible, so here's a small guide of how we see it. Happy to hear your feedback about anything, so please let us know.

## Tests

All tests are run on Github Actions on opening a pull request or pushing to main, but you should use them locally when making changes.

- `yarn test`: Run tests for react native cli app and expo app.
- `yarn test:rn`: Run tests only for react native cli app.
- `yarn test:expo`: Run tests only for expo app.

## Sending a pull request

When you're sending a pull request:

- If you want fix/add something, please open new/ find existing issue, so we can discuss it.
- We prefer small pull requests focused on one change, as those are easier to test/ review.
- Please make sure that all tests are passing on your local machine.
- Follow the template when opening a PR.

## Commits and versioning

All PRs are squashed into `master` branch and wrapped up in a single commit,
following [conventional commit message](https://www.conventionalcommits.org/en/v1.0.0-beta.3).

Most notably prefixes you'll see:

- **fix**: Bug fixes, triggers _patch_ release
- **feat**: New feature implemented, triggers _minor_
- **chore**: Changes that are not affecting end user (CI config changes,
  scripts, ["grunt work"](https://stackoverflow.com/a/26944812/3510245))
- **docs**: Documentation changes.
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **test**: Adding missing tests or correcting existing tests.

## License

By contributing to React Native Bundle Visualizer, you agree that your contributions
will be licensed under the **MIT** license.