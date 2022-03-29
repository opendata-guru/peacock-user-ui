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
import axios from 'axios';
// import distributionCKANService from '../guides/adapters/distributions-adapter-ckan';

function combine(baseObject, additionalObject) {
    for (const key in additionalObject) {
        if (baseObject.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(additionalObject[key]) === '[object Object]') {
                baseObject[key] = combine(baseObject[key] || {}, additionalObject[key]);
            } else {
                baseObject[key] = additionalObject[key];
            }
        } else {
            baseObject[key] = additionalObject[key];
        }
    }

    return baseObject;
}

function flattenStructuredJSON(obj) {
	const ret = {};

	for (const key in obj) {
		if (!obj.hasOwnProperty(key)) {
            continue;
        }

		if ((typeof obj[key]) === 'object') {
			const flatObj = flattenStructuredJSON(obj[key]);
            ret[key] = {};

            for (const flatKey in flatObj) {
				if (!flatObj.hasOwnProperty(flatKey)) {
                    continue;
                }

                if (flatKey === 'string') {
                    ret[key] = flatObj[flatKey];
                } else {
                    ret[key][flatKey] = flatObj[flatKey];
                }
            }
		} else {
            if (key === 'string') {
                ret[key] = obj[key];
            }
		}
	}
	return ret;
};

async function appendLanguage(lang, url) {
    let data = undefined;
    try {
        const response = await axios.get(url);
        data = response.data;
    } catch (error) {
        console.error(`Could not load ${url}`);
    }

    if (data) {
        data = flattenStructuredJSON(data);
        i18n = combine(i18n, {
            [lang]: {
                message: data
            }
        });
        console.log(i18n);
    }
}

if (typeof CONFIG_APP_TITLE !== 'undefined') {
    glueConfig.title = CONFIG_APP_TITLE;
}

if (typeof CONFIG_APP_DATA_URL !== 'undefined') {
    glueConfig.api.baseUrl = CONFIG_APP_DATA_URL;
}

if (typeof CONFIG_APP_GAZETTEER_URL !== 'undefined') {
    glueConfig.api.gazetteerBaseUrl = CONFIG_APP_GAZETTEER_URL;
}

if (typeof CONFIG_APP_UPLOAD_URL !== 'undefined') {
    glueConfig.api.uploadBaseUrl = CONFIG_APP_UPLOAD_URL;
}

if (typeof CONFIG_APP_MATOMO_URL !== 'undefined') {
    glueConfig.api.matomoUrl = CONFIG_APP_MATOMO_URL;
}

if (typeof CONFIG_APP_LOCALE !== 'undefined') {
    glueConfig.locale = CONFIG_APP_LOCALE;
}
if (typeof CONFIG_APP_LOCALE_FALLBACK !== 'undefined') {
    glueConfig.fallbackLocale = CONFIG_APP_LOCALE_FALLBACK;
}
if (typeof CONFIG_APP_LANGUAGES !== 'undefined') {
    i18n = combine(i18n, CONFIG_APP_LANGUAGES);
}
//appendLanguage('fi', 'https://raw.githubusercontent.com/opendata-guru/peacock-user-ui/master/user-config/i18n/i18n_de.json');

