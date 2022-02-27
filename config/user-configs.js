/**
 * @created 03.04.2018
 * @description Simply override configurations from the glue-config.js
 *              This is a sample file. Copy it and remove 'sample' from it's name and edit configurations.
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021-2022 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import glueConfig from '../user-config/glue-config';
import i18n from '../user-config/i18n/i18n.json';

import authKeycloakService from '../src/auth/authService';
import authZeroService from '../guides/adapters/auth-zero-adapter';
import datasetCKANService from '../guides/adapters/datasets-adapter-ckan';
import datasetCKANFileService from '../guides/adapters/datasets-adapter-ckan-file';
// import distributionCKANService from '../guides/adapters/distributions-adapter-ckan';

if (CONFIG_APP_TITLE) {
    glueConfig.title = CONFIG_APP_TITLE;
}

if (CONFIG_APP_DATA_URL) {
    glueConfig.api.baseUrl = CONFIG_APP_DATA_URL;
}

if (CONFIG_APP_GAZETTEER_URL) {
    glueConfig.api.gazetteerBaseUrl = CONFIG_APP_GAZETTEER_URL;
}

if (CONFIG_APP_UPLOAD_URL) {
    glueConfig.api.uploadBaseUrl = CONFIG_APP_UPLOAD_URL;
}

if (CONFIG_APP_MATOMO_URL) {
    glueConfig.api.matomoUrl = CONFIG_APP_MATOMO_URL;
}

if (CONFIG_APP_LOCALE) {
    glueConfig.locale = CONFIG_APP_LOCALE;
}

if (CONFIG_APP_DATA_SERVICE) {
    if (CONFIG_APP_DATA_SERVICE === 'piveau') {
        // use default
    } else if (CONFIG_APP_DATA_SERVICE === 'ckan') {
        glueConfig.services.datasetService = datasetCKANService;
        // glueConfig.services.distributionService = distributionCKANService;
    } else if (CONFIG_APP_DATA_SERVICE === 'ckan-file') {
        glueConfig.services.datasetService = datasetCKANFileService;
        // glueConfig.services.distributionService = distributionCKANFileService;
    }
}

glueConfig.enable.services.cacheBusting = CONFIG_APP_DATA_CACHE_BUSTING === false ? false : true;

glueConfig.keycloak.enableLogin = CONFIG_APP_AUTH_ENABLE === false ? false : true;
if (CONFIG_APP_AUTH_SERVICE) {
    if (CONFIG_APP_AUTH_SERVICE === 'keycloak') {
        glueConfig.services.authService = authKeycloakService;
        glueConfig.api.authToken = '';
    } else if (CONFIG_APP_AUTH_SERVICE === 'zero') {
        glueConfig.services.authService = authZeroService;
        glueConfig.api.authToken = '';
    }
}

glueConfig.enable.dataset.categories = CONFIG_APP_ENABLE_DATASET_CATEGORIES === false ? false : true;
glueConfig.enable.dataset.similarDatasets = CONFIG_APP_ENABLE_DATASET_SIMILARDATASETS === false ? false : true;
glueConfig.enable.dataset.feedback = CONFIG_APP_ENABLE_DATASET_FEEDBACK === false ? false : true;
glueConfig.enable.filter.gazetteer = CONFIG_APP_ENABLE_FILTER_GAZETTEER === false ? false : true;
glueConfig.enable.filter.operator = CONFIG_APP_ENABLE_FILTER_OPERATOR === false ? false : true;
glueConfig.enable.favorites.enable = CONFIG_APP_ENABLE_FAVORITES === false ? false : true;

if (CONFIG_APP_HEADER_LOGO_TEXT || CONFIG_APP_HEADER_LOGO_IMAGE_SRC || CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION) {
    glueConfig.images.headerLogos.push({
        src: CONFIG_APP_HEADER_LOGO_IMAGE_SRC || '',
        description: CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION || '',
        text: CONFIG_APP_HEADER_LOGO_TEXT || '',
    });
}

if (CONFIG_APP_FOOTER_LOGO_TEXT || CONFIG_APP_FOOTER_LOGO_IMAGE_SRC || CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION) {
    glueConfig.images.footerLogos.push({
        src: CONFIG_APP_FOOTER_LOGO_IMAGE_SRC || '',
        description: CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION || '',
        text: CONFIG_APP_FOOTER_LOGO_TEXT || '',
        href: CONFIG_APP_FOOTER_LOGO_URL || '/',
    });
}

let headerNav = [];
if (CONFIG_APP_HEADER_NAV_1_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_1_URL,
        title: CONFIG_APP_HEADER_NAV_1_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_2_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_2_URL,
        title: CONFIG_APP_HEADER_NAV_2_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_3_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_3_URL,
        title: CONFIG_APP_HEADER_NAV_3_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_4_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_4_URL,
        title: CONFIG_APP_HEADER_NAV_4_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_5_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_5_URL,
        title: CONFIG_APP_HEADER_NAV_5_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_6_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_6_URL,
        title: CONFIG_APP_HEADER_NAV_6_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_7_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_7_URL,
        title: CONFIG_APP_HEADER_NAV_7_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_8_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_8_URL,
        title: CONFIG_APP_HEADER_NAV_8_TITLE
    });
}
if (CONFIG_APP_HEADER_NAV_9_TITLE) {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_9_URL,
        title: CONFIG_APP_HEADER_NAV_9_TITLE
    });
}
glueConfig.navigation.topnav.main.append = headerNav;

let footerNav = [];
if (CONFIG_APP_FOOTER_NAV_1_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_1_URL,
        title: CONFIG_APP_FOOTER_NAV_1_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_2_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_2_URL,
        title: CONFIG_APP_FOOTER_NAV_2_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_3_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_3_URL,
        title: CONFIG_APP_FOOTER_NAV_3_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_4_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_4_URL,
        title: CONFIG_APP_FOOTER_NAV_4_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_5_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_5_URL,
        title: CONFIG_APP_FOOTER_NAV_5_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_6_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_6_URL,
        title: CONFIG_APP_FOOTER_NAV_6_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_7_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_7_URL,
        title: CONFIG_APP_FOOTER_NAV_7_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_8_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_8_URL,
        title: CONFIG_APP_FOOTER_NAV_8_TITLE
    });
}
if (CONFIG_APP_FOOTER_NAV_9_TITLE) {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_9_URL,
        title: CONFIG_APP_FOOTER_NAV_9_TITLE
    });
}
glueConfig.navigation.topnav.sub.append = footerNav;

if (CONFIG_APP_ROUTER_BASE) {
    glueConfig.routerOptions.base = CONFIG_APP_ROUTER_BASE;
}
if (CONFIG_APP_ROUTER_LIB_BASE) {
    window.resourceBasePath = CONFIG_APP_ROUTER_LIB_BASE;
    __webpack_public_path__ = CONFIG_APP_ROUTER_LIB_BASE;
}

let routes = [];
if (CONFIG_APP_ROUTER_ROUTE_1_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_1_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_1_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_1_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_1_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_2_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_2_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_2_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_2_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_2_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_3_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_3_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_3_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_3_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_3_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_4_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_4_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_4_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_1_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_4_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_5_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_5_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_5_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_5_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_5_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_6_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_6_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_6_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_6_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_6_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_7_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_7_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_7_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_7_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_7_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_8_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_8_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_8_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_8_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_8_REQUIRES_AUTH
    });
}
if (CONFIG_APP_ROUTER_ROUTE_9_NAME) {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_9_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_1_PATH,
        file: CONFIG_APP_ROUTER_ROUTE_1_FILE,
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_9_REQUIRES_AUTH
    });
}
glueConfig.routerOptions.routes = routes;

export { glueConfig, i18n };
