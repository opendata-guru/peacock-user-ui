/**
 * @created 03.04.2018
 * @description Simply override configurations from the glue-config.js
 *              This is a sample file. Copy it and remove 'sample' from it's name and edit configurations.
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import glueConfig from '../user-config/glue-config';
import i18n from '../user-config/i18n/i18n.json';

// import authZeroService from '../guides/adapters/auth-zero-adapter';
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

if (CONFIG_APP_AUTH_SERVICE) {
    // glueConfig.services.authService = authZeroService;
}

glueConfig.enable.dataset.categories = CONFIG_APP_ENABLE_DATASET_CATEGORIES === false ? false : true;
glueConfig.enable.dataset.similarDatasets = CONFIG_APP_ENABLE_DATASET_SIMILARDATASETS === false ? false : true;
glueConfig.enable.dataset.feedback = CONFIG_APP_ENABLE_DATASET_FEEDBACK === false ? false : true;
glueConfig.enable.filter.gazetteer = CONFIG_APP_ENABLE_FILTER_GAZETTEER === false ? false : true;
glueConfig.enable.filter.operator = CONFIG_APP_ENABLE_FILTER_OPERATOR === false ? false : true;

if (CONFIG_APP_HEADER_LOGO_TEXT || CONFIG_APP_HEADER_LOGO_IMAGE_SRC || CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION) {
    glueConfig.images.headerLogos.push({
        src: CONFIG_APP_HEADER_LOGO_IMAGE_SRC || '',
        description: CONFIG_APP_HEADER_LOGO_IMAGE_DESCRIPTION || '',
        text: CONFIG_APP_HEADER_LOGO_TEXT || '',
    });
}

export { glueConfig, i18n };
