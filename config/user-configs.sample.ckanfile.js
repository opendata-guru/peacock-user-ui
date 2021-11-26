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

import datasetCKANFileService from '../guides/adapters/datasets-adapter-ckan-file';
import distributionCKANService from '../guides/adapters/distributions-adapter-ckan';

glueConfig.title = 'My Data portal';
glueConfig.api.baseUrl = '/data/ckan.json';
glueConfig.locale = 'de';

glueConfig.services.datasetService = datasetCKANFileService;
glueConfig.services.distributionService = distributionCKANService;

glueConfig.enable.dataset.categories = false;
glueConfig.enable.dataset.similarDatasets = false;
glueConfig.enable.dataset.feedback = false;
glueConfig.enable.filter.gazetteer = false;
glueConfig.enable.filter.operator = false;

glueConfig.images.headerLogos.push({
    text: 'My Data portal',
});

export { glueConfig, i18n };
