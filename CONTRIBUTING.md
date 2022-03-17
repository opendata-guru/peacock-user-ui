# Contributing

Thanks for contributing to this project. Feel free to:

- [report a bug](https://github.com/opendata-guru/peacock-user-ui/issues/new?assignees=&labels=&template=bug_report.md&title=)
- [wish a new feature](https://github.com/opendata-guru/peacock-user-ui/issues/new?assignees=&labels=&template=feature_request.md&title=
)
- [fix a reported problem](https://github.com/opendata-guru/peacock-user-ui/issues)
- [translate in to your language or fix missing translations](https://www.transifex.com/peacock/open-data-portal/)
- [improve the documentation](https://github.com/opendata-guru/peacock-user-ui/blob/master/README.md)
- [get in touch](https://twitter.com/tursics)

# Translate

![transifex chart image](https://www.transifex.com/projects/p/open-data-portal/resource/i18njson/chart/image_png)

![Transifex Logo](https://cdn.transifex.com/txc/static/charts/images/tx-logo-micro.c5603f91c780.png)

We use Transifex as online translation service.
Have a look at [Transifex project page](https://www.transifex.com/peacock/open-data-portal/).
You can register as translator for free.
It will automatically accept requests from translators to join the team.

# Provide code

You can provide bug fixes and new code. First of all, setup your environment.

## Project Setup

Prepare your system and [install nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating), the version manager for node.js.

Install [Node.js v15.14.0+ and NPM 7.7.6+](https://nodejs.org/en/) on your system. Yes, this repo use older version of node.js. You are welcome to drop a merge request with updated packages.

```bash
$ nvm use 16
Now using node v16.14.0 (npm v8.3.1)
$ node -v
v16.14.0
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

# Build steps

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

## Publish a new version to NPM

First of all check if you can create a production build successfully.

```bash
$ npm run build
```

Then check that all tests run without any errors and code coverage is as high as possible.

```bash
$ npm run test
$ npx jest --coverage
```

Remove all known security vulnerabilities. Get the audit report:

```bash
$ npm audit
```

Open `package.json` file and increase the version number of the package:

```bash
"version": "1.0.#",
```

Build the final production build:

```bash
$ npm run build
```

Follow next steps:

- format `dist/js/config.js` with https://webformatter.com/javascript
- push all changes to github
- [draft a new release](https://github.com/opendata-guru/peacock-user-ui/releases/new)

Publishing a new release will automatically:

- create new downloadable ZIP files of source code on github
- publish a new version to [npm](https://www.npmjs.com/package/peacock-user-ui)
- publish a new version to CDN unpkg.com

# Configurations

## glue-config.js

The glue-config.js file is located at `peacock-user-ui/user-config/glue-config.js` by default. It is the main project configuration file.

You need to rebuild the project after changing this file.

## user-configs.js

The user-configs.json file is located at `peacock-user-ui/config/user-configs.js` by default. It contains the paths to the glue-config.js and i18n.json. So this file overwrite the settings in `glue-config.js`. The simplest sample file is `user-configs.default.js` (with no configuration overwrites).

The `user-configs.js` checks global variables and set the values, if set, to the configuration. The global variables can set in `config.js`file.

You need to rebuild the project after changing this file.

## config.js

The config.js file is located at `peacock-user-ui/static/js/config.js` by default. Use this file to customize all settings for this project.

You **does not need** to rebuild the project after changing this file. But you must reload the browser while hot reloading does not work.

All settings described in [README.md](README.me) file.

# Write own adapter

Write your own adapter with up to 5 files. Import your adapter files in `user-configs.js` file:

```javascript
// Import Adapters for data requests
import datasetService from '../src/my-adapter-folder/myDatasetService';
import catalogueService from '../src/my-adapter-folder/myCatalogueService';
import distributionService from '../src/my-adapter-folder/myDistributionService';
import datastoreService from '../src/my-adapter-folder/myDatastoreService';
import gazetteerService from '../src/my-adapter-folder/myGazetteerService';

// Exported Config-Object
export default {
  // The services fetch data from somewhere. Each service has to be imported at the beginning of this file.
  services: {
    catalogueService,
    datasetService,
    distributionService,
    datastoreService,
    gazetteerService,
  },
};
```