if (typeof CONFIG_APP_DATA_SERVICE !== 'undefined') {
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

if (typeof CONFIG_APP_AUTH_SERVICE !== 'undefined') {
    if (CONFIG_APP_AUTH_SERVICE === 'keycloak') {
        glueConfig.services.authService = authKeycloakService;
        glueConfig.api.authToken = '';
    } else if (CONFIG_APP_AUTH_SERVICE === 'zero') {
        glueConfig.services.authService = authZeroService;
        glueConfig.api.authToken = '';
    }
}

if (typeof CONFIG_APP_ROUTER_BASE !== 'undefined') {
    glueConfig.routerOptions.base = CONFIG_APP_ROUTER_BASE;
}

if (typeof CONFIG_APP_ROUTER_LIB_BASE !== 'undefined') {
    window.resourceBasePath = CONFIG_APP_ROUTER_LIB_BASE;
    __webpack_public_path__ = CONFIG_APP_ROUTER_LIB_BASE;
}

if (typeof CONFIG_APP_ROUTER_REDIRECT_ROOT_TO !== 'undefined') {
    glueConfig.routerOptions.redirectRootTo = CONFIG_APP_ROUTER_REDIRECT_ROOT_TO;
}

glueConfig.enable.dataset.similarDatasets = typeof CONFIG_APP_ENABLE_DATASET_SIMILARDATASETS !== 'undefined' ? CONFIG_APP_ENABLE_DATASET_SIMILARDATASETS : false;
glueConfig.enable.services.cacheBusting = typeof CONFIG_APP_DATA_CACHE_BUSTING !== 'undefined' ? CONFIG_APP_DATA_CACHE_BUSTING : true;
glueConfig.enable.dataset.categories = typeof CONFIG_APP_ENABLE_DATASET_CATEGORIES !== 'undefined' ? CONFIG_APP_ENABLE_DATASET_CATEGORIES : false;
glueConfig.enable.dataset.feedback = typeof CONFIG_APP_ENABLE_DATASET_FEEDBACK !== 'undefined' ? CONFIG_APP_ENABLE_DATASET_FEEDBACK : false;
glueConfig.enable.favorites.enable = typeof CONFIG_APP_ENABLE_FAVORITES !== 'undefined' ? CONFIG_APP_ENABLE_FAVORITES : true;
glueConfig.enable.filter.gazetteer = typeof CONFIG_APP_ENABLE_FILTER_GAZETTEER !== 'undefined' ? CONFIG_APP_ENABLE_FILTER_GAZETTEER : false;
glueConfig.enable.filter.operator = typeof CONFIG_APP_ENABLE_FILTER_OPERATOR !== 'undefined' ? CONFIG_APP_ENABLE_FILTER_OPERATOR : false;
glueConfig.keycloak.enableLogin = typeof CONFIG_APP_AUTH_ENABLE !== 'undefined' ? CONFIG_APP_AUTH_ENABLE : false;

if ((typeof CONFIG_APP_HEADER_LOGO_TEXT !== 'undefined') || (typeof CONFIG_APP_HEADER_LOGO_IMAGE_SRC !== 'undefined') || (typeof CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION !== 'undefined')) {
    glueConfig.images.headerLogos.push({
        src: typeof CONFIG_APP_HEADER_LOGO_IMAGE_SRC !== 'undefined' ? CONFIG_APP_HEADER_LOGO_IMAGE_SRC : '',
        description: typeof CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION !== 'undefined' ? CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION :'',
        text: typeof CONFIG_APP_HEADER_LOGO_TEXT !== 'undefined' ? CONFIG_APP_HEADER_LOGO_TEXT : '',
    });
}

if ((typeof CONFIG_APP_FOOTER_LOGO_TEXT !== 'undefined') || (typeof CONFIG_APP_FOOTER_LOGO_IMAGE_SRC !== 'undefined') || (typeof CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION !== 'undefined')) {
    glueConfig.images.footerLogos.push({
        src: typeof CONFIG_APP_FOOTER_LOGO_IMAGE_SRC !== 'undefined' ? CONFIG_APP_FOOTER_LOGO_IMAGE_SRC : '',
        description: typeof CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION !== 'undefined' ? CONFIG_APP_FOOTER_LOGO_IMAGE_DESCRIPTION : '',
        text: typeof CONFIG_APP_FOOTER_LOGO_TEXT !== 'undefined' ? CONFIG_APP_FOOTER_LOGO_TEXT : '',
        href: typeof CONFIG_APP_FOOTER_LOGO_URL !== 'undefined' ? CONFIG_APP_FOOTER_LOGO_URL : '/',
    });
}

let headerNav = [];
if (typeof CONFIG_APP_HEADER_NAV_1_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_1_URL,
        title: CONFIG_APP_HEADER_NAV_1_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_2_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_2_URL,
        title: CONFIG_APP_HEADER_NAV_2_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_3_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_3_URL,
        title: CONFIG_APP_HEADER_NAV_3_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_4_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_4_URL,
        title: CONFIG_APP_HEADER_NAV_4_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_5_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_5_URL,
        title: CONFIG_APP_HEADER_NAV_5_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_6_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_6_URL,
        title: CONFIG_APP_HEADER_NAV_6_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_7_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_7_URL,
        title: CONFIG_APP_HEADER_NAV_7_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_8_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_8_URL,
        title: CONFIG_APP_HEADER_NAV_8_TITLE
    });
}
if (typeof CONFIG_APP_HEADER_NAV_9_TITLE !== 'undefined') {
    headerNav.push({
        href: CONFIG_APP_HEADER_NAV_9_URL,
        title: CONFIG_APP_HEADER_NAV_9_TITLE
    });
}
glueConfig.navigation.topnav.main.append = headerNav;

