/**
 * @created 03.04.2018
 * @description Simply override configurations from the glue-config.js
 *              This is a sample file. Copy it and remove 'sample' from it's name and edit configurations.
 */

import glueConfig from '../user-config/glue-config';
import i18n from '../user-config/i18n/i18n.json';

glueConfig.api.baseUrl = 'https://www.europeandataportal.eu/data/search/';
glueConfig.api.gazetteerBaseUrl = 'https://www.europeandataportal.eu/data/search/gazetteer/';
glueConfig.api.uploadBaseUrl = 'https://www.europeandataportal.eu/data/api/';

export { glueConfig, i18n };
