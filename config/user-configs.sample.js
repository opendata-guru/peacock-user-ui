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

glueConfig.api.baseUrl = 'https://data.europa.eu/api/hub/search/';
glueConfig.api.gazetteerBaseUrl = 'https://www.europeandataportal.eu/data/search/gazetteer/';
glueConfig.api.uploadBaseUrl = 'https://www.europeandataportal.eu/data/api/';

export { glueConfig, i18n };
