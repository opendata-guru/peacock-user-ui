# Peacock User UI

This project provide a HTML user portal for view open data datasets.
It's based on the [piveau ui](https://github.com/piveau-data/piveau-hub-ui) project from Fraunhofer FOKUS.


You can use this project as npm package.
Get it from [npmjs.com](https://www.npmjs.com/package/peacock-user-ui) with command:

```
npm i peacock-user-ui
```

**or**

You can use an out-of-the-box CDN version and just include main files.
All files located at:

```
https://unpkg.com/peacock-user-ui@latest/dist/index.html
```

**or**

A pre-configured demo is located at:

```
https://opendata-guru.github.io/peacock-user-ui/
```

## Contribution

If you want to contribute to this projekt (report a bug, wish a new feature, improve the documentation, edit the code, ...), just go to the [contribution page](CONTRIBUTING.md).

## Configurations

The following table shortly describes the configurable values in `peacock-user-ui/static/js/config.js`.

Key | Description | Default value
----|-------------|---------------
CONFIG_APP_TITLE | | `Peacock`
CONFIG_APP_DATA_URL | Set the API data endpoint. You can use e.g. CKAN endpoints like 'https://www.govdata.de/ckan/api/action/' and 'https://www.govdata.de/ckan/api/action/package_search?q=spending'. Sometimes CORS are misconfigured and you need an data proxy like 'https://opendata.guru/proxy/cors?url=https://www.govdata.de/ckan/api/action/' and 'https://opendata.guru/proxy/cors?url=https://opendata.jena.de/api/3/action/package_search?rows=9999'. It's also possible to use local path to data files, try '/data/ckan-lazy.json' and '/data/ckan.json'. | `https://data.europa.eu/api/hub/search/`
CONFIG_APP_DATA_SERVICE | The Service defines the data format data url uses. Use `piveau` for EU data portal, `ckan` for CKAN API portals and `ckan-file` for local CKAN json files. Use an object/function for custom service. | `piveau`
CONFIG_APP_DATA_CACHE_BUSTING | used for file data services e.g. `ckan-file` | true
CONFIG_APP_GAZETTEER_URL | | `https://data.europa.eu/api/hub/search/gazetteer/`
CONFIG_APP_UPLOAD_URL | | `https://www.europeandataportal.eu/data/api/`
CONFIG_APP_MATOMO_URL | | `empty`
CONFIG_APP_AUTH_ENABLE | Enable Auth to display a `log in` button for admin functionality. | false
CONFIG_APP_AUTH_SERVICE | Set the authentification method `keycloak` or `zero` (for fake login auth). | `keycloak`
CONFIG_APP_ENABLE_DATASET_CATEGORIES | | false
CONFIG_APP_ENABLE_DATASET_SIMILARDATASETS | | false
CONFIG_APP_ENABLE_DATASET_FEEDBACK | | false
CONFIG_APP_ENABLE_FILTER_GAZETTEER | | false
CONFIG_APP_ENABLE_FILTER_OPERATOR | | false
CONFIG_APP_ENABLE_FAVORITES | | false
CONFIG_APP_ROUTER_BASE | Set the path of the url. Default is an empty string, works for every url like https://some-domain.com or https://sub.domain.com . Set value to `/my-path/` for urls like `https://some-domain.com/my-path/`. | `empty`
CONFIG_APP_ROUTER_LIB_BASE | Set the path of this library. Use the same value as in `CONFIG_APP_ROUTER_BASE` or `'https://unpkg.com/peacock-user-ui@latest/dist/'` when you using the CDN. | `empty`
CONFIG_APP_ROUTER_REDIRECT_ROOT_TO | If you open the website without path (`'/'`) the router will redirect to a new page. Set to a default route name e.g. to `'Datasets'` or to a own router name e.g. in `CONFIG_APP_ROUTER_ROUTE_1_NAME`. | `'Datasets'`

## Localisation

Customize the shown language of the website.
Default is English.

You can:

* load one of 25 predefined languages
* add own translated single strings
* add own language translation

Key | Description | Default value
----|-------------|---------------
CONFIG_APP_LOCALE | Used display language. Use e.g. `de` for German. | `en`
CONFIG_APP_LOCALE_FALLBACK | Used fallback language if no translations for another language is available. | `en`
CONFIG_APP_LANGUAGES | Add own translation. | {}
CONFIG_APP_LOAD_LANGUAGE_1 | Two-letter language code (ISO 639-1) of additional language. Translation will be loaded automatically, relative to `CONFIG_APP_ROUTER_LIB_BASE`. Use e.g. `de` for German. | ''
CONFIG_APP_LOAD_LANGUAGE_URL_1 | Overwrite file location of translation file. | ''

Load one of the predefined language translation:

```
CONFIG_APP_LOAD_LANGUAGE_1 = 'de';
```

Use the new language:

```
CONFIG_APP_LOCALE = 'de';
```

Append a new string to English and German translation:

```
CONFIG_APP_LANGUAGES = {
  'en': {
    'message': {
      'mystring': 'My string'
    }
  },
  'de': {
    'message': {
      'mystring': 'Mein Text'
    }
  }
};
```

Use the new string:

```
CONFIG_APP_TITLE = message.mystring
```

Append a new language translation:

```
CONFIG_APP_LANGUAGES = {
  'tlh': {
    'message': {
      'hello': 'nuqneH',
      ...
    }
  }
};
```

Use the new language:

```
CONFIG_APP_LOCALE = 'tlh'
```


## Embed own pages

You can embed own static HTML files.
The header and footer will be added automatically.

Key | Description | Default value
----|-------------|---------------
CONFIG_APP_ROUTER_ROUTE_1_NAME to CONFIG_APP_ROUTER_ROUTE_9_NAME || `empty`
CONFIG_APP_ROUTER_ROUTE_1_PATH to CONFIG_APP_ROUTER_ROUTE_9_PATH || `empty`
CONFIG_APP_ROUTER_ROUTE_1_COMPONENT to CONFIG_APP_ROUTER_ROUTE_9_COMPONENT | Leave this value empty to load a file as static page. Or use `'Datasets'` to link to Dataset Component. | `empty`
CONFIG_APP_ROUTER_ROUTE_1_FILE to CONFIG_APP_ROUTER_ROUTE_9_FILE || `empty`
CONFIG_APP_ROUTER_ROUTE_1_REQUIRES_AUTH to CONFIG_APP_ROUTER_ROUTE_9_REQUIRES_AUTH | Set to `true` if your page is protected, set to `false` to access without login. | `true`


## Customize pages header

Use relative `URL`s for default pages (e.g. `'/datasets'`) or router pages (see above) (e.g. `'/imprint'`). Use `URL`s starting with `https://` to navigate to other locations.

Key | Description | Default value
----|-------------|---------------
CONFIG_APP_HEADER_LOGO_TEXT | Set your portal name, e.g. `'My Data Portal'`. | `empty`
CONFIG_APP_HEADER_LOGO_IMAGE_SRC || `empty`
CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION || `empty`
CONFIG_APP_HEADER_NAV_1_URL || `'/datasets'`
CONFIG_APP_HEADER_NAV_1_TITLE || `'message.header.navigation.data.datasets'`
CONFIG_APP_HEADER_NAV_2_URL || `'/catalogues'`
CONFIG_APP_HEADER_NAV_2_TITLE || `'message.header.navigation.data.catalogues'`
CONFIG_APP_HEADER_NAV_3_URL to CONFIG_APP_HEADER_NAV_9_URL || `empty`
CONFIG_APP_HEADER_NAV_3_TITLE to CONFIG_APP_HEADER_NAV_9_TITLE || `empty`
CONFIG_APP_ENABLE_DARK_MODE | Show button to switch dark mode and light mode. | false

## Customize pages footer

Key | Description | Default value
----|-------------|---------------
CONFIG_APP_FOOTER_LOGO_TEXT | Set your footer logo name, e.g. `'Peacock User UI 🦚'`. | `empty`
CONFIG_APP_FOOTER_LOGO_IMAGE_SRC || `empty`
CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION || `empty`
CONFIG_APP_FOOTER_LOGO_URL | Set the URI of the link, e.g. `'https://github.com/opendata-guru/peacock-user-ui'`. | `'/'`
CONFIG_APP_FOOTER_NAV_1_URL || `'/imprint'`
CONFIG_APP_FOOTER_NAV_1_TITLE || `'message.navigation.navItems.imprint'`
CONFIG_APP_FOOTER_NAV_2_URL || `'/privacypolicy'`
CONFIG_APP_FOOTER_NAV_2_TITLE || `'message.navigation.navItems.privacyPolicy'`
CONFIG_APP_FOOTER_NAV_3_URL to CONFIG_APP_FOOTER_NAV_9_URL || `empty`
CONFIG_APP_FOOTER_NAV_3_TITLE to CONFIG_APP_FOOTER_NAV_9_TITLE || `empty`

---
The following table and example file shortly describes the configurable values.

<details>
<summary>Open glue-config.js Example File</summary>

```javascript

// Exported Config-Object
export default {
  // The Title of the app. Shown in browser tabs.
  title: 'My Awesome Title',
  // The Base Urls used to fetch data from
  api: {
    baseUrl: 'https://www.the-base-url.to/my/data/endpoints/',
    gazetteerBaseUrl: 'https://www.the-base-url.to/my/gazetteer/data/endpoints/', // TODO: find less hacky solution if the app  uses different APIs to fetch data. Maybe baseUrls: [<url1>, <url2>, ...]
  },
  // Images to add to header/footer
  images: {
    // Images/Logos to add to the Header of the webpage
    headerLogos: [
      {
        // Where to get the image from
        src: 'https://link.to/my-header-logo.png',
        // Where does the image link to
        href: 'https://my-external-logo-url.de' // (optional)
        // How to open the page this image links to
        target: '_blank' // (optional)
        // The alternative description of this image
        description: 'My Awesome Header Logo',
        // The css height of this image
        height: '60px',
        // The css width of this image
        width: 'auto',
      },
    ],
    // Images/Logos to add to the Footer of the webpage.
    footerLogos: [
      {
        // Where to get the image from
        src: 'https://link.to/my-footer-logo.png',
        // Where does the image link to
        href: 'https://my-external-logo-url.de' // (optional)
        // How to open the page this image links to
        target: '_blank' // (optional)
        // The alternative description of this image
        description: 'My Awesome Footer Logo',
        // The css height of this image
        height: '80px',
        // The css width of this image
        width: 'auto',
      },
    ],
  },
  // The default language used
  locale: 'en',
  // The fallback language if no translations for another language is available (Atleast this language must be present and complete in your i18n.json file)
  fallbackLocale: 'en',
  
  themes: {
    // Sets the header Theme. Currently Available: 'primary' XOR 'dark' XOR 'light'.
    header: 'dark',
  },
  // Options to configure Vue Router
  routerOptions: {
    // Defines the base URL of the app. -> https://router.vuejs.org/api/#base
    base: '',
    // available values: "hash" | "history" | "abstract" -> https://router.vuejs.org/api/#mode
    mode: 'hash',
  },
  // Navigation related configurations
  navigation: {
    topnav: {
      // The main navigation configurations
      main: {
        home: {
          // If set: The Home navigation item will link to this url.
          // If not set: The Home navigation item will link to the Home.vue component in peacock-user-ui/src/components/
          href: 'https://link-to-external-url.com/home'
          // Defines where to open the target page
          target: '_self',
          // Defines whether this navigation item is shown or not
          show: true,
        },
        data: {
          show: true,
        },
        maps: {
          show: false,
        },
        about: {
          show: false,
        },
        // Contains Navigation items you want to add to the main navigation.
        append: [
          {
            // Defines the url this navigation element leads to
            href: 'https://www.my-privacy-policy-from-somewhere.de',
            // Defines the icon next to the navigation elements text. Currently using material icons: https://material.io/tools/icons/?style=baseline
            icon: 'rowing',
            // Defines where to open the target page
            target: '_self',
            // The title of this navigation element
            title: 'Privacy Policy',
          },
          {
            href: 'https://www.my-general-imprint.de',
            icon: 'info',
            target: '_self',
            title: 'Imprint',
          },
        ],
        // Defines whether to show icons next to each navigation elements title
        icons: true,
      },
      // The sub navigation configurations
      sub: {
        privacyPolicy: {
          // Defines whether this navigation item is shown or not
          show: true,
          // if set: Defines the url this navigation element leads to
          // if not set: This navigation element will link to the userPrivacyPolicy.vue component in peacock-user-ui/src/components/user
          href: 'https://www.some-url.de/privacy-policy',
          // Defines where to open the target page
          target: '_self',
        },
        imprint: {
          // Defines whether this navigation item is shown or not
          show: true,
          // if set: Defines the url this navigation element leads to
          // if not set: This navigation element will link to the userImprint.vue component in peacock-user-ui/src/components/user
          href: 'https://www.some-url.de/imprint',
          // Defines where to open the target page
          target: '_self',
        },
      },
    },
  },
};

```

</details>

---

### custom_theme.scss

<del>The custom-theme.scss file is located at `peacock-user-ui/user-config/custom-theme.scss` by default. It contains Bootstrap 4 scss variables and overrides the default Bootstrap values. It must be used to change any general styling rules like spacing, sizes, colors etc. You can also add your own color variables to use them via Bootstrap classes or add other new variables.</del>

---

### UserImprint.vue and UserPrivacyPolicy

The UserImprint.vue and UserPrivacyPolicy.vue files are located at `peacock-user-ui/src/components/user/`. They are more or less empty vue components where you should implement your Imprint/PrivacyPolicy pages in if you do not use external pages for those cases (configurable in glue-config.js).

---

### index.js

The index.js file is located at `peacock-user-ui/config/index.js` by default and is generated by the Vue-Webpack-Bundle. It contains several configurations for the development and production build process.
