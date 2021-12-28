# Contributing

Thanks for contributing to this project. Feel free to:

- [report a bug](https://github.com/opendata-guru/peacock-user-ui/issues/new?assignees=&labels=&template=bug_report.md&title=)
- [wish a new feature](https://github.com/opendata-guru/peacock-user-ui/issues/new?assignees=&labels=&template=feature_request.md&title=
)
- [fix a reported problem](https://github.com/opendata-guru/peacock-user-ui/issues)
- translate in to your language or fix missing transpations (link will follow)
- [improve the documentation](https://github.com/opendata-guru/peacock-user-ui/blob/master/README.md)
- [get in touch](https://twitter.com/tursics)

# Provide code

You can provide bug fixes and new code. First of all, setup your environment.

## Project Setup

Prepare your system and [install nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating), the version manager for node.js.

Install [Node.js v15.14.0+ and NPM 7.7.6+](https://nodejs.org/en/) on your system. Yes, this repo use older version of node.js. You are welcome to drop a merge request with updated packages.

```bash
$ nvm use 15
Now using node v15.14.0 (npm v7.7.6)
$ node -v
v15.14.0
```

Clone or download the code:

```bash
$ git clone git@github.com:opendata-guru/peacock-user-ui.git
```

Install NPM packages:

```bash
$ cd peacock-user-ui
$ npm install
```

## Build for Development

Open a terminal and run:

```bash
$ npm run dev
```

This will start a local webserver on Port `8084`. Open a web browser and visit `http://localhost:8084` to see the app.

**Hot Module Replacement** is supported. The page will update automatically whenever files are changed and saved.

## Build for Production

Open a terminal and run:

```bash
$ npm run build
```

This will optimize files for production and store the bundle in
  `peacock-user-ui/dist`

## Configurations

### glue-config.js

The glue-config.js file is located at `peacock-user-ui/user-config/glue-config.js` by default. It is the main project configuration file.

You need to rebuild the project after changing this file.

### user-configs.js

The user-configs.json file is located at `peacock-user-ui/config/user-configs.js` by default. It contains the paths to the glue-config.js and i18n.json. So this file overwrite the settings in `glue-config.js`. The simplest sample file is `user-configs.default.js` (with no configuration overwrites).

The `user-configs.js` checks global variables and set the values, if set, to the configuration. The global variables can set in `config.js`file.

You need to rebuild the project after changing this file.

### config.js

tbd.

### environment variables

tbd.
