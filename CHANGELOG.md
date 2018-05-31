# Changelog

All notable changes to this project will be documented in this file.

## [0.1.6] - 2018-05-31

### Changed

* Fixed an issue where the passwordRules default prop values were getting overwritten.
* Minor style modifications.

## [0.1.5] - 2018-05-20

### Changed

* Added the anonymous login prop description to the README.
* Fixed styling issue where some text was not properly center-aligning.
* Fixed an issue where the Firebase auth method was not being correctly passed to the Password Login Form.

## [0.1.4] - 2018-05-16

### Changed

* Fixed styling issue in README due to placement of anchor tags for table of contents.
* Cleaned up some of the styling and aligned the icons in the input elements.
* Minor code refactors- no API or breaking changes

## [0.1.3] - 2018-05-16

### Changed

* Swapped out the spinner for a spinning icon on the "Log In Anonymously" button.
* Fixed Aria labels on inputs and selects.
* Increased font size of collapse titles for better accessibility.
* Complete overhaul of the README with the table of contents and better props documentation.

## [0.1.2] - 2018-05-15

### Added

* Now you can define your own password requirements for email signup using the `passwordRules` prop. You can optionally show a list of the password requirements in the signup form. Each items gets validated as the user types and a green checkmark appears next to each list item as it is validated.

### Changed

* Made several small improvements to the library and demo app based on recommendations from a Chrome DevTools Audit, including performance optimizations and aria-labels.
* The social login buttons now rotate instead of switching to a spinner.
* Fixed an issue where the spinner was not displaying correctly on the "SIGN UP" button.
* Updated README screenshot to reflect new style changes.
* Updated demo to include new password rules props.

## [0.1.1] - 2018-05-14

### Added

* Added a close button "X" in the upper right hand corner to ensure simplicity of closing the modal.
* Added new screenshot to README depicting new design.
* Added inline sourcemaps to the production build for tools like package-size.

### Changed

* Updated the styling of the input elements from boxes to a cleaner, open look.
* Updated CSS min-height property on container to prevent jumping in size dramatically between the login to signup tabs.

## [0.1.0] - 2018-05-14

### Added

* Added `auth` prop that allows you to optionally pass the Firebase.auth method that the Frothy library should use. By default, Frothy will use the development build of the Firebase SDK.

### Changed

* Minor code refactors.

### Changed

* Fixed styling issue where the screen was flashing between tabs on mobile.
* Small internal code refactors. No changes to the API.

## [0.0.9] - 2018-05-13

Happy Mother's Day to all the moms out there!

### Changed

* Updated various styles including a lighter background color for the anonymous login button.
* Replaced floating Recaptcha badge with inline badge in phone login form.
* Fixed styling issue where rounded edges and shadows were not displaying correctly as a modal.

### Added

* Added `agree` and `agreeMessage` props, which generate an "Agree to Terms" checkbox in the email signup form.
* Added `modalOverlay` prop to toggle the modal overlay on or off.
* Added `recaptchaBadge` prop to control position of the required Recaptcha badge.
* Added animations for modal mount and unmount.

### Removed

* Removed Recaptcha for email signup. While Recaptcha support is enabled by default for the phone login, it appears that an API key may be required to enable Recaptcha on email signup. This is being removed until it can be properly addressed.

## [0.0.8] - 2018-05-12

### Changed

* Internal code refactors. No changes to the API...just cleaner code.
* Fixed an issue where the error was not being passed though on multiple Firebase requests.

## [0.0.7] - 2018-05-12

### Changed

* Fixed an issue where the modal background was showing up.

### Added

* Added favicon and icon image to demo and README.

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
