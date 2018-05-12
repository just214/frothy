# Changelog

All notable changes to this project will be documented in this file.

## [0.0.6] - 2018-05-11

### Added

* Added several new props to control the layout and style of the component.
* Added react-tabs, react-modal, typeface-roboto and react-transition-group npm dependencies.
* Recaptcha support for sign up form.

### Changed

* Moved the library from a Webpack config to Rollup using the create-react-library package.
* Completely rewrote the components from Ant Design components to custom-styled components to reduce bundle size.
* Revised styles to styled-components (required as peer dependency).
* Revised README and demo project to reflect changes to API.

### Breaking Changes

* Removed `alt` prop in favor of more configuration options.

### Removed

* Ant Design dependency

## [0.0.5] - 2018-05-08

### Added

* Phone login with Recaptcha support

## [0.0.1 - 0.0.4] - 2018-05-06

### Added

* Initial commit and minor changes

### Changed

* Minor tweaks between versions

### Removed

* Initial prop names in favor of more simple naming conventions.