let footerNav = [];
if (typeof CONFIG_APP_FOOTER_NAV_1_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_1_URL,
        title: CONFIG_APP_FOOTER_NAV_1_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_2_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_2_URL,
        title: CONFIG_APP_FOOTER_NAV_2_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_3_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_3_URL,
        title: CONFIG_APP_FOOTER_NAV_3_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_4_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_4_URL,
        title: CONFIG_APP_FOOTER_NAV_4_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_5_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_5_URL,
        title: CONFIG_APP_FOOTER_NAV_5_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_6_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_6_URL,
        title: CONFIG_APP_FOOTER_NAV_6_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_7_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_7_URL,
        title: CONFIG_APP_FOOTER_NAV_7_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_8_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_8_URL,
        title: CONFIG_APP_FOOTER_NAV_8_TITLE
    });
}
if (typeof CONFIG_APP_FOOTER_NAV_9_TITLE !== 'undefined') {
    footerNav.push({
        href: CONFIG_APP_FOOTER_NAV_9_URL,
        title: CONFIG_APP_FOOTER_NAV_9_TITLE
    });
}
glueConfig.navigation.topnav.sub.append = footerNav;

let routes = [];
if (typeof CONFIG_APP_ROUTER_ROUTE_1_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_1_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_1_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_1_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_1_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_1_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_1_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_1_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_2_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_2_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_2_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_2_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_2_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_2_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_2_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_2_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_3_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_3_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_3_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_3_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_3_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_3_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_3_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_3_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_4_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_4_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_4_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_4_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_4_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_4_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_4_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_4_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_5_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_5_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_5_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_5_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_5_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_5_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_5_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_5_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_6_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_6_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_6_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_6_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_6_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_6_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_6_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_6_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_7_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_7_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_7_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_7_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_7_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_7_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_7_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_7_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_8_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_8_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_8_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_8_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_8_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_8_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_8_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_8_REQUIRES_AUTH
    });
}
if (typeof CONFIG_APP_ROUTER_ROUTE_9_NAME !== 'undefined') {
    routes.push({
        name: CONFIG_APP_ROUTER_ROUTE_9_NAME,
        path: CONFIG_APP_ROUTER_ROUTE_9_PATH,
        file: typeof CONFIG_APP_ROUTER_ROUTE_9_FILE !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_9_FILE : '',
        component: typeof CONFIG_APP_ROUTER_ROUTE_9_COMPONENT !== 'undefined' ? CONFIG_APP_ROUTER_ROUTE_9_COMPONENT : '',
        requiresAuth: CONFIG_APP_ROUTER_ROUTE_9_REQUIRES_AUTH
    });
}
glueConfig.routerOptions.routes = routes;

export { glueConfig, i18n };
