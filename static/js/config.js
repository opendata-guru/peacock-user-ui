/**
 * @license Copyright 2021-2022 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable */

var CONFIG_APP_TITLE = 'My Data Portal';

var CONFIG_APP_DATA_URL = 'https://data.europa.eu/api/hub/search/';
var CONFIG_APP_DATA_SERVICE = 'piveau';
var CONFIG_APP_DATA_CACHE_BUSTING = true;

var CONFIG_APP_GAZETTEER_URL = 'https://data.europa.eu/api/hub/search/gazetteer/';
var CONFIG_APP_UPLOAD_URL = 'https://www.europeandataportal.eu/data/api/';
var CONFIG_APP_MATOMO_URL = '';

var CONFIG_APP_LOCALE = 'en';
var CONFIG_APP_LOCALE_FALLBACK = 'en';
var CONFIG_APP_LANGUAGES = {};
var CONFIG_APP_LOAD_LANGUAGE_1 = '';
var CONFIG_APP_LOAD_LANGUAGE_URL_1 = '';

var CONFIG_APP_AUTH_ENABLE = false;
var CONFIG_APP_AUTH_SERVICE = 'keycloak';

var CONFIG_APP_ENABLE_DATASET_CATEGORIES = false;
var CONFIG_APP_ENABLE_DATASET_SIMILARDATASETS = false;
var CONFIG_APP_ENABLE_DATASET_FEEDBACK = false;
var CONFIG_APP_ENABLE_FILTER_GAZETTEER = false;
var CONFIG_APP_ENABLE_FILTER_OPERATOR = false;
var CONFIG_APP_ENABLE_FAVORITES = false;
var CONFIG_APP_ENABLE_DARK_MODE = false;

var CONFIG_APP_HEADER_CUSTOM_HTML = '';
var CONFIG_APP_FOOTER_CUSTOM_HTML = '';
var CONFIG_APP_DATASET_DISTRIBUTION_CUSTOM_HTML = '';
var CONFIG_APP_DATASET_INFO_CUSTOM_HTML = '';

var CONFIG_APP_HEADER_LOGO_TEXT = CONFIG_APP_TITLE;
var CONFIG_APP_HEADER_LOGO_IMAGE_SRC = '';
var CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION = '';

var CONFIG_APP_FOOTER_LOGO_TEXT = 'Peacock User UI 🦚';
var CONFIG_APP_FOOTER_LOGO_IMAGE_SRC = '';
var CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION = '';
var CONFIG_APP_FOOTER_LOGO_URL = 'https://github.com/opendata-guru/peacock-user-ui';

var CONFIG_APP_HEADER_NAV_1_URL = '/datasets';
var CONFIG_APP_HEADER_NAV_1_TITLE = 'message.header.navigation.data.datasets';
var CONFIG_APP_HEADER_NAV_2_URL = '/catalogues';
var CONFIG_APP_HEADER_NAV_2_TITLE = 'message.header.navigation.data.catalogues';
var CONFIG_APP_HEADER_NAV_3_URL = '';
var CONFIG_APP_HEADER_NAV_3_TITLE = '';
var CONFIG_APP_HEADER_NAV_4_URL = '';
var CONFIG_APP_HEADER_NAV_4_TITLE = '';
var CONFIG_APP_HEADER_NAV_5_URL = '';
var CONFIG_APP_HEADER_NAV_5_TITLE = '';
var CONFIG_APP_HEADER_NAV_6_URL = '';
var CONFIG_APP_HEADER_NAV_6_TITLE = '';
var CONFIG_APP_HEADER_NAV_7_URL = '';
var CONFIG_APP_HEADER_NAV_7_TITLE = '';
var CONFIG_APP_HEADER_NAV_8_URL = '';
var CONFIG_APP_HEADER_NAV_8_TITLE = '';
var CONFIG_APP_HEADER_NAV_9_URL = '';
var CONFIG_APP_HEADER_NAV_9_TITLE = '';

var CONFIG_APP_FOOTER_NAV_1_URL = '/imprint';
var CONFIG_APP_FOOTER_NAV_1_TITLE = 'message.navigation.navItems.imprint';
var CONFIG_APP_FOOTER_NAV_2_URL = '/privacypolicy';
var CONFIG_APP_FOOTER_NAV_2_TITLE = 'message.navigation.navItems.privacyPolicy';
var CONFIG_APP_FOOTER_NAV_3_URL = '';
var CONFIG_APP_FOOTER_NAV_3_TITLE = '';
var CONFIG_APP_FOOTER_NAV_4_URL = '';
var CONFIG_APP_FOOTER_NAV_4_TITLE = '';
var CONFIG_APP_FOOTER_NAV_5_URL = '';
var CONFIG_APP_FOOTER_NAV_5_TITLE = '';
var CONFIG_APP_FOOTER_NAV_6_URL = '';
var CONFIG_APP_FOOTER_NAV_6_TITLE = '';
var CONFIG_APP_FOOTER_NAV_7_URL = '';
var CONFIG_APP_FOOTER_NAV_7_TITLE = '';
var CONFIG_APP_FOOTER_NAV_8_URL = '';
var CONFIG_APP_FOOTER_NAV_8_TITLE = '';
var CONFIG_APP_FOOTER_NAV_9_URL = '';
var CONFIG_APP_FOOTER_NAV_9_TITLE = '';

var CONFIG_APP_ROUTER_BASE = '/';
var CONFIG_APP_ROUTER_LIB_BASE = '/';
var CONFIG_APP_ROUTER_REDIRECT_ROOT_TO = 'Datasets';
var CONFIG_APP_ROUTER_MODE = 'history';

var CONFIG_APP_ROUTER_ROUTE_1_NAME = 'foo';
var CONFIG_APP_ROUTER_ROUTE_1_PATH = '/foo';
var CONFIG_APP_ROUTER_ROUTE_1_FILE = '/pages/foo.html';
var CONFIG_APP_ROUTER_ROUTE_1_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_1_REQUIRES_AUTH = false;
var CONFIG_APP_ROUTER_ROUTE_2_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_2_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_2_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_2_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_2_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_3_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_3_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_3_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_3_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_3_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_4_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_4_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_4_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_4_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_4_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_5_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_5_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_5_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_5_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_5_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_6_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_6_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_6_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_6_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_6_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_7_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_7_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_7_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_7_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_7_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_8_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_8_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_8_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_8_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_8_REQUIRES_AUTH = true;
var CONFIG_APP_ROUTER_ROUTE_9_NAME = '';
var CONFIG_APP_ROUTER_ROUTE_9_PATH = '';
var CONFIG_APP_ROUTER_ROUTE_9_FILE = '';
var CONFIG_APP_ROUTER_ROUTE_9_COMPONENT = '';
var CONFIG_APP_ROUTER_ROUTE_9_REQUIRES_AUTH = true;
