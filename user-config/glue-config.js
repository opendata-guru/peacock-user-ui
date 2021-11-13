/**
 * @author Dennis ritter
 * @created 25.07.17
 * @description User configuration for viaduct-ui.
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

// Import Adapters for data requests
import datasetService from '../src/viaduct-ui-adapter-vhub/datasets';
import catalogueService from '../src/viaduct-ui-adapter-vhub/catalogues';
import distributionService from '../src/viaduct-ui-adapter-vhub/distributions';
import datastoreService from '../src/viaduct-ui-adapter-vhub/datastore';
import gazetteerService from '../src/viaduct-ui-adapter-vhub/gazetteer';
import uploadService from '../src/services/uploads';
import authService from '../src/auth/authService';

// Export Config-Object
export default {
  title: 'Peacock',
  api: {
    baseUrl: 'http://localhost:8081/',
    gazetteerBaseUrl: 'http://localhost:8081/gazetteer/',
    uploadBaseUrl: 'http://localhost:8080',
    matomoUrl: 'https://matomo',
    authToken: '',
  },
  enable: {
    dataset: {
      categories: true,
      similarDatasets: true,
      activityStream: false,
      feedback: true,
    },
    filter: {
      gazetteer: true,
      operator: true,
    },
  },
  keycloak: {
    enableLogin: true,
    realm: 'edp',
    url: 'https://www.keycloak.com',
    'ssl-required': 'external',
    clientId: 'edp-ui',
    'public-client': true,
    'verify-token-audience': true,
    'use-resource-role-mappings': true,
    'confidential-port': 0,
  },
  rtp: {
    grand_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
    audience: 'piveau-hub',
  },
  images: {
    headerLogos: [
      {
        src: 'https://i.imgur.com/lgtG4zB.png',
        // href: 'https://my-url.de'(optional)
        // target: '_blank'(optional)
        description: 'Logo',
        height: '60px',
        width: 'auto',
      },
    ],
    footerLogos: [],
  },
  locale: 'en',
  fallbackLocale: 'en',
  services: {
    catalogueService,
    datasetService,
    distributionService,
    datastoreService,
    gazetteerService,
    uploadService,
    authService,
  },
  themes: {
    header: 'dark',
  },
  routerOptions: {
    base: '',
    mode: 'history',
  },
  navigation: {
    topnav: {
      main: {
        home: {
          // href: 'https://link-to-external-url.com' (optional)
          // target: '_self',
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
        append: [
          {
            href: 'https://www.fokus.fraunhofer.de/datenschutz',
            // icon: 'rowing',
            target: '_self',
            title: 'Privacy Policy',
          },
          {
            href: 'https://www.fokus.fraunhofer.de/9663f8cb2d267d4b',
            // icon: 'rowing',
            target: '_self',
            title: 'Imprint',
          },
        ],
        icons: false,
      },
      sub: {
        privacyPolicy: {
          show: false,
          href: 'https://www.fokus.fraunhofer.de/datenschutz',
          target: '_self',
        },
        imprint: {
          show: false,
          href: 'https://www.fokus.fraunhofer.de/9663f8cb2d267d4b',
          target: '_self',
        },
      },
    },
  },
};
