# The Expedition Roleplaying Card Game App

## Contributing

If you encounter any bugs with the app or have feedback, please [drop an issue](https://github.com/Fabricate-IO/expedition-app/issues/new)! We just ask that you be as descriptive as possible. For feature requests, label it with "enhancement" and describe why you'd like the feature & your use case. For bugs, label it with "bug" and include what device(s) and browser(s) or app(s) you saw it on, including steps to reproduce (screenshots are also highly encouraged).

We're very friendly to pull requests! Simply fork the repository, create a new branch, make your desired changes and test them out on your local, then submit a PR.

Priorities are indicated via the "Assigned" field on issues and pull requests. Having someone assigned to it indicates that it's a current top priority and currently being worked on. Issues that are definitively low priorty / no plans to be addressed for 6 months+ should be closed and labeled as "wontfix".

Question? Email us at contact@fabricate.io

## Getting Started

### Requirements

Requires a NodeJS version above 0.12.x. Check your Node.js version.

```sh
node --version
```

Building the iOS app requires a mac, and cordova setup scripts currently work for unix-like environments only (Linux + Mac).

### Install dependencies

#### Quick-start

With Node.js installed, run the following one liner from the root of the repository:

```sh
npm install -g gulp bower && npm install && bower install
```

For building native apps, you will also need to set up cordova:

```sh
npm install -g cordova
./project.sh
```

### Development workflow

#### Serve / watch

```sh
gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

#### Run tests

```sh
gulp test:local
```

This runs the unit tests defined in the `app/test` directory through [web-component-tester](https://github.com/Polymer/web-component-tester).

Tests require Java 7 or higher. To update Java go to http://www.oracle.com/technetwork/java/javase/downloads/index.html and download ***JDK*** and install it.

Tests require Chrome. Please make sure you have the Chrome browser installed and up-to-date on your system.

#### Build for Web

```sh
gulp
```

Web files are output in the www/ folder.

#### Build for Android

```sh
gulp && cordova build android
```

#### Build for iOS

```sh
gulp && cordova build ios
```
